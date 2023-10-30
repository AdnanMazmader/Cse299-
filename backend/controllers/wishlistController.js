const User = require("../models/usermodel");
const Book = require('../models/bookmodel');
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

module.exports.addToList = async (req, res) => {
    const isUpdated = await User.updateOne({ _id: req.body.userId }, {
        $addToSet: { wishlist: req.body.productId }
    })

    if (isUpdated) {
        return res.send({ code: 200, message: 'succesfully added to wishlist' })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
};


module.exports.getList = async (req, res) => {
    const { userId } = req.params
    const data = await User.findOne({ _id: userId }).populate('wishlist')
    if (data) {
        return res.send({ code: 200, message: 'got wishlist', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Error' })
    }
};

module.exports.removeListItem = async (req, res) => {
    try {
        const { userId, bookId } = req.body

        const user = await User.findOne({ _id: userId })

        console.log(user)
        const bookIndex = user.wishlist.findIndex(bookIncart => bookIncart._id.toString() === bookId)
        console.log(bookIndex)
        if (bookIndex < 0) {
            return res.send({ code: 404, message: 'book does not exist' })
        }
        user.wishlist.splice(bookIndex, 1)

        await user.save()

        return res.send({ code: 200, message: 'succesfully rmoved from wishlist' })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};