const mongoose = require('mongoose');
const Schema = mongoose.Schema

const wsmemberSchema = new Schema({
    nickName: String,
    email: String,
    picture: String,
    googleId: String,
    role:String,
    about:String,
    Ref: { type: Schema.Types.ObjectId, ref: 'users' },
    channels: [{ type: Schema.Types.ObjectId, ref: 'channels'}],
    directs: [{ type: Schema.Types.ObjectId, ref: 'directs' }],
    profile_pic: String,
    todo:Array,
    status:String,
    online:Boolean
})


module.exports = wsmemberSchema