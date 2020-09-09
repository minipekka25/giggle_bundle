const data = require("../services/DBadaptor");
const wsmemberSchema = require("../schema/wsmember");
const directmessageSchema = require("../schema/directmessage");
const channelmessageSchema = require("../schema/channelmessage");

module.exports = (app) =>{
    app.post('/api/change/status', async (req, res) => {

        let wsdb = data.getDatabaseConnection(req.body.workspace_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        let foundWsMember = await wsMember.findOne({ googleId: req.user.id })
        console.log(req.body.status)
        foundWsMember.status = req.body.status
        let g = await foundWsMember.save()
        res.send(g)
    })

    app.post('/api/create/task/:ws_id', async (req, res) => {
        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)

        let foundWsMember = await wsMember.findOne({ googleId: req.user.id })
        foundWsMember.todo.push(req.body)
        let updatedtodo = await foundWsMember.save()
        res.send(updatedtodo)
    })

    app.post('/api/delete/task/:ws_id', async (req, res) => {
        let wsdb = await data.getDatabaseConnection(req.params.ws_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        let foundWsMember = await wsMember.findOne({ googleId: req.user.id })
        let deletedtodo = foundWsMember.todo.filter((i) => i.task != req.body.task)
        foundWsMember.todo = deletedtodo
        let updatedtodo = await foundWsMember.save()
        res.send(updatedtodo)
    })

    app.get('/api/search/messages/:collname/:schema/:ws_id/:search_query', async (req, res) => {

        let wsdb = data.getDatabaseConnection(req.params.ws_id)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        let modelCreator = (collectionname, schema) => {
            return wsdb.model(collectionname, schema)
        }

        let schema = ''

        if (req.params.schema == 'channel') {
            schema = channelmessageSchema
        } else {
            schema = directmessageSchema
        }

        const regex = new RegExp(escapeRegex(req.params.search_query), 'gi');

        let model = modelCreator(req.params.collname, schema)
        let foundmessages = await model.find({ message: regex }).populate({ path: 'created_by', model: wsMember })

        res.send(foundmessages.filter((i) => i.type == 'text'))

    })

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
}