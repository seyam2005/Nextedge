// Navbar shadow
window.addEventListener("scroll", () => {
  document.querySelector(".navbar").style.boxShadow =
    window.scrollY > 10 ? "0 4px 15px rgba(0,0,0,0.1)" : "none";
});

// Dark mode
const toggleBtn = document.getElementById("darkToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Image Modal
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

if(modal){
  document.querySelectorAll(".card img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
}

// Scroll reveal
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) el.classList.add("active");
  });
}
window.addEventListener("scroll", reveal);
reveal();
