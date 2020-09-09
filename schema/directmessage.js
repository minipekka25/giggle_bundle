const mongoose = require('mongoose');
const Schema = mongoose.Schema

const directmessageSchema = new Schema({
    type: String,
    saved: Boolean,
    message: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'wsmember' },
    read_by: [{ type: Schema.Types.ObjectId, ref: 'wsmember' }],
    latest_msg:String,
    createdAt:Number,
    updatedAt:Number
},{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

directmessageSchema.index({ message: 'text'});

module.exports = directmessageSchema