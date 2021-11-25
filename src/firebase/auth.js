const firebaseAuth = (() => {
    const auth = firebase.auth();

    const getUid = async () => {
        const user = auth.currentUser;
        if (user !== null) 
            return user.uid;
        else 
            return null
    };

    const createLoginUsingEmailAndPassword = async (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    };

    const loginWithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    };

    const signOut = async () => {
        return auth.signOut()
    };

    return {
        getUid,
        createLoginUsingEmailAndPassword,
        loginWithEmailAndPassword,
        signOut
    };
})()