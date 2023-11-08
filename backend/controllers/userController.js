const User = require("../models/usermodel");
const Book = require('../models/bookmodel');
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//login user
module.exports.loginUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  try {
    const user = await User.login(email, password, isAdmin);
    const token = createToken(user._id);
    console.log(user);
    const Admin = await user.isAdmin;
    const Id = await user._id
    console.log(Id)

    res.status(200).json({ Id, Admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
module.exports.signupUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  try {
    const user = await User.signup(email, password, isAdmin);
    const token = createToken(user._id);
    const Admin = await user.isAdmin;
    const Id = await user._id
    console.log(Id)

    res.status(200).json({ Id, Admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = createToken(user._id);

    res.status(200).json({ email: user.email, id: user._id, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deleteuser = async (req, res) => {
  const userId = req.body.userId
  const user = await User.findOneAndDelete({ _id: userId })
  if (!user) {
    return res.status(400).json({ error: 'no such user' })
  }
  return res.send({ code: 200, message: 'succesfully deleted user', user: user })
};





// module.exports = { loginUser, signupUser, getUserByEmail };
