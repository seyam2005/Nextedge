console.log("TECHLAB JS WORKING");

let allProjects = [];

/* =========================
   RENDER PROJECTS
========================= */
function renderProjects(projects) {
  const container =
    document.getElementById(
      "techProjectsContainer"
    );

  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML =
      "<p class='loading-text'>No projects found.</p>";
    return;
  }

  container.innerHTML = projects.map(p => `
    <div class="project-card">
      ${
        p.image
        ? `<img
             src="http://localhost:5001${p.image}"
             alt="${p.title}"
             class="project-image"
           >`
        : ""
      }
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tag">
          ${p.category || "PROJECT"}
        </div>
      </div>
    </div>
  `).join("");
}

/* =========================
   LOAD PROJECTS FROM API
========================= */
async function loadTechProjects() {
  try {
    const res = await fetch(
      "http://localhost:5001/api/projects"
    );
    const projects = await res.json();
    allProjects = projects;
    renderProjects(allProjects);

  } catch (err) {
    console.error("Failed to load projects:", err);
    document
      .getElementById("techProjectsContainer")
      .innerHTML =
      "<p class='loading-text'>Failed to load projects.</p>";
  }
}

/* =========================
   FILTER BUTTONS
========================= */
const filterBtns =
  document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    filterBtns.forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "all") {
      renderProjects(allProjects);
    } else {
      const filtered = allProjects.filter(
        p => p.category === category
      );
      renderProjects(filtered);
    }

  });
});

/* =========================
   INIT
========================= */
loadTechProjects();