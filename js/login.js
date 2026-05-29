
const loginForm =
  document.getElementById("loginForm");

const message =
  document.getElementById("message");

loginForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const username =
      document.getElementById("username").value;

    const password =
      document.getElementById("password").value;

    try {

      message.innerText = "Connecting...";

      const res = await fetch(
        "http://localhost:5001/api/auth/login",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),

        }
      );

      const data = await res.json();

      console.log(data);

      // SUCCESS
      if (data.token) {

        // SAVE TOKEN
        localStorage.setItem(
          "adminToken",
          data.token
        );

        message.innerText =
          "Access Granted";

        // REDIRECT
        setTimeout(() => {

          window.location.href =
            "admin.html";

        }, 1200);

      }

      // FAILED
      else {

        message.innerText =
          data.message || "Login Failed";

      }

    } catch (err) {

      console.log(err);

      message.innerText =
        "Server Error";

    }

  }
);
