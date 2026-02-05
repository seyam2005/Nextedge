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
function toggleMenu(){
  const nav = document.getElementById("navMenu");
  if(nav){
    nav.classList.toggle("active");
  }
}


// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (!nav) return;

  if (window.scrollY > 20) {
    nav.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
    nav.style.backdropFilter = "blur(16px)";
  } else {
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


// ================= CATEGORY FILTER =================
const links = document.querySelectorAll("nav a[data-filter]");
const cards = document.querySelectorAll(".card");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const filter = link.dataset.filter;

    cards.forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.category === filter
          ? "block"
          : "none";
    });

    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});


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


// ================= SCROLL REVEAL ANIMATION =================
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < window.innerHeight - 60) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();


// ================= SANITY FETCH (BLOG AUTO LOAD) =================
const PROJECT_ID = "1u0762ms";
const DATASET = "production";

const query = `*[_type == "post"] | order(_createdAt desc){
  title,
  slug,
  mainImage{ asset->{ url } }
}`;

async function fetchPosts() {
  try {
    const url = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPosts(data.result);
    enableImageModal();
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }
}

function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.className = "card reveal";
    postEl.dataset.category = "blog";

    postEl.innerHTML = `
      <img src="${post.mainImage?.asset?.url || ""}" />
      <p>${post.title}</p>
    `;

    container.appendChild(postEl);
  });

  reveal();
}

fetchPosts();
