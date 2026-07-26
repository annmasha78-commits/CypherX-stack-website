// ─── CONTENT DEFAULTS ───
const CYBER_DEFAULTS = {
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

function loadCyberContent() {
  try {
    const stored = localStorage.getItem('cx_cyber_content');
    return stored ? { ...CYBER_DEFAULTS, ...JSON.parse(stored) } : CYBER_DEFAULTS;
  } catch { return CYBER_DEFAULTS; }
}

// ─── NAVBAR ───
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── TERMINAL TYPEWRITER ───
const termLines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'cypherx-stack — elite offensive security collective' },
  { prompt: true, text: 'cat mission.txt' },
  { prompt: false, text: 'We find vulnerabilities before attackers do.\nThen we close them. Permanently.' },
  { prompt: true, text: 'ls ./services/' },
  { prompt: false, text: 'pentest/  osint/  webapp-audit/  custom-tools/  consulting/' },
  { prompt: true, text: '█' }
];

function buildTerminal() {
  const termBody = document.getElementById('termBody');
  if (!termBody) return;
  termBody.innerHTML = '';
  let i = 0;
  function next() {
    if (i >= termLines.length) return;
    const line = termLines[i++];
    const span = document.createElement('div');
    span.style.fontFamily = 'JetBrains Mono, monospace';
    span.style.fontSize = '0.82rem';
    span.style.lineHeight = '1.9';
    if (line.prompt) {
      span.innerHTML = `<span style="color:#00f5d4">$ </span><span style="color:#e2e8f0">${line.text}</span>`;
    } else {
      span.style.color = 'rgba(226,232,240,0.65)';
      span.style.paddingLeft = '1rem';
      span.textContent = line.text;
    }
    termBody.appendChild(span);
    setTimeout(next, line.prompt ? 600 : 400);
  }
  next();
}
setTimeout(buildTerminal, 500);

// ─── LOAD CONTENT FROM STORAGE ───
function renderCyberContent() {
  const data = loadCyberContent();

  // Services
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = data.services.map(s => `
      <div class="service-card reveal">
        <span class="service-icon">${s.icon}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  // Videos
  const videosGrid = document.getElementById('videosGrid');
  if (videosGrid) {
    videosGrid.innerHTML = data.videos.map((v, i) => `
      <div class="video-card reveal">
        <div class="video-wrapper">
          ${v.url
            ? `<video src="${v.url}" controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; border: 1px solid rgba(0, 245, 212, 0.2);"></video>`
            : `<div class="video-placeholder">
                <div class="play-icon">▶</div>
                <span>// Demo Video ${i+1}</span>
               </div>`
          }
        </div>
        <div class="video-info">
          <h4>${v.title}</h4>
          <p>${v.desc}</p>
        </div>
      </div>
    `).join('');
  }

  initReveal();
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}


// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('contactSubmit');
  if(btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
  
  try {
    const fd = new FormData(form);
    const res = await fetch('https://formsubmit.co/ajax/irauf091@gmail.com', {
      method: 'POST', body: fd
    });
    if (res.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Failed to send message.');
    }
  } catch (err) {
    alert('An error occurred. Please try again later.');
  }
  
  if(btn) { btn.textContent = 'Send Message →'; btn.disabled = false; }
});

// ─── INIT ───
document.addEventListener('DOMContentLoaded', renderCyberContent);
