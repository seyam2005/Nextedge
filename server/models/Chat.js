const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
    },

    aiReply: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);