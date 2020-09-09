const mongoose = require('mongoose');
const Schema = mongoose.Schema


const channelmessageSchema = new Schema({
    type: String,
    saved: Boolean,
    message: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'wsmember' },
    read_by: [{ type: Schema.Types.ObjectId, ref: 'wsmember' }],
    createdAt: Number,
    updatedAt: Number,
    latest_msg:String
  
}, {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

channelmessageSchema.index({ message: 'text' });


module.exports = channelmessageSchema