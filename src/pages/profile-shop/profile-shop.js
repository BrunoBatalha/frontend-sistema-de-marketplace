$(document).ready(function () {
    fillProfileShop();
    
    function fillProfileShop() {
        const wrapperDetails = $('#shop-details');
        const wrapperBanner = $('#shop-banner');
        loadMock(getParamUrl(CONSTANTS.URL_PARAMS.SHOP_ID)).then(shop => {
            const htmlDetails =
                dom.getHtmlDetail(CONSTANTS.LABELS.ADDRESS, shop.address) +
                dom.getHtmlDetail(CONSTANTS.LABELS.OWNER, shop.owner) +
                dom.getHtmlDetail(CONSTANTS.LABELS.TYPES_OF_PRODUCTS, shop.typesOfProducts);
            wrapperDetails.html(htmlDetails);
            wrapperBanner.html(dom.getHtmlBanner(shop.image))
        })
    }

    function loadMock() {
        return new Promise(function (resolve) {
            resolve({
                image: `https://via.placeholder.com/300x300.png/09f/fff?text=lojacarregada`,
                address: "Rua Rio Javaria, 361",
                owner: "Jayce Talis",
                typesOfProducts: "Cama, mesa e banho",
                name: "Pilltover Shop"
            });
        })
    }

    function getParamUrl(param){
        const params = new URLSearchParams(window.location.search);
        return params.get(param);    
    }

    const dom = {
        getHtmlDetail(titleDetail, text) {
            return `
                <span class="profile-shop__text-details--bold">${titleDetail}:</span>
                <p class="profile-shop__text-details">${text}</p>
            `;
        },
        getHtmlBanner(imageUrl) {
            return `
                <img  src="${imageUrl}" class="w-100 mb-2">
            `;
        },
    }
});
