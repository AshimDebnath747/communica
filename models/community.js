const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
});

const communityModel = mongoose.model('community', communitySchema);

module.exports = communityModel;