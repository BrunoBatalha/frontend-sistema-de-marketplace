const _SHOP_FACADE_REF = "shop";
const _shop_facade_properties = {
    name: "name",
    cnpj: "cnpj",
    comercialPhone: "comercialPhone",
    productTypes: "productTypes",
    state: "state",
    instagram: "instagram",
    facebook: "facebook",
    _idUser: "_idUser",
    _idShop: "_idShop",
    banner: "banner"
};
const shopFacade = {
    insert: async function (name, cnpj, comercialPhone, productTypes, state, instagram, facebook) {
        try {
            const data = {
                [_shop_facade_properties.name]: name || "-",
                [_shop_facade_properties.cnpj]: cnpj || "-",
                [_shop_facade_properties.comercialPhone]: comercialPhone || "-",
                [_shop_facade_properties.productTypes]: productTypes || "-",
                [_shop_facade_properties.state]: state || "-",
                [_shop_facade_properties.instagram]: instagram || "-",
                [_shop_facade_properties.facebook]: facebook || "-",
                [_shop_facade_properties._idUser]: await getUserId()
            };

            await firebaseDatabase.writeDataRandomGuid(data, _SHOP_FACADE_REF);
        } catch (error) {
            throw error;
        }
    },

    hasUserShop: async function () {
        try {
            return !!(await firebaseDatabase.getBy(_SHOP_FACADE_REF, _shop_facade_properties._idUser, await getUserId()));
        } catch (error) {
            throw error;
        }
    },

    getShop: async function (shopId) {
        try {
            return await firebaseDatabase.readData(`${_SHOP_FACADE_REF}/${shopId}`);
        } catch (error) {
            throw error;
        }
    },

    getByUserId: async function () {
        try {
            const entity = await firebaseDatabase.getBy(_SHOP_FACADE_REF, _shop_facade_properties._idUser, await getUserId());
            return {
                ...entity,
                incomeCurrentMonth: await calculateIncomeCurrentMonth(),
                incomeLastMonth: await calculateIncomeLastMonth(),
                sales: await calculateSales(),
            };
        } catch (error) {
            throw error;
        }
    },

    list: async function () {
        try {
            return await firebaseDatabase.list(_SHOP_FACADE_REF);
        } catch (error) {
            throw error;
        }
    },

    listContain: async function (str) {
        try {
            return await firebaseDatabase.listContains(_SHOP_FACADE_REF, _shop_facade_properties.name, str);
        } catch (error) {
            throw error;
        }
    },

    update: async function (name, cnpj, comercialPhone, productTypes, state, instagram, facebook, bannerPath) {
        try {
            const { id } = await this.getByUserId();
            const data = {
                [_shop_facade_properties.name]: name || "-",
                [_shop_facade_properties.cnpj]: cnpj || "-",
                [_shop_facade_properties.comercialPhone]: comercialPhone || "-",
                [_shop_facade_properties.productTypes]: productTypes || "-",
                [_shop_facade_properties.state]: state || "-",
                [_shop_facade_properties.instagram]: instagram || "-",
                [_shop_facade_properties.facebook]: facebook || "-",
                [_shop_facade_properties.banner]: bannerPath
            };

            await firebaseDatabase.updateData(data, `${_SHOP_FACADE_REF}/${id}`);
        } catch (error) {
            throw error;
        }
    }

};

async function getUserId() {
    const userUid = await firebaseAuth.getUid();
    if (!userUid) {
        throw { code: "USER_NOT_LOGGED" };
    }
    return userUid;
}

async function calculateIncomeCurrentMonth() {
    return 0;
}
async function calculateIncomeLastMonth() {
    return 0;
}

async function calculateSales() {
    return 0;
}