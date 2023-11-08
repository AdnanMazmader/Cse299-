const express = require("express");
const router = express.Router();
const { getRecomBooks } = require("../controllers/recommendationController");

router.get('/:id', getRecomBooks);

module.exports = router;