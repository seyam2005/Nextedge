/* =========================
   RESUME — Load from DB
   and generate PDF
========================= */

async function loadResume() {

  try {

    const [projectsRes, skillsRes, careerRes] =
      await Promise.all([
        fetch("http://localhost:5001/api/projects"),
        fetch("http://localhost:5001/api/skills"),
        fetch("http://localhost:5001/api/career")
      ]);

    const projects = await projectsRes.json();
    const skills   = await skillsRes.json();
    const career   = await careerRes.json();

    const container =
      document.getElementById("resumeContainer");

    if (!container) return;

    container.innerHTML = `

      <div class="resume-header">
        <h1>Shahriar Seyam</h1>
        <p>CSE Undergraduate · East West University · Dhaka, Bangladesh</p>
        <p>
          <a href="https://github.com/seyam2005" target="_blank">GitHub</a>
          &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/md-shahriar-hossen-seyam-887b45358" target="_blank">LinkedIn</a>
        </p>
      </div>

      <h2>Education</h2>
      <ul>
        <li>
          <strong>B.Sc. Computer Science & Engineering</strong>
          — East West University, Dhaka (Ongoing)
        </li>
        <li>
          <strong>HSC</strong> — 2024
        </li>
      </ul>

      <h2>Technical Skills</h2>
      <ul>
        ${
          skills.length > 0
          ? skills.map(s => `
              <li>
                <strong>${s.name}</strong>
                — ${s.percentage}%
                ${s.category ? `(${s.category})` : ""}
              </li>
            `).join("")
          : `
            <li>Frontend: HTML, CSS, JavaScript</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Database: MongoDB</li>
            <li>Tools: Git, GitHub, VS Code, Postman</li>
            <li>Creative: Photoshop, Canva, Video Editing</li>
            <li>AI: Prompt Engineering, AI Integration</li>
          `
        }
      </ul>

      <h2>Projects</h2>
      <ul>
        ${
          projects.length > 0
          ? projects.map(p => `
              <li>
                <strong>${p.title}</strong>
                ${p.category ? `(${p.category})` : ""}
                — ${p.description}
              </li>
            `).join("")
          : "<li>NextEdge Platform — Full-stack portfolio system</li>"
        }
      </ul>

      <h2>Career & Experience</h2>
      <ul>
        ${
          career.length > 0
          ? career.map(c => `
              <li>
                <strong>${c.title}</strong>
                (${c.year})
                — ${c.description}
              </li>
            `).join("")
          : `
            <li>2026 — Founder, NextEdge Platform</li>
            <li>2025 — Full Stack Web Development</li>
            <li>2024 — Creative Content & Photography</li>
          `
        }
      </ul>

      <h2>Research Interests</h2>
      <ul>
        <li>Artificial Intelligence & Machine Learning</li>
        <li>Human Computer Interaction</li>
        <li>Web Technologies & Software Engineering</li>
        <li>Computer Vision & Data Science</li>
      </ul>

      <h2>Extracurricular</h2>
      <ul>
        <li>Photography — Street, campus & portrait</li>
        <li>Videography & YouTube Content Creation</li>
        <li>Football & Cricket — Inter-university tournaments</li>
        <li>Club activities & leadership at EWU</li>
      </ul>

      <div style="margin-top:30px; text-align:center;">
        <button
          onclick="downloadPDF()"
          class="btn-primary"
          style="cursor:pointer"
        >
          ⬇ Download as PDF
        </button>
      </div>

    `;

  } catch (err) {
    console.error("Resume load error:", err);
  }

}

/* =========================
   DOWNLOAD AS PDF
   Uses browser print dialog
========================= */
function downloadPDF() {
  window.print();
}

loadResume();