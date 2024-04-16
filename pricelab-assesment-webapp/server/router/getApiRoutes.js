const express = require("express");
const { getData, addData } = require("../controller/apiController");
const router = express.Router();


router.route('/').get(getData);
router.route('/post').get(addData);

module.exports = router;