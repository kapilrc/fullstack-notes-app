const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, imageURL } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    imageURL
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name.toLowerCase(),
      email: user.email.toLowerCase(),
      imageURL: user.imageURL,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({
      message: 'Error occurred! User not created'
    });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name.toLowerCase(),
      email: user.email.toLowerCase(),
      imageURL: user.imageURL,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({
      message: 'Invalid Email or Password! Please try again'
    });
  }

});

module.exports = { registerUser, authUser };