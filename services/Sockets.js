const data = require("../services/DBadaptor");
const wsmemberSchema = require("../schema/wsmember");
const channelSchema = require("../schema/channel");
const directSchema = require("../schema/direct");
const directmessageSchema = require("../schema/directmessage");
const channelmessageSchema = require("../schema/channelmessage");
const cookieSession = require('cookie-session')

module.exports = (io)=>{


    const rooms = io.of(/^\/\w+$/);

    const cookie = cookieSession({
        name: 'slack-session',
        keys: ['fgyuhijf82f3y49hioj', 'dcfvgyhu8r029ergf2hdui'],
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    rooms.use((socket, next) => {

        let cookieString = socket.request.headers.cookie;

        let req = { connection: { encrypted: false }, headers: { cookie: cookieString } }
        let res = { getHeader: () => { }, setHeader: () => { } };

        cookie(req, res, () => {
            if (req.session) {
                socket.googleId = req.session.passport.user.id
            }

        })

        next();
    });

    rooms.on('connection', async (socket) => {

        socket.emit('newMessage', 'Admin, Welocome to workspace')
        socket.on('todo_updated', (data) => {
            socket.emit('todo_updated', data)
        })

        socket.on('todo_deleted', (data) => {
            socket.emit('todo_deleted', data)
        })

        socket.on('todo_deleted', (data) => {
            socket.emit('todo_deleted', data)
        })

        socket.on('created_channel', (data) => {
            rooms.emit('created_channel', data)
        })

        socket.on('status_changed', (data) => {
            socket.emit('status_changed', data)
        })





        socket.on('joinroom', async (ws) => {
            let wsdb = data.getDatabaseConnection(ws.workspace_id)
            const wsMember = wsdb.model('wsmember', wsmemberSchema)

            let founduser = await wsMember.findOne({ googleId: socket.googleId })

            founduser.channels.map(async (i) => await socket.join(ws.workspace_id + '&' + i))
            founduser.directs.map(async (i) => await socket.join(ws.workspace_id + '&' + i))

            founduser.online = true
            await founduser.save()
            rooms.emit('usercameonline', socket.googleId)
            socket.ws_id = ws.workspace_id

            socket.on('disconnect', async () => {
                console.log(socket.ws_id + 'disconnected')
                let wsdb = data.getDatabaseConnection(socket.ws_id)
                const wsMember = wsdb.model('wsmember', wsmemberSchema)
                let founduser = await wsMember.findOne({ googleId: socket.googleId })
                founduser.online = false
                rooms.emit('userwentoffline', socket.googleId)
                socket.ws_id = ws.workspace_id
                await founduser.save()
            })

        })


        socket.on('sendmsgtoroom', async (roomid) => {

            let wsdb = data.getDatabaseConnection(roomid.ws_id)

            const channel = wsdb.model('channel', channelSchema)
            const wsMember = wsdb.model('wsmember', wsmemberSchema)
            const direct = wsdb.model('direct', directSchema)

            let foundwsuser = await wsMember.findOne({ googleId: socket.googleId })

            let schema = ''
            let coll = ''
            let newupdate = null
            if (roomid.type == 'channel') {
                schema = channelmessageSchema
                coll = 'ch-' + roomid.coll_name
                newupdate = await channel.findOne({ _id: roomid.coll_name })
            } else {
                schema = directmessageSchema
                newupdate = await direct.findOne({ _id: roomid.coll_name })
                coll = 'dm-' + await newupdate.hash
            }
            const newmsgmodel = wsdb.model(coll, schema)

            let newmsg = new newmsgmodel({
                type: roomid.msg_type,
                saved: false,
                message: roomid.msg,
                created_by: await foundwsuser
            })

            let createdmsg = await newmsg.save()

            newupdate.latest_msg = { msg: createdmsg.message, time: createdmsg.updatedAt, type: createdmsg.type }

            await newupdate.save()

            rooms.to(roomid.roomid).emit(roomid.roomid, { msg: createdmsg, id: roomid.roomid, type: roomid.type, current: roomid.coll_name })
        });
    });

}