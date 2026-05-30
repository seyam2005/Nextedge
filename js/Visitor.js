console.log("VISITOR SYSTEM LOADED");

/* REGISTER NEW VISIT */

async function registerVisit() {

  try {

    await fetch(
      "http://localhost:5001/api/visitors",
      {
        method: "POST"
      }
    );

  } catch (error) {

    console.log(error);

  }

}

/* LOAD TOTAL VISITORS */

async function loadVisitors() {

  try {

    const response = await fetch(
      "http://localhost:5001/api/visitors"
    );

    const data = await response.json();

    const counter =
      document.getElementById(
        "visitorCount"
      );

    if (counter) {

      counter.innerText =
        data.count;

    }

  } catch (error) {

    console.log(error);

  }

}

/* RUN */

registerVisit();

setTimeout(() => {

  loadVisitors();

}, 500);