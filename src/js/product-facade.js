const productFacade = (function () {
    const _productRef = "products";
    const _productPropertiesInDatabase = {
        _idUser: "_idUser",
        _idShop: "_idShop",
        name: "name",
        description: "description",
        price: "price",
        image1: "image1",
        image2: "image2",
        _idCategory: "_idCategory"
    };

    async function _getUserId() {
        const userUid = await firebaseAuth.getUid();
        if (!userUid) {
            throw { code: "USER_NOT_LOGGED" };
        }
        return userUid;
    }

    const insert = async function (_idShop, name = '', description = '', price = 0, categoryName) {
        try {
            let category = await categoryProductFacade.getByName(categoryName);
            if (!category) {
                category = await categoryProductFacade.insert(categoryName);
            }
            const data = {
                [_productPropertiesInDatabase._idShop]: _idShop,
                [_productPropertiesInDatabase.name]: name,
                [_productPropertiesInDatabase.description]: description,
                [_productPropertiesInDatabase.price]: price,
                [_productPropertiesInDatabase._idCategory]: category.id
            };

            const id = await firebaseDatabase.insertWithRandomGuid(_productRef, data);
            return {
                id, ...data
            }
        } catch (error) {
            throw error;
        }
    }

    const list = async function () {
        try {
            return await firebaseDatabase.list(_productRef);
        } catch (error) {
            throw error;
        }
    }

    const listContain = async function (str) {
        try {
            return await firebaseDatabase.listContains(_productRef, _productPropertiesInDatabase.name, str);
        } catch (error) {
            throw error;
        }
    }

    const listByCategory = async function (_idCategory) {
        try {
            return await firebaseDatabase.listByInMemory(_productRef, _productPropertiesInDatabase._idCategory, _idCategory);
        } catch (error) {
            throw error;
        }
    }

    const getProductList = async function (shopId = null) {
        try {
            let id = shopId;
            if (!shopId) {
                const shop = await this.getByUserId();
                id = shop.id;
            }
            const entity = await firebaseDatabase.getListBy(_productRef, _productPropertiesInDatabase._idShop, id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    const getProduct = async function (productId) {
        try {
            return await firebaseDatabase.readData(`${_productRef}/${productId}`);
        } catch (error) {
            throw error;
        }
    }


    const getByUserId = async function () {
        try {
            return await firebaseDatabase.getBy(_SHOP_FACADE_REF, _shop_facade_properties._idUser, await _getUserId());
        } catch (error) {
            throw error;
        }
    }

    const update = async function (id, _idShop, name = '', description = '', price = 0, image1 = null, image2 = null, _idCategory) {
        try {
            const data = {
                [_productPropertiesInDatabase._idShop]: _idShop,
                [_productPropertiesInDatabase.name]: name,
                [_productPropertiesInDatabase.description]: description,
                [_productPropertiesInDatabase.price]: price,
                [_productPropertiesInDatabase.image1]: image1,
                [_productPropertiesInDatabase.image2]: image2,
                [_productPropertiesInDatabase._idCategory]: _idCategory
            };

            await firebaseDatabase.updateData(data, `${_productRef}/${id}`);
        } catch (error) {
            throw error;
        }
    }

    return {
        insert,
        update,
        list,
        listByCategory,
        listContain,
        getProductList,
        getProduct,
        getByUserId
    }
})()