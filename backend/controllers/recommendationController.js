const User = require("../models/usermodel");
const Book = require('../models/bookmodel');
const Order = require("../models/orderModel");
const axios = require('axios')

module.exports.getRecomBooks = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.find({ _id: id });
        const order = await Order.findOne({ user: user })
        console.log(order)
        const { books } = order

        console.log(books)
        console.log(user.wishlist)

        let data;
        if (books.length === 0) {
            const randomIndex = Math.floor(Math.random() * books.length);
            const randomBook = order.books[randomIndex];

            data = {
                book: randomBook.title
            };
        }
        // else {
        //     const randomIndex = Math.floor(Math.random() * user.wishlist.length);
        //     const randomBook = user.wishlist[randomIndex];

        //     data = {
        //         book: randomBook.title
        //     };
        // }
        // axios
        //     .post('http://localhost:5000/api', data)
        //     .then(response => {
        //         const book = response.data;
        //         res.status(200).json(book);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        fetch('http://localhost:5000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(book => {
                res.status(200).json(book);
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ error: 'An error occurred' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};