const express = require("express");
const router = express.Router();
const { addToList, getList, removeListItem } = require("../controllers/wishlistController");

router.post('/addList', addToList);
router.get('/getList/:userId', getList);
router.delete('/removeList', removeListItem);

module.exports = router;