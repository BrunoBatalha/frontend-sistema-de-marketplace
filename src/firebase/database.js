const firebaseDatabase = (() => {
    const database = firebase.database();

    const readData = async (ref = "/") => {
        const value = await new Promise(function (resolve, reject) {
            database.ref(ref).on('value', (snapshot) => {
                resolve(snapshot.val());
            });
        });
        return value;
    };

    const writeData = async (data = {}, ref = "/") => {
        return database.ref(ref).set(data);
    };

    const updateData = async (data = {}, ref = "/") => {
        return database.ref(ref).update(null);
    };

    const deleteData = async (ref = "/") => {
        return database.ref(ref).delete();
    };

    return {
        readData,
        writeData,
        updateData,
        deleteData
    };
})()