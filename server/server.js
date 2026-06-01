require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const Groq = require("groq-sdk");

const connectDB = require("./config/db");
const Chat = require("./models/chat");

// ── Routes ────────────────────────────────────────
const contactRoutes =
  require("./routes/contactRoutes");
const adminRoutes =
  require("./routes/adminRoutes");
const authRoutes =
  require("./routes/auth");
const projectRoutes =
  require("./routes/projectRoutes");
const uploadRoutes =
  require("./routes/uploadRoutes");
const contentRoutes =
  require("./routes/contentRoutes");   // ← only ONCE
const visitorRoutes =
  require("./routes/visitorRoutes");
const achievementRoutes =
  require("./routes/achievementRoutes");
const careerRoutes =
  require("./routes/careerRoutes");
const skillRoutes =
  require("./routes/skillRoutes");
const researchRoutes =
  require("./routes/researchRoutes");
const experienceRoutes =
  require("./routes/experienceRoutes");

// ── App ───────────────────────────────────────────
const app = express();

// ── Database ──────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ── API Routes ────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/experiences", experienceRoutes);

// ── Test Route ────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🚀 NextEdge Empire Backend Running");
});

// ── GROQ Client ───────────────────────────────────
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── AI Chat Route ─────────────────────────────────
app.post("/api/ai-chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const completion =
      await client.chat.completions.create({
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
You can provide insights, suggestions and creative ideas.
            `,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      });

    const aiReply =
      completion.choices[0].message.content;

    await Chat.create({
      userMessage: userMessage,
      aiReply: aiReply,
    });

    res.json({ reply: aiReply });

  } catch (error) {
    console.log("FULL ERROR =>", error);
    res.status(500).json({ reply: error.message });
  }
});

// ── Start Server ──────────────────────────────────
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

module.exports = app;