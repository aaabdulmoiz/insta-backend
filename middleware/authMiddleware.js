const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    // userid == uid
    if (!req.cookies["insta_user"]) {
      //   means we dont have userinfo against this _id so we should now get it
      console.log("User not found in cookies");
      const userInfo = await User.findById(decoded._id).select("-password");
      //userInfo saved in cookies
      res.cookie("insta_user", userInfo, {
        expires: new Date(Date.now() + 60 * 1000),
      });
    }
    // check user from cookie if exist go ahead as next()
    // if user not found get from db and store in cooki
    req._id = decoded._id;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { protect };
