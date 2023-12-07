const formUser = document.getElementById("formUser");
const containerPassword = document.getElementById("containerPassword");
const btnNewPassword = document.getElementById("btnNewPassword");
let isInputNewPassword = false;

let inputNewPassword = `<label for="newPassword">Nueva contraseña</label>
<input type="password" name="newPassword" id="newPassword" class="form-control" required>`;

btnNewPassword.addEventListener("click", (e) => {
  if (!isInputNewPassword) {
    containerPassword.innerHTML = inputNewPassword;
    btnNewPassword.innerHTML = "Cancelar nueva contraseña";
    isInputNewPassword = true;
    return;
  }
  containerPassword.innerHTML = "";
  btnNewPassword.innerHTML = "Nueva contraseña";
  isInputNewPassword = false;
});

formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let newPassword = isInputNewPassword
    ? document.getElementById("newPassword")
    : undefined;
  username = username.value;
  email = email.value;
  password = password.value;
  newPassword = isInputNewPassword ? newPassword.value : null;
  const user_json = { username, email, password, newPassword };
  console.log(user_json);
  fetch(URL_PUT_USER, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(user_json),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        const error = data.error;
        Swal.fire({
          icon: "error",
          title: "Error al modificar el usuario",
          text: error,
        });
        return;
      }
      const msg = data.message;
      Swal.fire({
        icon: "success",
        title: "Usuario modificado correctamente",
        text: msg,
      }).then((result) => {
        location.replace("/");
      });
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
});
