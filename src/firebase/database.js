const firebaseDatabase = (() => {
    const database = firebase.database();

    const readData = async (ref = "/") => {
        return await new Promise((resolve, reject) => {
            database.ref(ref).on('value', (snapshot) => {
                if (snapshot.val) {
                    resolve(snapshot.val());
                }
                resolve(snapshot);
            }, error => {
                reject(error);
            });
        });
    };

    const writeData = async (data = {}, ref = "/") => {
        return database.ref(ref).set(data);
    };

    const updateData = async (data = {}, ref = "/") => {
        return database.ref(ref).update(data);
    };

    const deleteData = async (ref = "/") => {
        return database.ref(ref).delete();
    };

    const loadUserData = () => {
        const userUid = localStorage.getItem("userUid");
        if (!userUid) {
            throw { code: "USER_NOT_LOGGED" };
        }

        const userData = localStorage.getItem("userData");
        if (!userData) {
            throw { code: "ERROR_ON_LOAD_DATA" };
        }
        return JSON.parse(userData);
    };

    return {
        readData,
        writeData,
        updateData,
        deleteData,
        loadUserData
    };
})()