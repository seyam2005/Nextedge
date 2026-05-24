require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const connectDB = require("./config/db");


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
const client = new Groq({

  apiKey: process.env.GROQ_API_KEY,

});

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 NextEdge Empire Backend Running");
});
/* AI CHAT ROUTE */

app.post("/api/ai-chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

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

-You can provide insights, suggestions and creative ideas related to these topics.

          `,
        },

        {
          role: "user",

          content: userMessage,
        },
      ],
    });

    res.json({

      reply: completion.choices[0].message.content,

    });

  } catch (error) {

    console.log("FULL ERROR =>", error);

    res.status(500).json({

      reply: error.message,

    });
}
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
