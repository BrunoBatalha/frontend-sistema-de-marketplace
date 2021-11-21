export default (() => {
    const database = firebase.database().ref();

    const databaseRead = async (path = "/") => {
        var firebaseChild = database.child(path);
        return firebaseChild.on('value', async (snapshot) => {
            return snapshot.val();
        });
    };

    const databaseSave = async (path = "/", data = {}) => {
        const firebaseChild = database.child(path);
        await firebaseChild.set(data);
    };

    const databaseUpdate = async (path = "/", data = {}) => {
        const firebaseChild = database.child(path);
        await firebaseChild.update(data);
    };

    const databaseDelete = async (path = "/") => {
        const firebaseChild = database.child(path);
        await firebaseChild.delete();
    };

    return {
        databaseRead,
        databaseSave,
        databaseUpdate,
        databaseDelete
    };
})()