const mongoose = require('mongoose');
const Schema = mongoose.Schema

const directSchema = new Schema({
    hash:String,
    members: [{ type: Schema.Types.ObjectId, ref: 'wsmember' }],
    latest_msg:Object
})


module.exports = directSchema