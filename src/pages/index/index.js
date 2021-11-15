$(document).ready(function () {
  $("#checkboxShowHidePassword").on("change", onChangeCheckboxPassword);

  function onChangeCheckboxPassword(event) {
    const checkbox = event.target;
    const isChecked = $(checkbox).is(":checked");
    console.log(isChecked);
    $("#inputPassword").attr("type", isChecked ? "text" : "password");
  }

  $("#form-login").on("submit", onSubmitFormLogin);

  function onSubmitFormLogin(event) {
    event.preventDefault();

    const inputs = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };
    login(inputs.email, inputs.password).then(function () {
      console.log("Logado");
    });
  }

  function login(email, password) {
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  }
});