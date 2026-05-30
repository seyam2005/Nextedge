require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Groq = require("groq-sdk");

const connectDB = require("./config/db");
const Chat = require("./models/chat");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/auth");
const projectRoutes =
require("./routes/projectRoutes");
const uploadRoutes =
require("./routes/uploadRoutes");
const app = express();
const contentRoutes =
require("./routes/contentRoutes");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/content", contentRoutes);
const path = require("path");
app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
// GROQ CLIENT
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Routes
app.use("/api/contact", contactRoutes);

app.use("/api/admin", adminRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("🚀 NextEdge Empire Backend Running");
});

/* ========================================
   AI CHAT ROUTE
======================================== */

app.post("/api/ai-chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    // AI RESPONSE
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are NextEdge AI.

You speak like an advanced premium AI assistant.

You keep responses sleek, intelligent and futuristic.

You know about:
- cinematic web design
- futuristic interfaces
- AI systems
- Seyam's creative projects
- modern development trends

You can provide insights, suggestions and creative ideas related to these topics.
          `,
        },

        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // AI REPLY
    const aiReply = completion.choices[0].message.content;

    // SAVE TO MONGODB
    await Chat.create({
      userMessage: userMessage,
      aiReply: aiReply,
    });

    // SEND RESPONSE
    res.json({
      reply: aiReply,
    });

  } catch (error) {

    console.log("FULL ERROR =>", error);

    res.status(500).json({
      reply: error.message,
    });
  }
});

// PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
module.exports = app;