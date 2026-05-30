console.log("PROJECT JS WORKING");

async function loadProjects() {
  try {
    const response = await fetch(
      "http://localhost:5001/api/projects"
    );

    const projects = await response.json();

    const grid = document.getElementById("projectsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    projects.forEach(project => {

      const imageUrl =
        project.image.startsWith("http")
          ? project.image
          : `http://localhost:5001${project.image}`;

      grid.innerHTML += `
        <div class="project-card reveal">

          <img src="${imageUrl}" alt="${project.title}">

          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>

            <div class="project-tag">
              ${project.category}
            </div>

          </div>

        </div>
      `;
    });

  } catch (err) {
    console.error("Project Load Error:", err);
  }
}

loadProjects();