async function loadSkills(){

try{

const response =
await fetch(
"http://localhost:5001/api/skills"
);

const skills =
await response.json();

const container =
document.getElementById(
"skillsGrid"
);

if(!container) return;

container.classList.add(
"skills-grid"
);

container.innerHTML = "";

skills.forEach(skill=>{

container.innerHTML += `

<div class="skill-card">

<div class="skill-top">

<div>

<div class="skill-name">
${skill.name}
</div>

<div class="skill-category">
${skill.category}
</div>

</div>

<div>
${skill.percentage}%
</div>

</div>

<div class="skill-bar">

<div
class="skill-progress"
style="
width:${skill.percentage}%;
">
</div>

</div>

</div>

`;

});

}
catch(err){

console.log(err);

}

}

loadSkills();