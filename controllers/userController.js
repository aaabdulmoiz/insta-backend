const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const asyncHandler = require("express-async-handler");
const { authenticateUser, createNewUser } = require("../services/userServices");

const registerUser = asyncHandler(async (req, res) => {
  const newUser = await createNewUser(req.body);
  res.json(newUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await authenticateUser(req.body);
  res.cookie(user._id, user, {
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.json(user);
});

const logoutUser = async (req, res) => {
  try {
    res.clearCookie(req._id);
    //also delete token from client and route to login page
  } catch (err) {
    res.sendStatus(401);
  }
};

//

module.exports = { registerUser, loginUser, logoutUser };

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const query = {
//       name: name,
//       email: email,
//       password: md5(password),
//     };
//     const newUser = await createUser(query);
//     res.json({ message: "Successfully created a new user.", newUser });
//   } catch (err) {
//     console.log("here");
//     res.json({ message: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const query = { email: email, password: md5(password) };
//     const checkUser = await getUser(query);
//     res.cookie(checkUser._id, checkUser, {
//       expires: new Date(Date.now() + 60 * 1000),
//     });
//     const user = { _id: checkUser._id };
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "30d",
//     });
//     res.json({ email: email, accessToken: accessToken });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

// const getUserInfo = async (req, res) => {
//     //   try {
//     //     const { author } = req.body;
//     //     const userPosts = await User.findById(author).populate("posts");
//     //     res.json({ userPosts });
//     //   } catch (err) {
//     //     res.json({ message: err.message });
//     //   }
//     // };
