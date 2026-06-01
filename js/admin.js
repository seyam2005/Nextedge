const API = "http://localhost:5001/api";

const projectForm = document.getElementById("projectForm");
const projectMessage = document.getElementById("projectMessage");
const projectsContainer = document.getElementById("projectsContainer");
const projectCount = document.getElementById("projectCount");

/* =========================
   LOAD PROJECTS
========================= */
async function loadProjects() {
  try {
    const res = await fetch(`${API}/projects`);
    const projects = await res.json();

    projectsContainer.innerHTML = projects.map(project => `
      <div class="project-item">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <small>${project.category}</small>
        <br><br>
        <button onclick="toggleFeatured('${project._id}')">
          ${project.featured ? "⭐ Featured" : "☆ Feature"}
        </button>
        <button class="delete-btn" onclick="deleteProject('${project._id}')">
          🗑 Delete
        </button>
      </div>
    `).join("");
  } catch (err) {
    console.log(err);
  }
}

/* =========================
   ADD PROJECT
========================= */
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageFile = document.getElementById("image").files[0];
  const category = document.getElementById("category").value;

  try {
    let imagePath = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData
      });

      const uploadData = await uploadRes.json();
      imagePath = uploadData.imageUrl;
    }

    await fetch(`${API}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, image: imagePath, category })
    });

    projectMessage.innerText = "Project Added Successfully";
    projectForm.reset();
    loadProjects();

  } catch (err) {
    console.log(err);
    projectMessage.innerText = "Error Adding Project";
  }
});

/* =========================
   DELETE PROJECT
========================= */
async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  try {
    await fetch(`${API}/projects/${id}`, { method: "DELETE" });
    loadProjects();
  } catch (err) {
    console.log(err);
  }
}

/* =========================
   LOAD ACHIEVEMENTS
========================= */
async function loadAchievements() {
  try {
    const res = await fetch(`${API}/achievements`);
    const achievements = await res.json();
    const container = document.getElementById("achievementsContainer");

    if (!container) return;

    if (achievements.length === 0) {
      container.innerHTML = "<p>No achievements found.</p>";
      return;
    }

    container.innerHTML = achievements.map(a => `
      <div class="project-item" id="achievement-${a._id}">
        <h3>${a.title}</h3>
        <p>${a.description}</p>
        <p><strong>${a.year}</strong> — ${a.category || "Uncategorized"}</p>
        <p>Organizer: ${a.organizer || "N/A"}</p>
        <button class="delete-btn" onclick="deleteAchievement('${a._id}')">
          🗑 Delete
        </button>
      </div>
    `).join("");

  } catch (err) {
    console.error("Failed to load achievements:", err);
  }
}

/* =========================
   ADD ACHIEVEMENT
========================= */
const achievementForm = document.getElementById("achievementForm");

if (achievementForm) {
  achievementForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", document.getElementById("achievementTitle").value);
      formData.append("description", document.getElementById("achievementDescription").value);
      formData.append("year", document.getElementById("achievementYear").value);
      formData.append("category", document.getElementById("achievementCategory").value);
      formData.append("organizer", document.getElementById("achievementOrganizer").value);
      formData.append("verificationLink", document.getElementById("achievementVerification").value);

      const imageFile = document.getElementById("achievementImage").files[0];
      const certificateFile = document.getElementById("achievementCertificate").files[0];

      if (imageFile) formData.append("image", imageFile);
      if (certificateFile) formData.append("certificate", certificateFile);

      const response = await fetch(`${API}/achievements`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      document.getElementById("achievementMessage").innerText = "Achievement Added Successfully";
      achievementForm.reset();
      loadAchievements(); // ← refresh list after adding

    } catch (error) {
      console.log(error);
    }
  });
}

/* =========================
   DELETE ACHIEVEMENT
========================= */
async function deleteAchievement(id) {
  if (!confirm("Delete this achievement?")) return;

  try {
    const res = await fetch(`${API}/achievements/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      document.getElementById(`achievement-${id}`).remove();
    } else {
      alert("Failed: " + data.message);
    }

  } catch (err) {
    console.error("Delete error:", err);
    alert("Something went wrong.");
  }
}

/* =========================
   ABOUT SECTION
========================= */
const aboutForm = document.getElementById("aboutForm");
const aboutMessage = document.getElementById("aboutMessage");

async function loadAbout() {
  const res = await fetch(`${API}/content`);
  const data = await res.json();
  document.getElementById("aboutTitle").value = data.aboutTitle || "";
  document.getElementById("aboutText").value = data.aboutText || "";
}

if (aboutForm) {

  aboutForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const aboutTitle =
        document.getElementById("aboutTitle").value;

      const aboutText =
        document.getElementById("aboutText").value;

      await fetch(`${API}/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          aboutTitle,
          aboutText
        })
      });

      aboutMessage.innerText =
        "About Section Updated";

    }
  );

}
/* =========================
   DASHBOARD STATS
========================= */
async function loadDashboardStats() {
  try {
    const visitorRes = await fetch(`${API}/visitors/stats`);
    const visitorData = await visitorRes.json();
    const visitorCount = document.getElementById("visitorCount");
    if (visitorCount) visitorCount.innerText = visitorData.totalVisits || 0;
  } catch (err) {
    console.log(err);
  }
}

/* =========================
   ONLINE COUNTER
========================= */
const onlineCount = document.getElementById("onlineCount");
if (onlineCount) {
  setInterval(() => {
    onlineCount.innerText = Math.floor(Math.random() * 40) + 220;
  }, 3000);
}

/* =========================
   LOGOUT
========================= */
const logoutBtn =
document.getElementById(
  "logoutBtn"
);

if(logoutBtn){

logoutBtn.addEventListener(
"click",
()=>{

localStorage.removeItem(
"adminToken"
);

window.location.href =
"login.html";

});

}

/* =========================
   INIT — called ONCE each
========================= */
loadProjects();
loadAchievements();
loadAbout();
loadDashboardStats();

/* =========================
   CAREER FORM
========================= */
const careerForm =
document.getElementById(
  "careerForm"
);

if(careerForm){

careerForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const data = {

title:
document.getElementById(
"careerTitle"
).value,

description:
document.getElementById(
"careerDescription"
).value,

year:
document.getElementById(
"careerYear"
).value,

type:
document.getElementById(
"careerType"
).value

};

await fetch(
"http://localhost:5001/api/career",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify(data)
}
);

alert(
"Career Event Added"
);

careerForm.reset();

loadCareer();

});

}

async function loadCareer() {

  try {

    const response =
      await fetch(
        "http://localhost:5001/api/career"
      );

    const data =
      await response.json();

    console.log(data);

  } catch (err) {

    console.log(err);

  }

}
loadCareer();

/* =========================
   LOAD SKILLS
========================= */

async function loadSkills(){

  try{

    const res =
    await fetch(
      `${API}/skills`
    );

    const skills =
    await res.json();

    const container =
    document.getElementById(
      "skillsContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    skills.forEach(skill=>{

      container.innerHTML += `

      <div class="project-item">

        <h3>
          ${skill.name}
        </h3>

        <p>
          ${skill.percentage}%
        </p>

        <small>
          ${skill.category}
        </small>

        <br><br>

        <button
          class="delete-btn"
          onclick="deleteSkill('${skill._id}')"
        >
          🗑 Delete
        </button>

      </div>

      `;

    });

  }
  catch(err){

    console.log(err);

  }

}

/* =========================
   ADD SKILL
========================= */

const skillForm =
document.getElementById(
  "skillForm"
);

if(skillForm){

skillForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const skillData = {

name:
document.getElementById(
"skillName"
).value,

percentage:
document.getElementById(
"skillPercentage"
).value,

category:
document.getElementById(
"skillCategory"
).value

};

await fetch(
`${API}/skills`,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify(skillData)
}
);

document.getElementById(
"skillMessage"
).innerText =
"Skill Added";

skillForm.reset();

loadSkills();

});

}

/* =========================
   DELETE SKILL
========================= */

async function deleteSkill(id){

if(
!confirm(
"Delete this skill?"
)
) return;

await fetch(
`${API}/skills/${id}`,
{
method:"DELETE"
}
);

loadSkills();

}
async function toggleFeatured(id){

try{

await fetch(
`${API}/projects/featured/${id}`,
{
method:"PUT"
}
);

loadProjects();

}
catch(err){

console.log(err);

}

}
const researchForm =
document.getElementById(
"researchForm"
);

if(researchForm){

researchForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

await fetch(
`${API}/research`,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({

title:
document.getElementById(
"researchTitle"
).value,

abstract:
document.getElementById(
"researchAbstract"
).value,

authors:
document.getElementById(
"researchAuthors"
).value,

journal:
document.getElementById(
"researchJournal"
).value,

year:
document.getElementById(
"researchYear"
).value,

paperLink:
document.getElementById(
"researchLink"
).value

})
}
);

alert(
"Publication Added"
);

researchForm.reset();

loadResearch();

});
}

const experienceForm =
document.getElementById(
"experienceForm"
);

if(experienceForm){

experienceForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

await fetch(
`${API}/experience`,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({

title:
document.getElementById(
"experienceTitle"
).value,

organization:
document.getElementById(
"experienceOrganization"
).value,

description:
document.getElementById(
"experienceDescription"
).value,

startDate:
document.getElementById(
"experienceStart"
).value,

endDate:
document.getElementById(
"experienceEnd"
).value,

type:
document.getElementById(
"experienceType"
).value

})
}
);

alert(
"Experience Added"
);

experienceForm.reset();

});
}