const firebaseDatabase = (() => {
    const database = firebase.database();

    const readData = async (ref = "/") => {
        return await new Promise(function (resolve, reject) {
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
        return database.ref(ref).update(null);
    };

    const deleteData = async (ref = "/") => {
        return database.ref(ref).delete();
    };

    const loadUserData = () => {
        const userData = localStorage.getItem("userData");
        const userUid = localStorage.getItem("userUid");
        if (userData && userUid) {
            return JSON.parse(userData);
        }
        throw new Error("Falha ao carregar perfil");
    };

    return {
        readData,
        writeData,
        updateData,
        deleteData,
        loadUserData
    };
})()