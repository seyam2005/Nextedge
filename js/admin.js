
const API =
"http://localhost:5001/api/projects";

const projectForm =
document.getElementById("projectForm");

const projectMessage =
document.getElementById("projectMessage");

const projectsContainer =
document.getElementById("projectsContainer");

const projectCount =
document.getElementById("projectCount");

/* =========================
   LOAD PROJECTS
========================= */

async function loadProjects() {

  try {

    const res =
    await fetch(API);

    const projects =
    await res.json();

    projectsContainer.innerHTML = "";

    projectCount.innerText =
    projects.length;

    projects.forEach(project => {

      projectsContainer.innerHTML += `

        <div class="project-item">

          <h3>${project.title}</h3>

          <p>${project.description}</p>

          <small>
            ${project.category}
          </small>

          <br>

          <button
            class="delete-btn"
            onclick="deleteProject('${project._id}')"
          >
            Delete
          </button>

        </div>

      `;

    });

  } catch (err) {

    console.log(err);

  }

}

/* =========================
   ADD PROJECT
========================= */

projectForm.addEventListener(
"submit",
async (e) => {

  e.preventDefault();

  const title =
  document.getElementById("title").value;

  const description =
  document.getElementById("description").value;

const imageFile =
document.getElementById("image").files[0];

  const category =
  document.getElementById("category").value;

  try {

    let imagePath = "";

    if (imageFile) {

      const formData = new FormData();

      formData.append(
        "image",
        imageFile
      );

      const uploadRes =
      await fetch(
        "http://localhost:5001/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const uploadData =
      await uploadRes.json();

      imagePath =
      uploadData.imageUrl;

    }

    const res =
    await fetch(API, {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"
      },
    
      body: JSON.stringify({

        title,
        description,
        image: imagePath,
        category

      })

    });

    await res.json();

    projectMessage.innerText =
    "Project Added Successfully";

    projectForm.reset();

    loadProjects();

  } catch (err) {

    console.log(err);

    projectMessage.innerText =
    "Error Adding Project";

  }

});

/* =========================
   DELETE PROJECT
========================= */

async function deleteProject(id){

  const confirmDelete =
  confirm(
    "Delete this project?"
  );

  if(!confirmDelete) return;

  try{

    await fetch(
      `${API}/${id}`,
      {
        method:"DELETE"
      }
    );

    loadProjects();

  }catch(err){

    console.log(err);

  }

}

/* =========================
   LOGOUT
========================= */

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener(
"click",
() => {

  localStorage.removeItem(
    "adminToken"
  );

  window.location.href =
  "login.html";

});

/* =========================
   INIT
========================= */

loadProjects();
const aboutForm =
document.getElementById("aboutForm");

const aboutMessage =
document.getElementById("aboutMessage");

/* LOAD ABOUT */

async function loadAbout() {

  const res =
  await fetch(
    "http://localhost:5001/api/content"
  );

  const data =
  await res.json();

  document.getElementById(
    "aboutTitle"
  ).value =
  data.aboutTitle || "";

  document.getElementById(
    "aboutText"
  ).value =
  data.aboutText || "";

}

/* SAVE ABOUT */

aboutForm.addEventListener(
"submit",
async(e)=>{

  e.preventDefault();

  const aboutTitle =
  document.getElementById(
    "aboutTitle"
  ).value;

  const aboutText =
  document.getElementById(
    "aboutText"
  ).value;

  await fetch(
    "http://localhost:5001/api/content",
    {

      method:"PUT",

      headers:{
        "Content-Type":
        "application/json"
      },

      body:JSON.stringify({

        aboutTitle,
        aboutText

      })

    }
  );

  aboutMessage.innerText =
  "About Section Updated";

});

loadAbout();
/* =========================
   DASHBOARD STATS
========================= */

async function loadDashboardStats() {

  try {

    // VISITOR
    const visitorRes =
      await fetch(
        "http://localhost:5001/api/visitor/stats"
      );

    const visitorData =
      await visitorRes.json();

    const visitorCount =
      document.getElementById(
        "visitorCount"
      );

    if (visitorCount) {

      visitorCount.innerText =
        visitorData.totalVisits || 0;

    }

  } catch (err) {

    console.log(err);

  }

}

loadDashboardStats();
/* =========================
   ONLINE COUNTER
========================= */

const onlineCount =
document.getElementById(
  "onlineCount"
);

if (onlineCount) {

  setInterval(() => {

    const random =
      Math.floor(
        Math.random() * 40
      ) + 220;

    onlineCount.innerText =
      random;

  }, 3000);

}