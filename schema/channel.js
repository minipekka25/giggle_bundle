const mongoose = require('mongoose');
const Schema = mongoose.Schema

const channelSchema = new Schema({
    name: String,
    private: Boolean,
    topic:String,
    latest_msg:Object,
    emoji:String,
    members: [{ type: Schema.Types.ObjectId, ref: 'wsmember' }]
})


module.exports = channelSchema