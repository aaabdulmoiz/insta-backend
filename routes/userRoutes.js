const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
//import controller functions
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
} = require("../controllers/userController");

router.route("/").post(registerUser).get(getUserInfo);
// router.route("/posts").get(getUserInfo);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
