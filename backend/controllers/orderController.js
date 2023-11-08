const User = require("../models/usermodel");
const Book = require('../models/bookmodel');
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

// module.exports.placeOrder = async (req, res) => {
//     const userId = req.body.userId
//     try {
//         const user = await User.findOne({ _id: userId })
//         const books = user.cart
//         console.log(books)

//         const order = await Order.create({ user, books })

//         await order.save()
//         user.cart = [];
//         user.save()
//         return res.send({ code: 200, message: 'succesfully placed the order', orderId: order._id })
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }

// };
module.exports.placeOrder = async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findOne({ _id: userId });
        const books = user.cart;
        console.log(books);
        let order = await Order.findOne({ user: user });
        if (order) {
            order.books = order.books.concat(books);
            await order.save();
        } else {
            order = await Order.create({ user, books });
        }
        user.cart = [];
        await user.save();

        return res.send({ code: 200, message: 'Successfully placed the order', orderId: order._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getOrder = async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({ _id: userId })
    const data = await Order.find({ user: user }).populate('books').populate('user');
    if (data) {
        return res.send({ code: 200, message: 'got Order', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
};