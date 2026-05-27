/* ========================================
   NEXTEDGE — main.js (Merged)
   Claude: cursor, reveal observer, modal,
           hero slideshow, stat counter, active nav
   GPT:    particles canvas, preloader capsule,
           navbar scroll, mobile menu, dark toggle,
           mouse glow, toggleMenu()
   ======================================== */

/* ── MOUSE GLOW ── */
const mouseGlow = document.getElementById('mouseGlow') || document.querySelector('.mouse-glow');
if (mouseGlow) {
  document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top  = e.clientY + 'px';
  });
}

/* ── CUSTOM CURSOR ── */
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');

if (cursor && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll(
    'a, button, .project-card, .gallery-item, .sport-card, .social-card, .ai-orb, .chip, .tool-grid div'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ── PRELOADER ── */
document.addEventListener('DOMContentLoaded', () => {
  const preloader   = document.getElementById('preloader');
  const loadText    = document.getElementById('loadText');
  const welcomeText = document.getElementById('welcomeText');
  const wipe        = document.getElementById('wipe');

  if (!preloader || !loadText || !welcomeText || !wipe) {
    if (preloader) preloader.style.display = 'none';
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    loadText.innerHTML = `LOADING ${progress}%<span class="cursor-blink">▍</span>`;

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        wipe.style.right  = '0';
        wipe.style.left   = 'auto';
        wipe.style.width  = '100%';
      }, 10);

      setTimeout(() => {
        loadText.style.opacity = '0';
        welcomeText.innerHTML  = `<span class="cursor-blink">▍</span>WELCOME`;
        welcomeText.style.opacity = '1';
      }, 800);

      setTimeout(() => {
        preloader.style.transition = 'opacity 0.9s ease';
        preloader.style.opacity    = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 1000);
      }, 2200);
    }
  }, 15);
});

/* ── PARTICLES ── */
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = Array.from({ length: 70 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(56,189,248,0.22)';

    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx   = p.x - particles[j].x;
        const dy   = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = 'rgba(56,189,248,0.07)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* ── NAVBAR SCROLL ── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.style.background = 'rgba(2,6,23,0.96)';
      navbar.style.boxShadow  = '0 10px 40px rgba(0,0,0,0.55)';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.background = 'rgba(2,6,23,0.88)';
      navbar.style.boxShadow  = 'none';
    }
  });
}

/* ── MOBILE MENU ── */
const hamburger   = document.getElementById('hamburger');
const menuBtn     = document.getElementById('menuBtn');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const navMenuEl   = document.getElementById('navMenu');

function openMobileMenu()  {
  if (mobileMenu) mobileMenu.classList.add('open');
  if (navMenuEl)  navMenuEl.classList.add('active');
}
function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (navMenuEl)  navMenuEl.classList.remove('active');
}

window.toggleMenu = function() {
  if (navMenuEl) navMenuEl.classList.toggle('active');
};

if (hamburger)  hamburger.addEventListener('click', openMobileMenu);
if (menuBtn)    menuBtn.addEventListener('click', openMobileMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });
}

/* ── DARK / LIGHT TOGGLE ── */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkToggle');
  if (!toggleBtn) return;

  let isDark = true;

  const saved = localStorage.getItem('ne-theme');
  if (saved === 'light') applyLight();

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) applyDark(); else applyLight();
    localStorage.setItem('ne-theme', isDark ? 'dark' : 'light');
  });

  function applyDark() {
    isDark = true;
    toggleBtn.textContent = '🌙';
    const r = document.documentElement.style;
    r.setProperty('--bg',            '#020617');
    r.setProperty('--bg-2',          '#0a0a14');
    r.setProperty('--bg-card',       '#0f172a');
    r.setProperty('--white',         '#e2e8f0');
    r.setProperty('--white-dim',     'rgba(226,232,240,0.6)');
    r.setProperty('--white-muted',   'rgba(226,232,240,0.25)');
    r.setProperty('--border-subtle', 'rgba(255,255,255,0.07)');
  }

  function applyLight() {
    isDark = false;
    toggleBtn.textContent = '☀️';
    const r = document.documentElement.style;
    r.setProperty('--bg',            '#f5f3ef');
    r.setProperty('--bg-2',          '#ece9e2');
    r.setProperty('--bg-card',       '#ffffff');
    r.setProperty('--white',         '#1a1a2e');
    r.setProperty('--white-dim',     'rgba(26,26,46,0.65)');
    r.setProperty('--white-muted',   'rgba(26,26,46,0.35)');
    r.setProperty('--border-subtle', 'rgba(0,0,0,0.08)');
  }
});

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.classList.add('active');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── HERO SLIDESHOW ── */
const heroSlide = document.getElementById('heroSlide');
if (heroSlide) {
  const images = [
    'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?w=900&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80',
  ];
  let idx = 0;
  heroSlide.style.transition = 'opacity 0.6s ease';

  setInterval(() => {
    heroSlide.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % images.length;
      heroSlide.src = images[idx];
      heroSlide.style.opacity = '1';
    }, 600);
  }, 5000);
}

/* ── STAT COUNTER ANIMATION ── */
document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let cur  = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + suffix;
        if (cur >= target) clearInterval(timer);
      }, 25);
      obs.unobserve(el);
    }
  });
  obs.observe(el);
});

/* ── GALLERY MODAL ── */
const modal      = document.getElementById('imgModal');
const modalImg   = document.getElementById('modalImg');
const modalClose = document.querySelector('.modal-close');

if (modal && modalImg) {
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('open');
      modalImg.src = img.src;
    });
  });
  modalClose?.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* ── ACTIVE NAV LINK ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});

/* ── CONTACT FORM ── */

const contactForm = document.getElementById("contactForm");

if(contactForm){

  contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try{

      const res = await fetch("http://localhost:5001/api/contact",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          name,
          email,
          message
        })

      });

      const data = await res.json();

      alert(data.message);

      contactForm.reset();

    }catch(err){

      console.log(err);

      alert("Something went wrong");

    }

  });

}