// ─── AI CHAT WIDGET ───
// Works on both Cyber and Studio pages
// Saves messages to localStorage for admin to view

const CHAT_KEY = 'cx_chat_sessions';
const PAGE_TYPE = document.body.dataset.page || 'cyber'; // 'cyber' or 'studio'

// ─── RESPONSES ───
const BOT_RESPONSES = {
  greet: ["Hello! 👋 I'm CypherX Assistant. How can I help you today?", "Hi there! Welcome to CypherX Stack. What can I do for you?"],
  services: {
    cyber: "We offer:\n• Website Security Assessment\n• Penetration Testing\n• OSINT & Reconnaissance\n• Custom Cyber Tools\n• Security Consulting\n\nWhich service interests you?",
    studio: "We offer:\n• Browser Extension Development\n• Web & Tool Development\n• Digital Marketing & SEO\n• Graphic Design\n• Video Editing & Voiceover\n• Movie/Drama Scripting\n\nWhich one can we help with?"
  },
  pricing: "Pricing is tailored to your project needs. 📩 Contact us at irauf091@gmail.com for a free custom quote!",
  contact: "Reach us directly:\n📧 irauf091@gmail.com\n\nWe respond within 24 hours!",
  pentest: "Our penetration testing covers:\n✅ OWASP Top 10 vulnerabilities\n✅ API & authentication flaws\n✅ SQL injection, XSS, IDOR\n✅ Business logic testing\n✅ Detailed PDF report\n\nWant to discuss your project?",
  osint: "Our OSINT services include target profiling, digital footprint analysis, and threat intelligence gathering using custom tools.",
  website: "We build modern, responsive websites using the latest technologies — from landing pages to full web applications.",
  design: "Our design team creates brand identities, social graphics, UI/UX mockups, and complete visual systems.",
  video: "Professional video editing with color grading, transitions, motion graphics, and sound design.",
  seo: "Full SEO strategy: keyword research, on-page optimization, content writing, and performance tracking.",
  voiceover: "Clear, professional voiceovers for advertisements, explainer videos, podcasts, and media productions.",
  time: "Project timelines depend on scope. Small projects: 1-3 days. Complex ones: 1-2 weeks. We always meet deadlines!",
  default: ["I didn't quite get that 🤔 Could you clarify? You can ask about our services, pricing, or how to contact us.", "I'm not sure about that. Try asking about 'services', 'pricing', or 'contact'!"]
};

function getBotReply(input) {
  const lower = input.toLowerCase();
  if (lower.match(/^(hi|hello|hey|salam|assalam|yo|sup)/)) return rand(BOT_RESPONSES.greet);
  if (lower.match(/service|offer|do you|what do|provide/)) return BOT_RESPONSES.services[PAGE_TYPE];
  if (lower.match(/price|cost|pric|fee|rate|quote|charge|how much|kitna/)) return BOT_RESPONSES.pricing;
  if (lower.match(/contact|email|reach|get in touch|number|phone/)) return BOT_RESPONSES.contact;
  if (lower.match(/pentest|penetrat|hacking|hack|security|cyber|vuln|owasp/)) return BOT_RESPONSES.pentest;
  if (lower.match(/osint|recon|investigat|footprint|intelligence/)) return BOT_RESPONSES.osint;
  if (lower.match(/website|web dev|develop|site/)) return BOT_RESPONSES.website;
  if (lower.match(/design|graphic|logo|brand|ui|ux/)) return BOT_RESPONSES.design;
  if (lower.match(/video|edit|film|cinema|reel/)) return BOT_RESPONSES.video;
  if (lower.match(/seo|content|blog|writing|keyword/)) return BOT_RESPONSES.seo;
  if (lower.match(/voice|voiceover|narrat|audio/)) return BOT_RESPONSES.voiceover;
  if (lower.match(/time|when|how long|deadline|duration/)) return BOT_RESPONSES.time;
  if (lower.match(/thank|thanks|great|awesome|perfect|ok|okay|got it/)) return "You're welcome! 😊 Feel free to ask anything else.";
  if (lower.match(/bye|exit|later|goodbye/)) return "Goodbye! Come back anytime. 👋";
  return rand(BOT_RESPONSES.default);
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── SESSION ───
let sessionId = Date.now().toString();
let messageHistory = [];

function saveMessage(type, text) {
  messageHistory.push({ type, text, time: new Date().toLocaleTimeString() });
  const allSessions = JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
  const idx = allSessions.findIndex(s => s.id === sessionId);
  const session = { id: sessionId, page: PAGE_TYPE, date: new Date().toLocaleString(), messages: messageHistory };
  if (idx === -1) allSessions.unshift(session);
  else allSessions[idx] = session;
  localStorage.setItem(CHAT_KEY, JSON.stringify(allSessions.slice(0, 50)));
}

// ─── DOM ───
function createChatWidget() {
  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.id = 'chatWidget';
  widget.innerHTML = `
    <div class="chat-panel" id="chatPanel">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">CX</div>
          <div>
            <h4>CypherX Assistant</h4>
            <p>● Online — replies instantly</p>
          </div>
        </div>
        <button class="chat-close" id="chatClose" aria-label="Close chat">✕</button>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="quick-chips" id="quickChips"></div>
      <div class="chat-input-row">
        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message..." autocomplete="off" maxlength="200">
        <button class="chat-send" id="chatSend" aria-label="Send">➤</button>
      </div>
    </div>
    <button class="chat-toggle" id="chatToggle" aria-label="Open chat">
      💬
      <span class="notif-dot"></span>
    </button>
  `;
  document.body.appendChild(widget);
  initChatEvents();
  setTimeout(() => addBotMessage(rand(BOT_RESPONSES.greet), false), 800);
  showQuickChips();
}

const QUICK_CHIPS = ['Services', 'Pricing', 'Contact Us', 'Timeline'];

function showQuickChips() {
  const el = document.getElementById('quickChips');
  if (!el) return;
  el.innerHTML = QUICK_CHIPS.map(c =>
    `<button class="chip" onclick="sendMsg('${c}')">${c}</button>`
  ).join('');
}

function addMessage(type, text) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addBotMessage(text, save = true) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.innerHTML = '<em style="opacity:0.5">typing...</em>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    typing.textContent = text;
    if (save) saveMessage('bot', text);
  }, 600 + Math.random() * 400);
}

window.sendMsg = function(text) {
  if (!text.trim()) return;
  addMessage('user', text);
  saveMessage('user', text);
  const input = document.getElementById('chatInput');
  if (input) input.value = '';
  const reply = getBotReply(text);
  setTimeout(() => addBotMessage(reply), 300);
};

function initChatEvents() {
  const toggle = document.getElementById('chatToggle');
  const close = document.getElementById('chatClose');
  const panel = document.getElementById('chatPanel');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');

  toggle?.addEventListener('click', () => {
    panel.classList.toggle('open');
    const dot = toggle.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
  });
  close?.addEventListener('click', () => panel.classList.remove('open'));
  send?.addEventListener('click', () => sendMsg(input.value));
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(input.value); });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', createChatWidget);
