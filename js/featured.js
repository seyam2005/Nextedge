async function loadFeaturedProjects(){

try{

const response =
await fetch(
"http://localhost:5001/api/projects"
);

const projects =
await response.json();

const featured =
projects.filter(
p=>p.featured
);

const container =
document.getElementById(
"featuredProjects"
);

if(!container) return;

container.innerHTML = "";

featured.forEach(project=>{

container.innerHTML += `

<div class="project-card">

<img
src="http://localhost:5001${project.image}"
alt="${project.title}"
>

<div class="project-info">

<h3>
⭐ ${project.title}
</h3>

<p>
${project.description}
</p>

</div>

</div>

`;

});

}
catch(err){

console.log(err);

}

}

loadFeaturedProjects();