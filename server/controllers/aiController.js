

const Groq = require("groq-sdk");
const Chat = require("../models/chat");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithAI = async (req, res) => {

  try {

    const userMessage = req.body.message;

    /* ========================================
       LOAD PREVIOUS CHAT MEMORY
    ======================================== */

    const previousChats = await Chat.find()
      .sort({ createdAt: -1 })
      .limit(8);

    const memoryContext = previousChats
      .reverse()
      .map(chat => {

        return `
User: ${chat.userMessage}
AI: ${chat.aiReply}
        `;

      })
      .join("\n");

    /* ========================================
       SECRET COMMAND SYSTEM
    ======================================== */

    if(userMessage.startsWith("/")){

      let commandReply = "⚠️ Unknown command.";

      switch(userMessage.toLowerCase()){

        case "/creator":

          commandReply =
            "🎬 Creator Mode Activated — cinematic systems online.";

          break;

        case "/jarvis":

          commandReply =
            "🧠 JARVIS protocol initialized. Welcome back, Seyam.";

          break;

        case "/portfolio":

          commandReply =
            "🚀 NextEdge Portfolio System running at maximum creativity.";

          break;

        case "/photography":

          commandReply =
            "📸 Photography archives loaded. Visual storytelling systems active.";

          break;

        case "/videography":

          commandReply =
            "🎥 Videography mode activated. Cinematic rendering online.";

          break;

        case "/sports":

          commandReply =
            "⚽ Athletic profile loaded. Football and cricket systems online.";

          break;

        case "/ai":

          commandReply =
            "🧠 NextEdge AI Core running smoothly at futuristic performance.";

          break;

        case "/help":

          commandReply = `

Available Commands:

/creator
/jarvis
/portfolio
/photography
/videography
/sports
/ai
/help

          `;

          break;

      }

      return res.json({
        reply: commandReply,
      });

    }

    /* ========================================
       AI COMPLETION
    ======================================== */

    const completion = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.8,

      max_tokens: 500,

      messages: [

        {
          role: "system",

          content: `

You are NextEdge AI.

You are a futuristic cinematic AI assistant created for Shahriar Seyam.

Your personality:

- intelligent
- futuristic
- cinematic
- sleek
- premium
- emotionally smart
- calm
- slightly Jarvis-inspired
- visually descriptive

You know everything about:

- NextEdge
- Shahriar Seyam
- photography
- videography
- creative storytelling
- AI systems
- futuristic interfaces
- cinematic websites
- web development
- sports
- East West University

Behavior Rules:

- Keep responses concise
- Sound premium and futuristic
- Never sound robotic
- Use cinematic wording naturally
- Feel like an advanced AI OS
- Be engaging and intelligent
- Sometimes mention creativity and innovation naturally

Previous Conversation Memory:

${memoryContext}

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

    /* ========================================
       SAVE CHAT MEMORY
    ======================================== */

    await Chat.create({

      userMessage,
      aiReply,

    });

    /* ========================================
       SEND RESPONSE
    ======================================== */

    res.json({

      reply: aiReply,

    });

  } catch(error){

    console.log(error);

    res.status(500).json({

      reply:
        "⚠️ NextEdge AI systems temporarily offline.",

    });

  }

};