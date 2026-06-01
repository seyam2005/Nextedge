const API =
"http://localhost:5001/api";

async function loadResume(){

try{

const [
skillsRes,
projectsRes,
experienceRes,
researchRes,
achievementRes
] = await Promise.all([

fetch(`${API}/skills`),

fetch(`${API}/projects`),

fetch(`${API}/experience`),

fetch(`${API}/research`),

fetch(`${API}/achievements`)

]);

const skills =
await skillsRes.json();

const projects =
await projectsRes.json();

const experience =
await experienceRes.json();

const research =
await researchRes.json();

const achievements =
await achievementRes.json();

const container =
document.getElementById(
"resumeContainer"
);

container.innerHTML = `

<h1>
Seyam Hossain
</h1>

<p>
Computer Science Student
</p>

<hr>

<h2>
Skills
</h2>

<ul>

${skills.map(skill=>`

<li>

${skill.name}

(${skill.percentage}%)

</li>

`).join("")}

</ul>

<hr>

<h2>
Projects
</h2>

<ul>

${projects.map(project=>`

<li>

${project.title}

</li>

`).join("")}

</ul>

<hr>

<h2>
Experience
</h2>

<ul>

${experience.map(exp=>`

<li>

${exp.title}

-

${exp.organization}

</li>

`).join("")}

</ul>

<hr>

<h2>
Research
</h2>

<ul>

${research.map(r=>`

<li>

${r.title}

</li>

`).join("")}

</ul>

<hr>

<h2>
Achievements
</h2>

<ul>

${achievements.map(a=>`

<li>

${a.title}

</li>

`).join("")}

</ul>

`;

}catch(err){

console.log(err);

}

}

loadResume();