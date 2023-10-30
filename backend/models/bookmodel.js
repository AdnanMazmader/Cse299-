const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema)