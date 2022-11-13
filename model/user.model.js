const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required : true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema);

