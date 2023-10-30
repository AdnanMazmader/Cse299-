const express = require('express')
const router = express.Router()

const {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook
} = require('../controllers/bookcontroller')

//get all books
router.get('/', getBooks)

//get a single book
router.get('/:id', getBook)

//post a new book
router.post('/', createBook)

//delete a book
router.delete('/:id', deleteBook)

//update a book
router.get('/:id', updateBook)


module.exports = router  