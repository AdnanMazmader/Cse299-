const mongoose = require('mongoose')
const User = require('./usermodel.js')
const Book = require('./bookmodel.js')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    books: [{ type: Schema.Types.ObjectId, ref: 'book' }],
    orderDate: { type: Date, default: Date.now },
})


module.exports = mongoose.model('Order', orderSchema)