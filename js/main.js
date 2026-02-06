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

  // page load এ একবার change
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
    nav.style.background = "rgba(0,0,0,0.45)";
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


// ================= IMAGE MODAL =================
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

function enableImageModal() {
  if (!modal) return;

  document.querySelectorAll(".card img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      if (modalImg) modalImg.src = img.src;
    });
  });
}

if (closeBtn) {
  closeBtn.onclick = () => (modal.style.display = "none");
}

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};


// ================= SCROLL REVEAL =================
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) el.classList.add("active");
  });
}

window.addEventListener("scroll", reveal);
reveal();


// ================= SANITY BLOG FETCH =================
const PROJECT_ID = "1u0762ms";
const DATASET = "production";

const query = `*[_type == "post"] | order(_createdAt desc){
  title,
  mainImage{ asset->{ url } }
}`;

async function fetchPosts() {
  try {
    const url = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPosts(data.result);
    enableImageModal();
    enableTilt();
  } catch (err) {
    console.log("Sanity fetch skipped");
  }
}

function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const el = document.createElement("div");
    el.className = "card reveal";
    el.innerHTML = `
      <img src="${post.mainImage?.asset?.url || ""}" />
      <p>${post.title}</p>
    `;
    container.appendChild(el);
  });

  reveal();
}

fetchPosts();


// ================= HERO PARALLAX =================
const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");
const heroSlideWrap = document.querySelector(".hero-slideshow");

if (hero) {
  hero.addEventListener("mousemove", e => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    if (heroText) heroText.style.transform = `translate(${x}px, ${y}px)`;
    if (heroSlideWrap) heroSlideWrap.style.transform = `skewX(-12deg) translate(${-x}px, ${-y}px)`;
  });
}


// ================= CURSOR LIGHT =================
const cursorLight = document.getElementById("cursorLight");

document.addEventListener("mousemove", e => {
  if (cursorLight) {
    cursorLight.style.left = e.clientX + "px";
    cursorLight.style.top = e.clientY + "px";
  }
});




// ================= PARTICLES BACKGROUND =================
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(56,189,248,0.3)";
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}


// ================= PAGE LOAD FADE =================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
