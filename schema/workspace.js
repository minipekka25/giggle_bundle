const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workspaceSchema = new Schema({
    name: String,
    created_by: String,
    emoji: String
});

module.exports= workspaceSchema
