$(document).ready(function () {
    fillProfileShop();

    async function fillProfileShop() {
        const wrapperDetails = $('#shop-details');
        const wrapperItemsOffered = $('#shop-items-offered');
        const wrapperBanner = document.getElementById('shop-banner');
        const shopName = $('#shop-name');
        const shop = await loadShopProfile(getParamUrl(CONSTANTS.URL_PARAMS.SHOP_ID));
        const htmlDetails =
            UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.STATE, shop.state) +
            UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.COMERCIAL_PHONE, shop.comercialPhone) +
            UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.TYPES_OF_PRODUCTS, shop.productTypes);
        wrapperDetails.html(htmlDetails);
        wrapperBanner.src = shop.banner != null && shop.banner != "" ? shop.banner : "./src/images/default-shop.jpg";
        shopName.html(shop.name);
        const productHtmlDetails = await domRenderLocal.getHtmlItemsOffered(shop.id);
        wrapperItemsOffered.html(productHtmlDetails);
    }

    async function loadShopProfile(shopId) {
        return await shopFacade.getShop(shopId);
    }

    function getParamUrl(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const domRenderLocal = {
        getHtmlBanner: function (imageUrl) {
            return `
                <img src="${imageUrl}" class="w-100 mb-2">
            `;
        },
        getHtmlItemsOffered: async function (shopId) {
            let htmlDetails = "";
            const products = await productFacade.getProductList(shopId);
            for (const product of products) {
                htmlDetails += UTIL.domRender.getCardProductDetail(product.name, product.description, product.price, product.image1 ?? product.image2 ?? "./src/images/default-product.jpg");
            }

            return htmlDetails;
        }
    };
});
