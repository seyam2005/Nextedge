require("dotenv").config({ path: "./server/.env" });

const bcrypt = require("bcryptjs");

// IMPORTANT
const mongoose = require("./server/node_modules/mongoose");

const User = require("./server/models/User");

async function createAdmin() {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const existing = await User.findOne({
      username: "admin"
    });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();

    console.log("✅ Admin Created");
    console.log("Username: admin");
    console.log("Password: admin123");

    process.exit();

  } catch (err) {

    console.log("❌ ERROR");
    console.log(err);

  }
}

createAdmin();