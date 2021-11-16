function storeSignUp() {
    const name = document.getElementById("store").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const typeId = 1;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
        const currentAuth = firebase.auth().currentUser;
        let uid;
        if (currentAuth != null) {
            uid = currentAuth.uid;
        }

        const firebaseRef = firebase.database().ref();
        const authData = { email, password, name, typeId };
        firebaseRef.child(uid).set(authData);

        goTo("Lemprend.html");
    }).catch((error) => {
        console.error(error);
    });
}

function storeSignIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        goTo("inicio.html");
    }).catch((error) => {
        console.error(error);
    });
}

function storeSignOut() {
    firebase.auth().signOut().then(function () {
        goTo("Cempreend.html");
    }).catch(function (error) {
        console.error(error);
    });
}

