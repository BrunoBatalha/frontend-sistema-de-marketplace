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

    try {
      await login(inputs.email, inputs.password);
      setLocalStorage()
      await showToast("Login realizado com sucesso! Redirecionando...", "success")
      setTimeout(function () {
        window.location.replace("./home.html")
      }, 3000)
    }catch(err) {
      if (err && err.code && err.message) {
        showToast(err.message)
      }
    }
  }

  async function login(email, password) {
    return firebaseAuth.loginWithEmailAndPassword(email, password);
  }

  async function setLocalStorage() {
    const userUid = await firebaseAuth.getUid()
    localStorage.setItem('userUid', userUid) 
    const ref = `users/${userUid}`
    
    const data = await firebaseDatabase.readData(ref)
    localStorage.setItem('userData', JSON.stringify(data)) 
  }
});