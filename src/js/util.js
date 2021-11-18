const firebaseUtil = async () => {
    const firebaseDatabaseRef = firebase.database().ref();

    const databaseRead = async (path = "/") => {
        var firebaseChild = firebaseDatabaseRef.child(path);
        return firebaseChild.on('value', async (snapshot) => {
            return snapshot.val();
        });
    };

    const databaseSave = async (path = "/", data = {}) => {
        const firebaseChild = firebaseDatabaseRef.child(path);
        await firebaseChild.set(data);
    };

    const databaseUpdate = async (path = "/", data = {}) => {
        const firebaseChild = firebaseDatabaseRef.child(path);
        await firebaseChild.update(data);
    };

    const databaseDelete = async (path = "/") => {
        const firebaseChild = firebaseDatabaseRef.child(path);
        await firebaseChild.delete();
    };

    const goTo = (url, timeout = 1000) => {
        setTimeout(() => {
            window.location.replace(url);
        }, timeout);
    };

    return {
        databaseRead,
        databaseSave,
        databaseUpdate,
        databaseDelete,
        goTo
    };

}