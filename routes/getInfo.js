const data = require("../services/DBadaptor");
const workspaceSchema = require("../schema/workspace");
const userSchema = require("../schema/user");
const wsmemberSchema = require("../schema/wsmember");
const channelSchema = require("../schema/channel");
const directSchema = require("../schema/direct");
const directmessageSchema = require("../schema/directmessage");
const channelmessageSchema = require("../schema/channelmessage");

module.exports = (app)=>{
    app.get('/api/get/orgname/:ws_id', async (req, res) => {
        const msdb = data.getDatabaseConnection('black_master')
        const workspace = msdb.model('workspace', workspaceSchema)
        console.log(req.params.ws_id)
        try {
            let foundorg = await workspace.find({ _id: req.params.ws_id })
            res.send(foundorg)
        } catch (err) {
            res.send({ "name": "Not Found", "emoji": "👀", "_id": "123" })
        }
    })

    app.get('/api/get/workspaceslist', async (req, res) => {
        const msdb = data.getDatabaseConnection('black_master')
        const workspace = msdb.model('workspace', workspaceSchema)
        const user = msdb.model('user', userSchema)

        try {
            let foundUser = await user.findOne({ googleId: req.user.id }).populate({ path: 'workspaces', model: workspace })


            res.send(await foundUser)
        }
        catch (err) {
            console.log(err)
        }
    })

    app.post('/api/get/workspace/channels', async (req, res) => {
        let l = Object.keys(req.body)
        let j = JSON.parse(l[0])
        const wsdb = data.getDatabaseConnection(j.workspace_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)

        try {
            let foundmember = await wsMember.findOne({ googleId: req.user.id })
      
            res.send(await foundmember)
        }
        catch (err) {
            console.log(err)
        }
    })

    app.get('/api/get/workspace/appdata/:ws_id', async (req, res) => {
        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const channel = wsdb.model('channel', channelSchema)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        const direct = wsdb.model('direct', directSchema)

        try {
            let foundWsMember = await wsMember.findOne({ googleId: req.user.id }).populate({ path: 'channels', model: channel, populate: { path: 'members', model: wsMember, select: ['nickName', 'profile_pic', 'status', 'online', 'googleId'] } }).populate({ path: 'directs', model: direct, populate: { path: 'members', model: wsMember, select: ['nickName', 'profile_pic', 'status', 'online', 'googleId'] } })
            //console.log('hell'+ await foundWsMember)
            res.send(foundWsMember)
        } catch (err) {
            console.log(err);
        }

    })

    app.get('/api/get/workspace/channelmessage/:ws_id/:ch_id', async (req, res) => {
        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const channel = wsdb.model('channel', channelSchema)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        const direct = wsdb.model('direct', directSchema)

        let modelCreator = (collectionname, schema) => {
            return wsdb.model(collectionname, schema)
        }

        try {
            let foundWsMember = await wsMember.findOne({ googleId: req.user.id }).populate({ path: 'channels', model: channel }).populate({ path: 'directs', model: direct })
            //console.log('hell'+ await foundWsMember)
            let validate_permission = await foundWsMember.channels.filter((i) => i._id == req.params.ch_id)

            if (validate_permission.length != 0) {
                let channelmessage = modelCreator('ch-' + req.params.ch_id, channelmessageSchema)
                let messages = await channelmessage.find({}).populate({ path: 'created_by', select: ['nickName', 'profile_pic', 'status'], model: wsMember })
                res.send(messages)
            }
        } catch (err) {
            console.log(err);
        }

    })




    app.get('/api/get/workspace/directmessage/:ws_id/:dm_id', async (req, res) => {
        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const channel = wsdb.model('channel', channelSchema)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        const direct = wsdb.model('direct', directSchema)

        let modelCreator = (collectionname, schema) => {
            return wsdb.model(collectionname, schema)
        }

        try {
            let foundWsMember = await wsMember.findOne({ googleId: req.user.id }).populate({ path: 'channels', model: channel }).populate({ path: 'directs', model: direct })

            let validate_permission = await foundWsMember.directs.filter((i) => i._id == req.params.dm_id)

            if (validate_permission.length != 0) {
                let directmessage = modelCreator('dm-' + validate_permission[0].hash, directmessageSchema)
                let messages = await directmessage.find({}).populate({ path: 'created_by', model: wsMember })
                res.send(messages)
            }
        } catch (err) {
            console.log(err);
        }

    })

    app.get('/api/get/directslot/:ws_id', async (req, res) => {
        let wsdb = data.getDatabaseConnection(req.params.ws_id)
        const direct = wsdb.model('direct', directSchema)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        foundusers = await wsMember.find({})
        let b = await foundusers.filter((i) => i.googleId != req.user.id)
        const g = b.map(async (j) => {
            let gid = parseInt(j.googleId)
            let ugid = parseInt(req.user.id)
            let id = ''
            if (gid > ugid) {
                id = gid + ugid
            } else {
                id = ugid + gid
            }
            let hash = crypto.createHash('md5').update(id.toString()).digest('hex')

            let find = await direct.findOne({ hash: hash })
            if (find == null) {
                return { googleId: j.googleId, name: j.nickName, hash: hash }
            } else { return null }

        })
        let results = await Promise.all(g)

        res.send(results)

    })


}