const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("formTitle");

function toggleForm() {
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    formTitle.innerHTML = "Iniciar Sesión";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    formTitle.innerHTML = "Crear usuario";
  }
}

const setSettingsUser = (data) => {
  localStorage.setItem("x-access-tokens", data.token);
  localStorage.setItem("user_id", data.user_id);
  location.replace("/");
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let { username, password } = loginForm.elements;
  username = username.value;
  password = password.value;
  const user_json = { username, password };
  console.log(JSON.stringify(user_json));
  fetch(API_LOGIN, {
    method: "POST",
    body: JSON.stringify(user_json),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        const msg = data.error;
        Swal.fire({
          icon: "error",
          title: "Error en el inicio de sesión",
          text: msg,
        });
        return;
      }
      console.log(data.user_id);
      setSettingsUser(data);
    })
    .catch((e) => console.error(e));
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let { newUsername, newEmail, newPassword } = signupForm.elements;
  const username = newUsername.value;
  const email = newEmail.value;
  const password = newPassword.value;
  const user_json = { username, email, password };
  console.log(JSON.stringify(user_json));
  fetch(API_SINGUP, {
    method: "POST",
    body: JSON.stringify(user_json),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        const msg = data.error;
        Swal.fire({
          icon: "error",
          title: "Error al crear el usuario",
          text: msg,
        });
        return;
      }
      //location.replace("/");
      toggleForm();
    })
    .catch((e) => console.error(e));
});
