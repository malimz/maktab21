const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

    artId: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model('comment', comment);