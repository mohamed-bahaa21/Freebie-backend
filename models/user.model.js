const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User;