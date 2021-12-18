const categoryShopFacade = (function () {
    const _categoryShopRef = "";

    async function getByName(name) {
        try {
            const index = CONSTANTS.CATEGORIES.findIndex(c => c.toUpperCase() === name.toUpperCase())
            if (index != -1) {
                return categoryFactory.create({
                    id: index,
                    name
                });
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
    
    // async function insert(name) {
    //     try {
    //         const id = await firebaseDatabase.insertWithRandomGuid(_categoryShopRef, {
    //             name: name.toCapitalize()
    //         });
    //         return categoryFactory.create({
    //             name, id
    //         })
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async function list() {
        try {
            return CONSTANTS.CATEGORIES.map((c, index) => categoryFactory.create({
                id: index,
                name: c
            }))
        } catch (error) {
            throw error;
        }
    }

    return {
        getByName,
        // insert,
        list
    }

})()


