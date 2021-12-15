'use strict';

const firebaseDatabase = (() => {
    const database = firebase.database();

    const readData = (ref = "/") => {
        return new Promise((resolve, reject) => {
            database.ref(ref).on('value', (snapshot) => {
                if (snapshot.val) {
                    resolve(snapshot.val());
                } else {
                    resolve(snapshot);
                }
            }, error => {
                reject(error);
            });
        });
    };

    const writeData = async (data = {}, ref = "/") => {
        return database.ref(ref).set(data);
    };

    const writeDataRandomGuid = async (data = {}, ref = "/") => {
        return database.ref(ref).push(data);
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

    const getBy = (ref = "/", by, equalTo) => {
        checkProps(by, equalTo);
        return new Promise(async (resolve, reject) => {
            database.ref(ref).orderByChild(by).equalTo(equalTo).limitToFirst(1).on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    resolve({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                resolve(null);
            }, error => {
                reject(error);
            });
        });
    };

    const getListBy = (ref = "/", by, equalTo) => {
        checkProps(by, equalTo);
        return new Promise(async (resolve, reject) => {
            database.ref(ref).orderByChild(by).equalTo(equalTo).on('value', function (snapshot) {
                const list = [];
                snapshot.forEach(function (childSnapshot) {
                    list.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                resolve(list);
            }, error => {
                reject(error);
            });
        });
    };


    const list = (ref) => {
        return new Promise(async (resolve, reject) => {
            database.ref(ref).on('value', function (snapshot) {
                const entities = [];
                snapshot.forEach(function (childSnapshot) {
                    entities.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                resolve(entities);
            }, error => {
                reject(error);
            });
        });
    };

    return {
        readData,
        writeData,
        writeDataRandomGuid,
        updateData,
        deleteData,
        loadUserData,
        getBy,
        getListBy,
        list
    };
})();

function checkProps(...props) {
    props.forEach(p => {
        if (!p) {
            console.error(new Error());
        }
    });

}