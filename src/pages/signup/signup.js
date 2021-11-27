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

    const inputs = {
      name: $("#inputName").val(),
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
      confirmPassword: $("#inputConfirmPassword").val(),
    };

    try {
      validatePasswords(inputs.password, inputs.confirmPassword);
      await signup(inputs.email, inputs.password);
      await insertUserDatabase();
      await firebaseAuth.signOut();
      await UTIL.showToast("Cadastro realizado com sucesso! Redirecionando...", "success")
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN)
    } catch (err) {
      UTIL.showToast(err.message ?? err)
      UTIL.toggleDisableForm();
    }
  }

  function validatePasswords(password, confirmPassword) {
    if (password != confirmPassword) {
      throw 'Senhas não coincidem!';
    }
  }

  async function signup(email, password) {
    return firebaseAuth.createLoginUsingEmailAndPassword(email, password);
  }

  async function insertUserDatabase() {
    const data = {
      name: $("#inputName").val(),
      email: $("#inputEmail").val(),
      phone: "",
      address: {},
      images: {},
      points: 0
    };

    const userUid = await firebaseAuth.getUid();
    const ref = `users/${userUid}`
    await firebaseDatabase.writeData(data, ref)
  }
});