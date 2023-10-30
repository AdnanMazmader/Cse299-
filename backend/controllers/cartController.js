const User = require("../models/usermodel");
const Book = require('../models/bookmodel');
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

// module.exports.addToCart = async (req, res) => {
//   const user = await User.findById(req.body.userId);
//   if (user.cart.includes(req.body.productId)) {
//     return res.status(400).json({ code: 400, message: 'Product already in the cart' });
//   }
//   else {
//     await User.updateOne({ _id: req.body.userId }, {
//       $addToSet: { cart: req.body.productId }
//     })
//     return res.send({ code: 200, message: 'succesfully added to cart' })
//   }
// };

module.exports.addToCart = async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user.cart.includes(req.body.productId)) {
        return res.send({ code: 400, message: 'product is laready in cart' })
    }
    else {
        await User.updateOne({ _id: req.body.userId }, {
            $addToSet: { cart: req.body.productId }
        })
        return res.send({ code: 200, message: 'succesfully added to cart' })
    }
};

module.exports.getCart = async (req, res) => {
    const { userId } = req.params
    const data = await User.findOne({ _id: userId }).populate('cart')
    if (data) {
        return res.send({ code: 200, message: 'got cart', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
};

module.exports.removeCartItem = async (req, res) => {
    try {
        const { userId, bookId } = req.body

        const user = await User.findOne({ _id: userId })

        console.log(user)
        const bookIndex = user.cart.findIndex(bookIncart => bookIncart._id.toString() === bookId)
        console.log(bookIndex)
        if (bookIndex < 0) {
            return res.send({ code: 404, message: 'book does not exist' })
        }
        user.cart.splice(bookIndex, 1)

        await user.save()

        return res.send({ code: 200, message: 'succesfully rmoved from cart' })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


};


