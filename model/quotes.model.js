const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    quote: {
        required: true,
        type: String,
        trim: true
    },
    author: {
        required: true,
        type: String,
        trim: true
    },
    created_at: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('Quotes', quoteSchema)