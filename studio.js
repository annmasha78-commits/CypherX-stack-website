// ─── CONTENT DEFAULTS ───
const STUDIO_DEFAULTS = {
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

function loadStudioContent() {
  try {
    const stored = localStorage.getItem('cx_studio_content');
    return stored ? { ...STUDIO_DEFAULTS, ...JSON.parse(stored) } : STUDIO_DEFAULTS;
  } catch { return STUDIO_DEFAULTS; }
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

// ─── TYPING HERO ───
const heroWords = ['Extraordinary', 'Memorable', 'Impactful', 'Profitable'];
let wordIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('heroTyping');

function typeEffect() {
  if (!typeEl) return;
  const word = heroWords[wordIndex];
  if (!deleting) {
    typeEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) { deleting = true; return setTimeout(typeEffect, 1800); }
  } else {
    typeEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % heroWords.length; }
  }
  setTimeout(typeEffect, deleting ? 60 : 100);
}
setTimeout(typeEffect, 800);

// ─── LOAD CONTENT ───
function renderStudioContent() {
  const data = loadStudioContent();

  // Services
  const grid = document.getElementById('servicesGrid');
  if (grid) {
    grid.innerHTML = data.services.map(s => `
      <div class="service-card reveal">
        <div class="service-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  // Videos
  const vGrid = document.getElementById('videosGrid');
  if (vGrid) {
    vGrid.innerHTML = data.videos.map((v, i) => `
      <div class="video-card reveal">
        <div class="video-wrapper">
          ${v.url
            ? `<video src="${v.url}" controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; border: 1px solid rgba(201, 168, 76, 0.2);"></video>`
            : `<div class="video-placeholder">
                <div class="play-btn">▶</div>
                <span>Portfolio Video ${i+1}</span>
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
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}


// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('studioContactSubmit');
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
document.addEventListener('DOMContentLoaded', renderStudioContent);
