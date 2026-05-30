const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    console.log("REQ BODY =", req.body);
    console.log("USERNAME =", username);

    const user = await User.findOne({ username });

    console.log("FOUND USER =", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});
module.exports = router;