/* ========================================
   NEXTEDGE — ai-assistant.js (Merged)
   GPT:    orb open/close, AI sound, typeText,
           Enter key
   Claude: .open class toggle, .msg styling,
           Anthropic API fetch, typing indicator
   ======================================== */

const aiOrb     = document.getElementById('aiOrb');
const aiPanel   = document.getElementById('aiPanel');
const closeAI   = document.getElementById('closeAI');
const sendBtn   = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const aiChat    = document.getElementById('aiChat');
const aiSound   = document.getElementById('aiSound');

if (!aiOrb || !aiPanel || !closeAI || !sendBtn || !userInput || !aiChat) {
  console.warn('NextEdge AI: One or more elements missing.');
} else {

  /* ── Unlock audio on first interaction ── */
  document.body.addEventListener('click', () => {
    if (aiSound) aiSound.load();
  }, { once: true });

  /* ── OPEN panel ── */
  aiOrb.addEventListener('click', () => {
    aiPanel.classList.add('active');
    aiPanel.classList.add('open');
    aiPanel.style.display = 'flex';

    if (aiSound) {
      aiSound.currentTime = 0;
      aiSound.play().catch(() => {});
    }

    setTimeout(() => { aiChat.scrollTop = aiChat.scrollHeight; }, 50);
  });

  /* ── CLOSE panel ── */
  closeAI.addEventListener('click', () => {
    aiPanel.classList.remove('active');
    aiPanel.classList.remove('open');
    aiPanel.style.opacity = '0';
    setTimeout(() => {
      if (!aiPanel.classList.contains('active')) {
        aiPanel.style.display = 'none';
        aiPanel.style.opacity = '';
      }
    }, 350);
  });

  /* ── Enter key to send ── */
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  /* ── Button click to send ── */
  sendBtn.addEventListener('click', sendMessage);

  /* ── SEND MESSAGE ── */
  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Typing indicator
    const typing = document.createElement('div');
    typing.classList.add('typing');
    typing.innerHTML = '<span></span><span></span><span></span>';
    aiChat.appendChild(typing);
    aiChat.scrollTop = aiChat.scrollHeight;

    try {
      /* ── Anthropic API ── */
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are the NextEdge AI assistant for Shahriar Seyam's creative portfolio website called NextEdge.
Shahriar is a student at East West University (EWU), Bangladesh. He is a photographer, videographer, web developer, and content creator.
His portfolio (NextEdge) includes: Photography, Videography, Sports (Football & Cricket), Campus life (Uni Life), and Web projects.
Answer questions about his work, skills, and creative journey in a warm, professional, and concise way.
Keep replies under 3 sentences unless asked for more detail.`,
          messages: [{ role: 'user', content: text }]
        })
      });

      const data = await response.json();
      typing.remove();

      const reply = data?.content?.[0]?.text || 'I had trouble responding. Please try again.';

      const botBubble = createBotBubble();
      aiChat.appendChild(botBubble);
      typeText(botBubble, reply);

    } catch (error) {
      typing.remove();
      try {
        const res  = await fetch('http://localhost:5001/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        const botBubble = createBotBubble();
        aiChat.appendChild(botBubble);
        typeText(botBubble, data.reply || 'No reply received.');
      } catch {
        appendMessage('AI connection failed. Check your network or server.', 'bot');
      }
    }

    aiChat.scrollTop = aiChat.scrollHeight;
  }

  /* ── HELPERS ── */

  function appendMessage(text, role) {
    const div = document.createElement('div');
    if (role === 'user') {
      div.classList.add('msg', 'user');
    } else {
      div.classList.add('msg', 'bot', 'ai-message');
    }
    div.textContent = text;
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
    return div;
  }

  function createBotBubble() {
    const div = document.createElement('div');
    div.classList.add('msg', 'bot', 'ai-message');
    return div;
  }

  function typeText(element, text) {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        aiChat.scrollTop = aiChat.scrollHeight;
      } else {
        clearInterval(interval);
      }
    }, 15);
  }
}