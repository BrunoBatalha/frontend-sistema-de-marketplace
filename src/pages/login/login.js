$(document).ready(function () {
  $("#checkboxShowHidePassword").on("change", onChangeCheckboxPassword);

  function onChangeCheckboxPassword(event) {
    const checkbox = event.target;
    const isChecked = $(checkbox).is(":checked");
    $("#inputPassword").attr("type", isChecked ? "text" : "password");
  }

  $("#form-login").on("submit", onSubmitFormLogin);

  async function onSubmitFormLogin(event) {
    event.preventDefault();
    UTIL.toggleDisableForm();

    const inputValues = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    try {
      await login(inputValues.email, inputValues.password);
      setLocalStorage();
      await UTIL.showToast(
        "Login realizado com sucesso! Redirecionando...",
        ENUMERATIONS.COLORS.SUCCESS
      );
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME)
    } catch (err) {
      if (err && err.code && err.message) {
        UTIL.showToast(err.message);
      }
      UTIL.toggleDisableForm()
    }
  }

  async function login(email, password) {
    return firebaseAuth.loginWithEmailAndPassword(email, password);
  }

  async function setLocalStorage() {
    const userUid = await firebaseAuth.getUid();
    localStorage.setItem("userUid", userUid);
    const ref = `users/${userUid}`;

    const data = await firebaseDatabase.readData(ref);
    localStorage.setItem("userData", JSON.stringify(data));
  }




});
