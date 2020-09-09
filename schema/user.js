const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    googleId: String,
    workspaces: [{ type: Schema.Types.ObjectId, ref: 'workspaces' }],
})


module.exports = userSchema