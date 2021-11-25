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

    const inputs = {
      name: $("#inputName").val(),
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
      confirmPassword: $("#inputConfirmPassword").val(),
    };

    if (inputs.password != inputs.confirmPassword) {
      showToast("Senhas não coincidem!")
      return;
    }
    
    try {
      await signup(inputs.email, inputs.password);
      await insertUserDatabase();
      await firebaseAuth.signOut();
      await showToast("Cadastro realizado com sucesso! Redirecionando...", "success")
      setTimeout(function () {
        window.location.replace("./index.html")
      }, 5000)
    }catch(err) {
      if (err && err.code && err.message) {
        showToast(err.message)
      }
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