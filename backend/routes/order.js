const express = require("express");
const router = express.Router();
const { placeOrder, getOrder } = require("../controllers/orderController");

router.post('/createorder', placeOrder);
router.get('/getorder/:userId', getOrder);

module.exports = router;