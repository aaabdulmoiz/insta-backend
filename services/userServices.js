const User = require("../models/userModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { validateRegistration } = require("../helpers/validateFields");

const createNewUser = async (body) => {
  const { name, email, password } = body;
  validateRegistration(body);
  const userExists = await getUser({ email: email });
  if (userExists) {
    throw new Error("User with this email already exists.");
  }
  const query = {
    name: name,
    email: email,
    password: md5(password),
  };
  const newUser = await createUser(query);
  return { message: "User registered", newUser };
};

const authenticateUser = async (body) => {
  const { email, password } = body;
  const query = { email: email, password: md5(password) };
  const checkUser = await getUser(query);
  if (!checkUser) {
    throw new Error("Invalid email or password.");
  }
  const user = { _id: checkUser._id };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return {
    userId: checkUser._id,
    name: checkUser.name,
    accessToken: accessToken,
  };
};

const createUser = async (query) => {
  try {
    const newUser = await User.create(query);
    return newUser;
  } catch (err) {
    throw new Error("Unable to create new User.");
  }
};

const getUser = async (query) => {
  try {
    // console.log("query is ", query);
    const checkUser = await User.findOne(query).select("name");
    return checkUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUsers = async (query) => {
  try {
    const checkUsers = await User.find(query).select("name");
    return checkUsers;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateOneUser = async (query) => {
  try {
    const updatedUser = await User.updateOne(query);
    return updatedUser;
  } catch (err) {
    throw new Error("Could not update the user.");
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateOneUser,
  authenticateUser,
  createNewUser,
};
