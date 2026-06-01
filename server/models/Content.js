const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({

  aboutTitle: {
    type: String,
    default: ""
  },

  aboutText: {
    type: String,
    default: ""
  },

  profileTitle: {
    type: String,
    default: " Undergraduate Student Department of Computer Science at XYZ University"
  },

  profileSubtitle: {
    type: String,
    default: "Future Software Engineer"
  },

  profileFocus: {
    type: String,
    default: "AI • Robotics • Research • Full Stack Development"
  },

  profileSummary: {
    type: String,
    default: "Building technology that solves real-world problems."
  }

});

module.exports = mongoose.model(
  "Content",
  contentSchema
);