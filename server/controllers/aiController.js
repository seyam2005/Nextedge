const Groq = require("groq-sdk");
const Chat = require("../models/chat");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are NextEdge AI.

You speak like a premium futuristic AI assistant.

You know about:
- cinematic web design
- AI systems
- futuristic interfaces
- creative storytelling
- Seyam's projects
- photography
- videography
- modern web development

Keep responses sleek and intelligent.
          `,
        },

        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const aiReply = completion.choices[0].message.content;

    // SAVE TO DATABASE
    await Chat.create({
      userMessage,
      aiReply,
    });

    res.json({
      reply: aiReply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply: "AI system error",
    });
  }
};