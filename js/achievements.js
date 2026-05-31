 console.log("ACHIEVEMENTS LOADED");
async function loadAchievements() {

  try {

    const response =
      await fetch(
        "http://localhost:5001/api/achievements"
      );

    const achievements =
      await response.json();

    const container =
      document.getElementById(
        "achievementContainer"
      );

    if (!container) return;
    console.log(achievements);
    achievements.forEach((item) => {
      console.log(item);
console.log(item.image);
      container.innerHTML += `

<div class="project-card">

  ${
    item.image
      ? `
      <img
        src="http://localhost:5001${item.image}"
        alt="${item.title}"
      >
      `
      : ""
  }

  <div class="project-info">

    <h3>
      ${item.title}
    </h3>

    <p>
      ${item.description}
    </p>

    <p>
      <strong>Year:</strong>
      ${item.year}
    </p>

    <p>
      <strong>Organizer:</strong>
      ${item.organizer || "N/A"}
    </p>

    <div class="project-tag">
      ${item.category}
    </div>

    ${
      item.certificate
        ? `
        <a
          href="http://localhost:5001${item.certificate}"
          target="_blank"
          class="btn-outline"
        >
          View Certificate
        </a>
        `
        : ""
    }

    ${
      item.verificationLink
        ? `
        <a
          href="${item.verificationLink}"
          target="_blank"
          class="btn-outline"
        >
          Verify
        </a>
        `
        : ""
    }

  </div>

</div>

`;
    });

  } catch (error) {

    console.log(error);

  }

}

loadAchievements();