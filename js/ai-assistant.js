/* ========================================
   NEXTEDGE — UPGRADED AI ASSISTANT
   Features:
   - Real typing effect
   - Futuristic loading
   - Memory-ready
   - Secret commands
   - Smooth animations
   - Jarvis feel
   - Premium UX
======================================== */

const aiOrb = document.getElementById("aiOrb");
const aiPanel = document.getElementById("aiPanel");
const closeAI = document.getElementById("closeAI");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

const aiChat = document.getElementById("aiChat");
const aiSound = document.getElementById("aiSound");

/* ========================================
   SAFETY CHECK
======================================== */

if (
  !aiOrb ||
  !aiPanel ||
  !closeAI ||
  !sendBtn ||
  !userInput ||
  !aiChat
) {
  console.warn("NextEdge AI system missing elements.");
}

/* ========================================
   AI MEMORY
======================================== */

let chatHistory = [];

/* ========================================
   OPEN AI PANEL
======================================== */

aiOrb.addEventListener("click", () => {

  aiPanel.classList.add("active");
  aiPanel.classList.add("open");

  aiPanel.style.display = "flex";

  playAISound();

  setTimeout(() => {
    userInput.focus();
    scrollBottom();
  }, 200);
});

/* ========================================
   CLOSE PANEL
======================================== */

closeAI.addEventListener("click", () => {

  aiPanel.classList.remove("active");
  aiPanel.classList.remove("open");

  aiPanel.style.opacity = "0";

  setTimeout(() => {

    if (!aiPanel.classList.contains("active")) {

      aiPanel.style.display = "none";
      aiPanel.style.opacity = "";

    }

  }, 300);

});

/* ========================================
   PLAY AI SOUND
======================================== */

function playAISound() {

  if (!aiSound) return;

  aiSound.currentTime = 0;

  aiSound.play().catch(() => {});

}

/* ========================================
   ENTER TO SEND
======================================== */

userInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {
    sendMessage();
  }

});

/* ========================================
   SEND BUTTON
======================================== */

sendBtn.addEventListener("click", sendMessage);

/* ========================================
   SEND MESSAGE
======================================== */

async function sendMessage() {

  const text = userInput.value.trim();

  if (!text) return;
  /* ========================================
   SECRET COMMANDS
======================================== */

if (text.toLowerCase() === "/about") {

  appendMessage(text, "user");

  appendMessage(`
👋 I am Shahriar Seyam.

Computer Science & Engineering student at East West University.

Founder of NextEdge.

I work with:
• Web Development
• AI Systems
• Photography
• Videography
• Creative Content

My goal is to build futuristic digital experiences.
  `, "bot");

  userInput.value = "";

  return;
}

if (text.toLowerCase() === "/skills") {

  appendMessage(text, "user");

  appendMessage(`
⚡ Core Skills

• HTML
• CSS
• JavaScript
• Node.js
• Express.js
• MongoDB
• AI Integration
• Photography
• Videography
  `, "bot");

  userInput.value = "";

  return;
}

if (text.toLowerCase() === "/projects") {

  appendMessage(text, "user");

  appendMessage(`
🚀 Current Projects

• NextEdge Portfolio
• AI Assistant System
• Dynamic CMS
• Photography Showcase
• Videography Platform
  `, "bot");

  userInput.value = "";

  return;
}

if (text.toLowerCase() === "/contact") {

  appendMessage(text, "user");

  appendMessage(`
📩 Contact Shahriar Seyam

Facebook:
https://facebook.com

LinkedIn:
https://linkedin.com

GitHub:
https://github.com/seyam2005
  `, "bot");

  userInput.value = "";

  return;
}
  /* =========================
     USER MESSAGE
  ========================= */

  appendMessage(text, "user");

  chatHistory.push({
    role: "user",
    content: text
  });

  userInput.value = "";

  /* =========================
     THINKING INDICATOR
  ========================= */

  const thinking = createThinkingBubble();

  aiChat.appendChild(thinking);

  scrollBottom();

  try {

    const response = await fetch(
      "http://localhost:5001/api/ai-chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: text
        })
      }
    );

    const data = await response.json();

    thinking.remove();

    const reply =
      data.reply ||
      "⚠️ NextEdge AI failed to respond.";

    const botBubble = createBotBubble();

    aiChat.appendChild(botBubble);

    await realisticTypeText(botBubble, reply);

    chatHistory.push({
      role: "assistant",
      content: reply
    });

  } catch (error) {

    console.log(error);

    thinking.remove();

    appendMessage(
      "⚠️ AI connection failed. Server offline.",
      "bot"
    );

  }

  scrollBottom();

}

/* ========================================
   APPEND MESSAGE
======================================== */

function appendMessage(text, role) {

  const div = document.createElement("div");

  div.classList.add("msg");

  if (role === "user") {

    div.classList.add("user");

  } else {

    div.classList.add("bot");
    div.classList.add("ai-message");

  }

  div.innerHTML = text;

  aiChat.appendChild(div);

  scrollBottom();

  return div;

}

/* ========================================
   BOT BUBBLE
======================================== */

function createBotBubble() {

  const div = document.createElement("div");

  div.classList.add(
    "msg",
    "bot",
    "ai-message",
    "typing-message"
  );

  return div;

}

/* ========================================
   THINKING BUBBLE
======================================== */

function createThinkingBubble() {

  const div = document.createElement("div");

  div.classList.add("thinking");

  div.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  return div;

}

/* ========================================
   REALISTIC TYPING EFFECT
======================================== */

async function realisticTypeText(element, text) {

  let index = 0;

  element.innerHTML = "";

  return new Promise((resolve) => {

    const interval = setInterval(() => {

      if (index < text.length) {

        const char = text.charAt(index);

        element.innerHTML += char;

        index++;

        scrollBottom();

        let speed = 12;

        if (char === ".") speed = 80;
        if (char === ",") speed = 40;
        if (char === "\n") speed = 20;

      } else {

        clearInterval(interval);

        element.classList.remove("typing-message");

        resolve();

      }

    }, 15);

  });

}

/* ========================================
   AUTO SCROLL
======================================== */

function scrollBottom() {

  aiChat.scrollTop = aiChat.scrollHeight;

}

/* ========================================
   SECRET COMMAND HIGHLIGHT
======================================== */

userInput.addEventListener("input", () => {

  const value = userInput.value.trim();

  if (value.startsWith("/")) {

    userInput.style.color = "#38bdf8";
    userInput.style.textShadow =
      "0 0 10px rgba(56,189,248,0.6)";

  } else {

    userInput.style.color = "";
    userInput.style.textShadow = "";

  }

});

/* ========================================
   AI ORB FLOATING EFFECT
======================================== */

let orbAngle = 0;

function animateOrb() {

  orbAngle += 0.02;

  const y = Math.sin(orbAngle) * 6;

  aiOrb.style.transform =
    `translateY(${y}px)`;

  requestAnimationFrame(animateOrb);

}

animateOrb();

/* ========================================
   PANEL OPEN ANIMATION
======================================== */

window.addEventListener("load", () => {

  setTimeout(() => {

    aiOrb.classList.add("online");

  }, 1200);

});

/* ========================================
   RANDOM AI STATUS
======================================== */

const statuses = [

  "Creative Systems Online",
  "AI Vision Active",
  "NextEdge Neural Core Ready",
  "Cinematic Engine Running",
  "Awaiting Command"

];

setInterval(() => {

  const statusEl =
    document.querySelector(".ai-status");

  if (!statusEl) return;

  const random =
    statuses[
      Math.floor(
        Math.random() * statuses.length
      )
    ];

  statusEl.innerHTML = `
    <span class="ai-status-dot"></span>
    ${random}
  `;

}, 6000);

/* ========================================
   GLASSMORPHIC HOVER EFFECT
======================================== */

document.addEventListener("mousemove", (e) => {

  const x =
    (e.clientX / window.innerWidth) * 100;

  const y =
    (e.clientY / window.innerHeight) * 100;

  aiPanel.style.background =
    `
    radial-gradient(
      circle at ${x}% ${y}%,
      rgba(56,189,248,0.10),
      rgba(15,23,42,0.96)
    )
  `;

});

/* ========================================
   MOBILE FIX
======================================== */

window.addEventListener("resize", () => {

  scrollBottom();

});

/* ========================================
   STARTUP MESSAGE
======================================== */

window.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {

    const startup = `
⚡ NextEdge AI initialized.
👋 Welcome to NextEdge.

I am the personal AI assistant of Shahriar Seyam.

Try:

/about
/skills
/projects

Ask anything about Shahriar's work, projects and creative journey.
`;

    const firstMsg =
      document.querySelector(".msg.bot");

    if (firstMsg) {

      firstMsg.innerHTML = startup;

    }

  }, 1000);

const quickBtns =
document.querySelectorAll(".quick-btn");

quickBtns.forEach(btn=>{

  btn.addEventListener("click",()=>{

    userInput.value =
    btn.innerText;

    sendMessage();

  });

});

});
