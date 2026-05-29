const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* =========================
   ADMIN LOGIN
========================= */

exports.loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        message: "Admin not found",
      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid password",
      });

    }

    // CREATE TOKEN

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    // SAVE COOKIE

    res.cookie("token", token, {

      httpOnly: true,

      secure: false,

      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,

    });

    res.json({

      success: true,

      message: "Admin login successful",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server error",

    });

  }

};