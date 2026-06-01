console.log("PROJECT JS WORKING");

let allProjects = [];

/* =========================
   RENDER PROJECTS
========================= */
function renderProjects(projects) {

  const container =
    document.getElementById(
      "projectsContainer"
    );

  if (!container) return;

  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML =
      "<p class='no-result'>No projects found.</p>";
    return;
  }

  projects.forEach(project => {

    container.innerHTML += `

      <div class="project-card">

        ${
          project.image
          ? `<img
               src="http://localhost:5001${project.image}"
               alt="${project.title}"
               class="project-image"
             >`
          : ""
        }

        <div class="project-info">

          <h3>${project.title}</h3>

          <p>${project.description}</p>

          <div class="project-tag">
            ${project.category || "Project"}
          </div>

        </div>

      </div>

    `;

  });

}

/* =========================
   LOAD PROJECTS FROM API
========================= */
async function loadProjects() {

  try {

    const response =
      await fetch(
        "http://localhost:5001/api/projects"
      );

    const projects =
      await response.json();

    allProjects = projects;

    renderProjects(allProjects);

  } catch (err) {

    console.error(
      "Project Load Error:", err
    );

  }

}

/* =========================
   FILTER BUTTONS
========================= */
const buttons =
  document.querySelectorAll(
    ".filter-btn"
  );

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    buttons.forEach(b =>
      b.classList.remove("active")
    );

    btn.classList.add("active");

    const category =
      btn.dataset.category;

    if (category === "all") {

      renderProjects(allProjects);

    } else {

      const filtered =
        allProjects.filter(
          project =>
            project.category === category
        );

      renderProjects(filtered);

    }

  });

});

/* =========================
   INIT
========================= */
loadProjects();