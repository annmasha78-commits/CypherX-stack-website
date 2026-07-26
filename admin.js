// ─── ADMIN DASHBOARD JS ───
const ADMIN_PASS = 'CypherX@2025';
const CYBER_DEFAULTS = {
  stats: { projects: '25+', labs: '150+', hours: '500+', tools: '20+' },
  videos: [
    { title: 'Web App Pentest Demo', desc: 'Full OWASP Top 10 walkthrough', url: '' },
    { title: 'Custom Automation Tool', desc: 'Python-based recon tool in action', url: '' },
    { title: 'OSINT Investigation', desc: 'Target profiling live demo', url: '' }
  ],
  services: [
    { icon: '🛡️', title: 'Website Security Assessment', desc: 'Comprehensive OWASP-aligned audits identifying critical vulnerabilities before attackers do.' },
    { icon: '🔴', title: 'Penetration Testing', desc: 'Manual & automated pentesting for web apps, APIs, and network infrastructure.' },
    { icon: '🤖', title: 'Web Automation Tools', desc: 'Custom Python/Bash tools for scanning, fuzzing, and automated vulnerability detection.' },
    { icon: '🔍', title: 'OSINT & Recon', desc: 'Deep target intelligence gathering using open-source tools and custom scripts.' },
    { icon: '⚠️', title: 'Vulnerability Research', desc: 'In-depth CVE research, PoC development, and responsible disclosure consulting.' },
    { icon: '🧠', title: 'Security Consulting', desc: 'Strategic security advisory for startups, SMEs, and growing businesses.' }
  ]
};
const STUDIO_DEFAULTS = {
  stats: { clients: '50+', projects: '100+', satisfaction: '98%', experience: '3+' },
  videos: [
    { title: 'Browser Extension Showcase', desc: 'Custom Chrome extension in action', url: '' },
    { title: 'Website Development Reel', desc: 'Premium UI/UX builds portfolio', url: '' },
    { title: 'Video Editing Highlight', desc: 'Professional editing workflow', url: '' }
  ],
  services: [
    { icon: '🧩', title: 'Browser Extension Dev', desc: 'Custom Chrome & Firefox extensions tailored to your workflow and business needs.' },
    { icon: '⚙️', title: 'Web Tool Development', desc: 'Powerful online tools, dashboards, and SaaS products built for performance.' },
    { icon: '🌐', title: 'Website Development', desc: 'Stunning, responsive websites and web applications designed to convert.' },
    { icon: '📢', title: 'Digital Marketing', desc: 'Data-driven campaigns across social media, email, and paid channels.' },
    { icon: '🎨', title: 'Graphic Designing', desc: 'Brand identity, social media graphics, logos, and visual storytelling.' },
    { icon: '🎬', title: 'Movie & Drama Scripting', desc: 'Professional screenplay writing for films, dramas, and short-form content.' },
    { icon: '✂️', title: 'Video Editing', desc: 'Cinematic editing with color grading, motion graphics, and sound design.' },
    { icon: '📝', title: 'SEO & Content Writing', desc: 'High-ranking content strategy, blog posts, and copywriting that engages.' },
    { icon: '🎙️', title: 'Professional Voiceover', desc: 'Clear, expressive voiceovers for ads, explainers, and media productions.' }
  ]
};

function load(key, defaults) {
  try { const d = localStorage.getItem(key); return d ? { ...defaults, ...JSON.parse(d) } : JSON.parse(JSON.stringify(defaults)); }
  catch { return JSON.parse(JSON.stringify(defaults)); }
}
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

// ─── LOGIN ───
function initLogin() {
  const loginScreen = document.getElementById('loginScreen');
  const adminApp = document.getElementById('adminApp');
  const loginBtn = document.getElementById('loginBtn');
  const loginInput = document.getElementById('loginPass');
  const loginError = document.getElementById('loginError');

  if (sessionStorage.getItem('cx_admin_auth') === '1') {
    loginScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    initDashboard();
    return;
  }

  loginBtn.addEventListener('click', doLogin);
  loginInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  function doLogin() {
    if (loginInput.value === ADMIN_PASS) {
      sessionStorage.setItem('cx_admin_auth', '1');
      loginScreen.style.display = 'none';
      adminApp.style.display = 'flex';
      initDashboard();
    } else {
      loginError.classList.add('show');
      loginInput.style.borderColor = '#ef4444';
      setTimeout(() => { loginError.classList.remove('show'); loginInput.style.borderColor = ''; }, 2500);
    }
  }
}

// ─── SIDEBAR NAV ───
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const panel = document.getElementById('panel-' + item.dataset.panel);
      if (panel) panel.classList.add('active');
      document.getElementById('topbarTitle').textContent = item.querySelector('.nav-item-label')?.textContent || 'Dashboard';
    });
  });
}

// ─── TABS ───
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tabContent = document.getElementById('tab-' + btn.dataset.tab);
      if (tabContent) tabContent.classList.add('active');
    });
  });
}

// ─── STATS EDITOR ───
function initStatsEditor() {
  // Cyber stats
  const cyberData = load('cx_cyber_content', CYBER_DEFAULTS);
  Object.keys(CYBER_DEFAULTS.stats).forEach(key => {
    const el = document.getElementById(`cyber-stat-${key}`);
    if (el) el.value = cyberData.stats[key];
  });

  // Studio stats
  const studioData = load('cx_studio_content', STUDIO_DEFAULTS);
  Object.keys(STUDIO_DEFAULTS.stats).forEach(key => {
    const el = document.getElementById(`studio-stat-${key}`);
    if (el) el.value = studioData.stats[key];
  });

  document.getElementById('saveCyberStats')?.addEventListener('click', () => {
    const data = load('cx_cyber_content', CYBER_DEFAULTS);
    Object.keys(CYBER_DEFAULTS.stats).forEach(key => {
      const el = document.getElementById(`cyber-stat-${key}`);
      if (el) data.stats[key] = el.value;
    });
    save('cx_cyber_content', data);
    showToast('Cyber stats saved! ✓');
  });

  document.getElementById('saveStudioStats')?.addEventListener('click', () => {
    const data = load('cx_studio_content', STUDIO_DEFAULTS);
    Object.keys(STUDIO_DEFAULTS.stats).forEach(key => {
      const el = document.getElementById(`studio-stat-${key}`);
      if (el) data.stats[key] = el.value;
    });
    save('cx_studio_content', data);
    showToast('Studio stats saved! ✓');
  });
}

// ─── SERVICES EDITOR ───
function buildServicesEditor(type) {
  const container = document.getElementById(`${type}ServicesEditor`);
  if (!container) return;
  const data = load(`cx_${type}_content`, type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS);
  container.innerHTML = data.services.map((s, i) => `
    <div class="service-editor-item">
      <span class="item-num">#${i+1}</span>
      <div class="form-row form-row-3" style="align-items:end">
        <div class="form-group">
          <label>Icon (emoji)</label>
          <input type="text" id="${type}-svc-icon-${i}" value="${s.icon}" maxlength="4">
        </div>
        <div class="form-group" style="grid-column:span 2">
          <label>Title</label>
          <input type="text" id="${type}-svc-title-${i}" value="${s.title}">
        </div>
      </div>
      <div class="form-group" style="margin-top:0.75rem">
        <label>Description</label>
        <textarea id="${type}-svc-desc-${i}" rows="2">${s.desc}</textarea>
      </div>
    </div>
  `).join('');
}

function saveServicesEditor(type) {
  const data = load(`cx_${type}_content`, type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS);
  const defaults = type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS;
  data.services = defaults.services.map((_, i) => ({
    icon: document.getElementById(`${type}-svc-icon-${i}`)?.value || _.icon,
    title: document.getElementById(`${type}-svc-title-${i}`)?.value || _.title,
    desc: document.getElementById(`${type}-svc-desc-${i}`)?.value || _.desc
  }));
  save(`cx_${type}_content`, data);
  showToast(`${type === 'cyber' ? 'Cyber' : 'Studio'} services saved! ✓`);
}

// ─── VIDEOS EDITOR ───
function buildVideosEditor(type) {
  const container = document.getElementById(`${type}VideosEditor`);
  if (!container) return;
  const data = load(`cx_${type}_content`, type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS);
  container.innerHTML = `<div class="video-editor-grid">
    ${data.videos.map((v, i) => `
      <div class="video-editor-item">
        <div class="form-group">
          <label>Video Title</label>
          <input type="text" id="${type}-vid-title-${i}" value="${v.title}">
        </div>
        <div class="form-group" style="margin-top:0.75rem">
          <label>Short Description</label>
          <input type="text" id="${type}-vid-desc-${i}" value="${v.desc}">
        </div>
        <div class="form-group" style="margin-top:0.75rem">
          <label>YouTube URL / Embed URL</label>
          <input type="url" id="${type}-vid-url-${i}" placeholder="https://youtube.com/watch?v=..." value="${v.url}">
        </div>
        ${v.url ? `<div class="video-preview"><iframe src="${getYTEmbed(v.url)}" allowfullscreen></iframe></div>` : ''}
      </div>
    `).join('')}
  </div>`;
}

function saveVideosEditor(type) {
  const data = load(`cx_${type}_content`, type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS);
  const defaults = type === 'cyber' ? CYBER_DEFAULTS : STUDIO_DEFAULTS;
  data.videos = defaults.videos.map((_, i) => ({
    title: document.getElementById(`${type}-vid-title-${i}`)?.value || _.title,
    desc: document.getElementById(`${type}-vid-desc-${i}`)?.value || _.desc,
    url: document.getElementById(`${type}-vid-url-${i}`)?.value || ''
  }));
  save(`cx_${type}_content`, data);
  buildVideosEditor(type); // refresh previews
  showToast('Videos updated! ✓');
}

function getYTEmbed(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\n?#]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

// ─── CHAT VIEWER ───
function loadChatSessions() {
  const container = document.getElementById('chatSessionsList');
  if (!container) return;
  const sessions = JSON.parse(localStorage.getItem('cx_chat_sessions') || '[]');

  // Update overview count
  const countEl = document.getElementById('chatCount');
  if (countEl) countEl.textContent = sessions.length;

  if (!sessions.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">💬</div><p>No chat sessions yet.</p></div>';
    return;
  }
  container.innerHTML = sessions.map(s => `
    <div class="admin-card" style="margin-bottom:1rem">
      <h3>
        <span class="card-icon">${s.page === 'cyber' ? '🔐' : '✨'}</span>
        ${s.page === 'cyber' ? 'Cyber' : 'Studio'} Page Session — ${s.date}
      </h3>
      <table class="chat-table">
        <thead><tr><th>Role</th><th>Message</th><th>Time</th></tr></thead>
        <tbody>
          ${s.messages.map(m => `
            <tr>
              <td><span class="msg-badge ${m.type}">${m.type === 'user' ? '👤 User' : '🤖 Bot'}</span></td>
              <td style="white-space:pre-wrap">${escapeHtml(m.text)}</td>
              <td style="white-space:nowrap;color:rgba(226,232,240,0.4)">${m.time}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join('');
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── OVERVIEW ───
function loadOverview() {
  const cyberData = load('cx_cyber_content', CYBER_DEFAULTS);
  const studioData = load('cx_studio_content', STUDIO_DEFAULTS);
  const sessions = JSON.parse(localStorage.getItem('cx_chat_sessions') || '[]');

  const overviewStats = {
    totalChats: sessions.length,
    cyberServices: cyberData.services.length,
    studioServices: studioData.services.length,
    videos: cyberData.videos.length + studioData.videos.length
  };

  ['totalChats','cyberServices','studioServices','videos'].forEach(key => {
    const el = document.getElementById(`ov-${key}`);
    if (el) el.textContent = overviewStats[key];
  });
}

// ─── LOGOUT ───
function initLogout() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('cx_admin_auth');
    location.reload();
  });
}

// ─── RESET ───
function initReset() {
  document.getElementById('resetCyber')?.addEventListener('click', () => {
    if (confirm('Reset Cyber content to defaults?')) {
      localStorage.removeItem('cx_cyber_content');
      showToast('Cyber content reset ✓');
      setTimeout(() => location.reload(), 800);
    }
  });
  document.getElementById('resetStudio')?.addEventListener('click', () => {
    if (confirm('Reset Studio content to defaults?')) {
      localStorage.removeItem('cx_studio_content');
      showToast('Studio content reset ✓');
      setTimeout(() => location.reload(), 800);
    }
  });
  document.getElementById('clearChats')?.addEventListener('click', () => {
    if (confirm('Clear all chat history?')) {
      localStorage.removeItem('cx_chat_sessions');
      showToast('Chat history cleared ✓');
      setTimeout(() => loadChatSessions(), 500);
    }
  });
}

// ─── SAVE BUTTONS ───
function initSaveButtons() {
  document.getElementById('saveCyberServices')?.addEventListener('click', () => saveServicesEditor('cyber'));
  document.getElementById('saveStudioServices')?.addEventListener('click', () => saveServicesEditor('studio'));
  document.getElementById('saveCyberVideos')?.addEventListener('click', () => saveVideosEditor('cyber'));
  document.getElementById('saveStudioVideos')?.addEventListener('click', () => saveVideosEditor('studio'));
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── INIT DASHBOARD ───
function initDashboard() {
  initNav();
  initTabs();
  initStatsEditor();
  buildServicesEditor('cyber');
  buildServicesEditor('studio');
  buildVideosEditor('cyber');
  buildVideosEditor('studio');
  loadChatSessions();
  loadOverview();
  initSaveButtons();
  initLogout();
  initReset();
}

// ─── BOOT ───
document.addEventListener('DOMContentLoaded', initLogin);
