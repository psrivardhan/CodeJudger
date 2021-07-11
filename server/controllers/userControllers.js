const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// To signup the user

const signup = async (req, res) => {
  const { handle, firstName, lastName, email, password, confirmPassword } =
    req.body;

  let problemStatus = new Map();

  if (!handle || !firstName || !email || !password || !confirmPassword)
    return res.json({ message: "Please Enter all required fields!" });

  if (password.length < 6)
    return res.json({
      message: "Please Set a password of at least 6 characters!",
    });

  if (password !== confirmPassword)
    return res.json({ message: "Passwords does not match!" });

  const existingUser = await User.findOne({ handle: handle });

  if (existingUser)
    return res.json({ message: "An account with this handle already exists!" });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    handle,
    firstName,
    lastName,
    email,
    passwordHash,
    problemStatus,
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 6048000000,
    })
    .json(newUser);
};

// To signin by the user

const signin = async (req, res) => {
  const { handle, password } = req.body;

  if (!handle || !password)
    return res.json({ message: "Please Enter all required fields!" });

  const existingUser = await User.findOne({ handle }).select(["-submissions"]);

  if (!existingUser)
    return res.json({ message: "Invalid Handle or Password!" });

  const passwordCorrect = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!passwordCorrect) {
    return res.json({ message: "Invalid Handle or Password!" });
  }

  const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .json(existingUser);
};

// To signout by the user

const signout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

// Get basic info of signed user

const getInfo = async (req, res) => {
  const id = req.userId;
  const existingUser = await User.findById(id).select([
    "-submissions",
    "-passwordHash",
  ]);

  res.status(201).json(existingUser);
};

// To get the whole data of any user to display profile

const getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await User.findById(id).select("-passwordHash");
    res.status(201).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { signup, signin, signout, getInfo, getUserData };
