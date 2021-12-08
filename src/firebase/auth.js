const firebaseAuth = (() => {
    const auth = firebase.auth();

    const getUid = async () => {
        try {
            const user = auth.currentUser;
            if (user !== null){
                return user.uid;
            }
            throw {code: "USER_NOT_LOGGED"};
        }catch(error) {
            throw error
        }
    };

    const createLoginUsingEmailAndPassword = async (email, password) => {
        return await auth.createUserWithEmailAndPassword(email, password);
    };

    const loginWithEmailAndPassword = async (email, password) => {
        return await auth.signInWithEmailAndPassword(email, password);
    };

    const signOut = async () => {
        return await auth.signOut();
    };

    return {
        getUid,
        createLoginUsingEmailAndPassword,
        loginWithEmailAndPassword,
        signOut
    };
})()