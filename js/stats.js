async function loadStats(){

  try{

    const projects =
    await fetch(
      "http://localhost:5001/api/projects"
    ).then(r=>r.json());

    const achievements =
    await fetch(
      "http://localhost:5001/api/achievements"
    ).then(r=>r.json());

    const career =
    await fetch(
      "http://localhost:5001/api/career"
    ).then(r=>r.json());

    const skills =
    await fetch(
      "http://localhost:5001/api/skills"
    ).then(r=>r.json());

    document.getElementById(
      "totalProjects"
    ).innerText =
    projects.length + "+";

    document.getElementById(
      "totalAchievements"
    ).innerText =
    achievements.length + "+";

    document.getElementById(
      "totalCareer"
    ).innerText =
    career.length + "+";

    document.getElementById(
      "totalSkills"
    ).innerText =
    skills.length + "+";

  }
  catch(error){

    console.log(error);

  }

}

loadStats();