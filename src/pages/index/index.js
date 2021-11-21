import firebaseAuth from "../../firebase/auth.js";

$(document).ready(function () {
  $("#checkboxShowHidePassword").on("change", onChangeCheckboxPassword);

  function onChangeCheckboxPassword(event) {
    const checkbox = event.target;
    const isChecked = $(checkbox).is(":checked");
    console.log(isChecked);
    $("#inputPassword").attr("type", isChecked ? "text" : "password");
  }

  $("#form-login").on("submit", onSubmitFormLogin);

  async function onSubmitFormLogin(event) {
    event.preventDefault();

    const inputs = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    const response = await login(inputs.email, inputs.password);
    if (response) {
      setTimeout(() => {
        window.location.replace("./home.html");
      }, timeout);
    }
  }

  async function login(email, password) {
    return firebaseAuth.loginWithEmailAndPassword(email, password);
  }
});