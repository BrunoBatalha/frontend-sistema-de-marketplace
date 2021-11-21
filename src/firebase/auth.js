export default (() => {
    const auth = firebase.auth();

    const getUid = () => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                const currentAuth = auth.currentUser;  // CEZ isso faz sentido? tu recebe o user e n usa?
                if (currentAuth) {
                    return currentAuth.uid;
                }
            }
            return null;
        });
    };

    const createLoginUsingEmailAndPassword = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => getUid()).catch((error) => error);
    };

    const loginWithEmailAndPassword = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
            .then(() => getUid()).catch((error) => error);
    };

    const signOut = () => {
        return auth.signOut()
            .then((success) => success).catch((error) => error);
    };

    return {
        getUid,
        createLoginUsingEmailAndPassword,
        loginWithEmailAndPassword,
        signOut
    };
})()