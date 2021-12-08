$(document).ready(function () {
  $("#checkboxShowHidePassword").on("change", onChangeCheckboxPassword);

  function onChangeCheckboxPassword(event) {
    const checkbox = event.target;
    const isChecked = $(checkbox).is(":checked");
    $("#inputConfirmPassword").attr("type", isChecked ? "text" : "password");
  }

  $("#form-signup").on("submit", onSubmitFormLogin);

  async function onSubmitFormLogin(event) {
    event.preventDefault();
    UTIL.toggleDisableForm();

    const inputValues = {
      name: $("#inputName").val(),
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
      confirmPassword: $("#inputConfirmPassword").val(),
    };

    try {
      validatePasswords(inputValues.password, inputValues.confirmPassword);

      await signup(inputValues.email, inputValues.password);
      await insertUserDatabase();
      await firebaseAuth.signOut();

      await UTIL.showToast(MESSAGES.GLOBAL.SUCCESSFULLY_SIGN_UP, ENUMERATIONS.COLORS.SUCCESS);
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN);
    } catch (error) {
      UTIL.showToast(UTIL.errorHandler(error));
    } finally {
      UTIL.toggleDisableForm();
    }
  }

  function validatePasswords(password, confirmPassword) {
    if (password != confirmPassword) {
      throw { code: "PASSWORDS_NOT_MATCH" };
    }
  }

  async function signup(email, password) {
    try {
      return await firebaseAuth.createLoginUsingEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function insertUserDatabase() {
    try {
      const data = {
        name: $("#inputName").val(),
        email: $("#inputEmail").val(),
        phone: "",
        address: {},
        images: {},
        points: 0
      };

      const userUid = await firebaseAuth.getUid();
      if (userUid == null) {
        throw { code: "USER_NOT_LOGGED" };
      }

      const ref = `users/${userUid}`;
      await firebaseDatabase.writeData(data, ref);
    } catch (error) {
      throw error;
    }
  }
});