const _REF = "shop";
const _properties = {
    name: "name",
    cnpj: "cnpj",
    comercialPhone: "comercialPhone",
    productTypes: "productTypes",
    state: "state",
    instagram: "instagram",
    facebook: "facebook",
    _idUser: "_idUser"
}
const shopFacade = {
    insert: async function (name, cnpj, comercialPhone, productTypes, state, instagram, facebook) {
        try {
            const data = {
                [_properties.name]: name ?? "",
                [_properties.cnpj]: cnpj ?? "",
                [_properties.comercialPhone]: comercialPhone ?? "",
                [_properties.productTypes]: productTypes ?? "",
                [_properties.state]: state ?? "",
                [_properties.instagram]: instagram ?? "",
                [_properties.facebook]: facebook ?? "",
                [_properties._idUser]: await getUserId()
            };

            await firebaseDatabase.writeDataRandomGuid(data, _REF);
        } catch (error) {
            throw error;
        }
    },

    hasUserShop: async function () {
        try {
            return !!(await firebaseDatabase.getBy(_REF, _properties._idUser, await getUserId()));
        } catch (error) {
            throw error;
        }
    }
}

async function getUserId() {
    const userUid = await firebaseAuth.getUid();
    if (!userUid) {
        throw { code: "USER_NOT_LOGGED" };
    }
    return userUid
}