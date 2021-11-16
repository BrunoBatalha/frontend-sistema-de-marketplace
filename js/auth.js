firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentAuth = firebase.auth().currentUser;
        let uid;
        if (currentAuth != null) {
            uid = currentAuth.uid;
        }

        const firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot) => {
            localStorage.setItem("authData", JSON.stringify(dataSnapShot.val()));
            localStorage.setItem("currentAuth", JSON.stringify(currentAuth));
        });

        goTo("inicio.html");
    }
});