const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const article = new Schema({
    text: {
        type: String,
        required: true,
    },
    // date: {
    //     type: Date,
    //     required: true,
    // },
    picture: {
        type: String,
        required: true,
    },

    author: {
        type: Schema.Types.Mixed,
        required: true,
        ref: 'user'
    },

});
module.exports = mongoose.model('article', article);