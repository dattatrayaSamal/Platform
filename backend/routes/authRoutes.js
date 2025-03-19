const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPasswprd = await bycrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPasswprd,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ err: "User registartion failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
