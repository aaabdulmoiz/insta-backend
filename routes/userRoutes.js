const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
//import controller functions
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
