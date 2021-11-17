const firebaseAuth = async () => {
    const auth = firebase.auth();

    const getUid = async () => {
        await auth.onAuthStateChanged(async (user) => {
            if (user) {
                const currentAuth = auth.currentUser;
                if (currentAuth) {
                    return currentAuth.uid;
                }
            }
            return null;
        });
    };

    const createLoginUsingEmailAndPassword = async (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                return getUid();
            }).catch((error) => {
                throw error;
            });
    };

    const loginwithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                return getUid();
            }).catch((error) => {
                throw error;
            });
    };

    const signOut = async () => {
        return auth.signOut()
            .then((success) => {
                return success;
            }).catch((error) => {
                throw error;
            });
    };

    return {
        getUid,
        createLoginUsingEmailAndPassword,
        loginwithEmailAndPassword,
        signOut
    };
}