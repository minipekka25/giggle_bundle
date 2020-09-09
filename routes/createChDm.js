const data = require("../services/DBadaptor");
const workspaceSchema = require("../schema/workspace");
const userSchema = require("../schema/user");
const wsmemberSchema = require("../schema/wsmember");
const channelSchema = require("../schema/channel");
const directSchema = require("../schema/direct");
const directmessageSchema = require("../schema/directmessage");
const channelmessageSchema = require("../schema/channelmessage");

module.exports=(app)=>{
    app.post('/api/create/channel/:ws_id', async (req, res) => {

        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        const channel = wsdb.model('channel', channelSchema)

        let foundusers = await wsMember.find({})


        let userchannel = new channel({
            name: req.body.channel_name,
            private: false,
            emoji: req.body.emoji,
            members: await foundusers
        })

        let g = await userchannel.save()

        let channel_name = wsdb.model('ch-' + g._id, channelmessageSchema)

        let p = foundusers.filter((u) => u.googleId != req.user.id)

        let newjoinmsg = new channel_name({
            type: 'text',
            saved: false,
            message: `${req.user.displayName} created ${req.body.channel_name} and joined with ${p.map((j) => j.nickName + ' ')}`,
            created_by: await wsMember.findOne({ googleId: req.user.id })
        })

        let newmsg = await newjoinmsg.save()

        let newchannelupdate = await channel.findOne({ _id: g._id })
        newchannelupdate.latest_msg = { msg: newmsg.message, time: newmsg.updatedAt }
        await newchannelupdate.save()

        let h = foundusers.map(async (j) => {
            let y = await wsMember.findOne({ googleId: j.googleId })
            y.channels.push(g)
            return await y.save()

        })
        console.log(req.user)
        let result = await Promise.all(h)

        res.send(result)

    })

    app.post('/api/create/direct/:ws_id', async (req, res) => {

        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)

        let current_user = await wsMember.findOne({ googleId: req.user.id })
        let direct_user = await wsMember.findOne({ googleId: req.body.googleId })

        const direct = wsdb.model('direct', directSchema)

        let newdirect = new direct({
            hash: req.body.hash,
            members: [current_user, direct_user]
        })

        let created_direct = await newdirect.save()

        current_user.directs.push(created_direct)
        direct_user.directs.push(created_direct)

        await current_user.save()
        await direct_user.save()

        let directmsg = wsdb.model('dm-' + req.body.hash, directmessageSchema)

        let directmessages = new directmsg({
            type: 'text',
            saved: false,
            message: `${current_user.nickName} created and joined the chat along with ${direct_user.nickName}`,
            created_by: await current_user
        })

        let g = await directmessages.save()

        let newdirectupdate = await direct.findOne({ _id: created_direct._id })

        newdirectupdate.latest_msg = { msg: g.message, time: g.updatedAt }

        let k = await newdirectupdate.save()

        res.send(k)
    })

}