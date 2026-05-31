async function loadCareerTimeline() {

  try {

    const response =
      await fetch(
        "http://localhost:5001/api/career"
      );

    const data =
      await response.json();

    const timeline =
      document.getElementById(
        "careerTimeline"
      );

    if (!timeline) return;

    timeline.innerHTML = "";

    data.forEach((item) => {

      timeline.innerHTML += `

<div class="timeline-event">

  <time>
    ${item.year}
  </time>

  <h3>
    ${item.title}
  </h3>

  <p>
    ${item.description}
  </p>

</div>

`;

    });

  } catch (error) {

    console.log(
      "Career Timeline Error",
      error
    );

  }

}

loadCareerTimeline();