const express = require("express");
const { getChat } = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(getChat);

module.exports = router;
