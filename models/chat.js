const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room: String,
    userName: String,
    msg: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);