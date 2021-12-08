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
      await setLocalStorage();

      await UTIL.showToast(MESSAGES.GLOBAL.SUCCESSFULLY_LOGIN, ENUMERATIONS.COLORS.SUCCESS);
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME);
    } catch (error) {
      UTIL.showToast(UTIL.errorHandler(error));
      UTIL.toggleDisableForm();
    }
  }

  async function login(email, password) {
    try {
      return await firebaseAuth.loginWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function setLocalStorage() {
    try {
      const userUid = await firebaseAuth.getUid();
      localStorage.setItem("userUid", userUid);
      const ref = `users/${userUid}`;
      const data = await firebaseDatabase.readData(ref);
      if (!data) {
        throw { code: "DATABASE_FAILED" };
      }
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  }
});
