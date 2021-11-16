function clientSignUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const typeId = 0;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
        const currentAuth = firebase.auth().currentUser;
        let uid;
        if (currentAuth != null) {
            uid = currentAuth.uid;
        }

        const firebaseRef = firebase.database().ref();
        const authData = { email, password, typeId };
        firebaseRef.child(uid).set(authData);

        goTo("Login.html");
    }).catch((error) => {
        console.error(error);
    });
}

function clientSignIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        goTo("inicio.html");
    }).catch((error) => {
        console.error(error);
    });
}

function clientSignOut() {
    firebase.auth().signOut().then(function () {
        goTo("Login.html");
    }).catch(function (error) {
        console.error(error);
    });
}