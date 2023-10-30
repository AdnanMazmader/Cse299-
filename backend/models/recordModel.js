const mongoose = require('mongoose')
const Order = require('./orderModel.js')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
})


module.exports = mongoose.model('Record', recordSchema)