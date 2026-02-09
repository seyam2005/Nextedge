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

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // ✨ CONNECTION LINES (NOW SAFE)
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(56,189,248,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

  animate();
}



document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkToggle");
  if (!toggleBtn) {
    console.error("Dark toggle button not found!");
    return;
  }

  const savedTheme = localStorage.getItem("theme");

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light");
      toggleBtn.textContent = "🌙";
    } else {
      document.body.classList.remove("light");
      toggleBtn.textContent = "☀️";
    }
  }

  // Load saved theme or system theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    const newTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  });

});


document.addEventListener("DOMContentLoaded", () => {
  const loadText = document.getElementById("loadText");
  const cursor = document.getElementById("cursorBar");
  const welcomeText = document.getElementById("welcomeText");
  const preloader = document.getElementById("preloader");
  const capsule = document.querySelector(".capsule");

  if (!loadText || !cursor || !welcomeText || !preloader || !capsule) return;

  let percent = 0;

  const loader = setInterval(() => {
    percent++;
    loadText.textContent = `LOADING ${percent}%`;

    if (percent >= 100) {
      clearInterval(loader);

      // Freeze loading text at 100%
      loadText.textContent = "LOADING 100%";

      // Stop blinking for now
      cursor.style.animation = "none";

      // Move cursor smoothly left
      const cursorMoveDuration = 1000; // 1s
      const leftPadding = 10;
      cursor.style.transition = `right ${cursorMoveDuration}ms cubic-bezier(0.65,0,0.35,1)`;
      cursor.style.right = `${capsule.offsetWidth - leftPadding - cursor.offsetWidth}px`;

      // Wait for cursor move to complete
      setTimeout(() => {
        // Hide loading text
        loadText.style.transition = "opacity 0.3s";
        loadText.style.opacity = "0";

        // Reveal WELCOME text
        welcomeText.style.transition = "clip-path 1s ease";
        welcomeText.style.clipPath = "inset(0 0 0 0)";

        // Restore blinking cursor near WELCOME
        cursor.style.left = "10px";
        cursor.style.right = "auto";
        cursor.style.animation = "blink 0.7s infinite alternate";

        // Fade out preloader after welcome animation
        setTimeout(() => {
          preloader.style.transition = "opacity 0.5s";
          preloader.style.opacity = "0";
          setTimeout(() => preloader.remove(), 500);
        }, 800);
      }, cursorMoveDuration);
    }
  }, 25);
});
