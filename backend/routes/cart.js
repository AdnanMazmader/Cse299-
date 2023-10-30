const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeCartItem } = require("../controllers/cartController");

router.post('/addcart', addToCart);
router.get('/getcart/:userId', getCart);
router.delete('/removecart', removeCartItem);

module.exports = router;