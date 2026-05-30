async function loadSiteContent() {

  try {

    const res = await fetch(
      "http://localhost:5001/api/content"
    );

    const data = await res.json();

    const title =
    document.getElementById(
      "about-title"
    );

    const text =
    document.getElementById(
      "about-text"
    );

    if(title){

      title.innerHTML =
      data.aboutTitle;

    }

    if(text){

      text.textContent =
      data.aboutText;

    }

  } catch(error){

    console.log(error);

  }

}

loadSiteContent();