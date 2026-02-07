// ================= HERO RANDOM IMAGE =================
const heroImg = document.getElementById("heroSlide");

if (heroImg) {
  function loadRandomImage() {
    const url = `https://picsum.photos/900/700?random=${Date.now()}`;
    heroImg.style.opacity = "0";
    setTimeout(() => {
      heroImg.src = url;
      heroImg.style.opacity = "1";
    }, 300);
  }
  loadRandomImage();
}

// ================= MOBILE MENU =================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) nav.classList.toggle("active");
}

// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  if (window.scrollY > 40) {
    nav.style.background = "rgba(2,6,23,0.85)";
    nav.style.boxShadow = "0 10px 40px rgba(0,0,0,0.6)";
    nav.style.backdropFilter = "blur(20px)";
  } else {
    nav.style.background = "rgba(2,6,23,0.6)";
    nav.style.boxShadow = "none";
    nav.style.backdropFilter = "blur(12px)";
  }
});

// ================= DARK MODE =================
const toggleBtn = document.getElementById("darkToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// ================= SCROLL REVEAL =================
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();

// ================= CURSOR LIGHT =================
const cursorLight = document.getElementById("cursorLight");
document.addEventListener("mousemove", e => {
  if (!cursorLight) return;
  cursorLight.style.left = e.clientX + "px";
  cursorLight.style.top = e.clientY + "px";
});

// ================= PARTICLES (FIXED & SAFE) =================
const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // ✅ IMPORTANT FIX
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(56,189,248,0.25)";

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ================= PAGE LOAD FADE =================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
