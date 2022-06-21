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

const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, password, imageURL } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.imageURL = imageURL || user.imageURL;

    if (password) {
      user.password = password;
    }

    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name, //name.charAt(0).toUpperCase()+name.slice(1).toLowerCase(),
      email: updateUser.email.toLowerCase(),
      imageURL: updateUser.imageURL,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id)
    })

  } else {
    res.status(400);
    throw new Error('User not found!');
  }

});

module.exports = { registerUser, authUser, updateUserProfile };