const _PRODUCT_FACADE_REF = "products";
const _SHOP_REF = "shop";
const _product_facade_properties = {
    _idUser: "_idUser",
    _idShop: "_idShop",
    name: "name",
    description: "description",
    price: "price",
    image1: "image1",
    image2: "image2"
};
const productFacade = {
    insert: async function (_idShop, name = '', description = '', price = 0) {
        try {
            const data = {
                [_product_facade_properties._idShop]: _idShop,
                [_product_facade_properties.name]: name,
                [_product_facade_properties.description]: description,
                [_product_facade_properties.price]: price
            };

            return await firebaseDatabase.writeDataRandomGuid(data, _PRODUCT_FACADE_REF);
        } catch (error) {
            throw error;
        }
    },

    list: async function () {
        try {
            return await firebaseDatabase.list(_PRODUCT_FACADE_REF);
        } catch (error) {
            throw error;
        }
    },

    getProductList: async function (shopId = null) {
        try {
            let id = shopId;
            if (!shopId) {
                const shop = await this.getByUserId();
                id = shop.id;
            }
            const entity = await firebaseDatabase.getListBy(_PRODUCT_FACADE_REF, _product_facade_properties._idShop, id);
            return entity;
        } catch (error) {
            throw error;
        }
    },

    getProduct: async function (productId) {
        try {
            return await firebaseDatabase.readData(`${_PRODUCT_FACADE_REF}/${productId}`);
        } catch (error) {
            throw error;
        }
    },


    getByUserId: async function () {
        try {
            return await firebaseDatabase.getBy(_SHOP_FACADE_REF, _shop_facade_properties._idUser, await getUserId());
        } catch (error) {
            throw error;
        }
    },

    update: async function (id, _idShop, name = '', description = '', price = 0, image1 = null, image2 = null) {
        try {
            const data = {
                [_product_facade_properties._idShop]: _idShop,
                [_product_facade_properties.name]: name,
                [_product_facade_properties.description]: description,
                [_product_facade_properties.price]: price,
                [_product_facade_properties.image1]: image1,
                [_product_facade_properties.image2]: image2,
            };

            await firebaseDatabase.updateData(data, `${_PRODUCT_FACADE_REF}/${id}`);
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
