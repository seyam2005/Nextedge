const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  year: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "Achievement"
  },

  organizer: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  certificate: {
    type: String,
    default: ""
  },

  verificationLink: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

module.exports =
mongoose.model(
  "Achievement",
  achievementSchema
);