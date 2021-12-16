$(document).ready(async function () {
    await fillProfileUser();

    async function fillProfileUser() {
        const wrapperDetails = $("#product-details");
        try {
            const product = await loadProductProfile(getParamUrl(CONSTANTS.URL_PARAMS.PRODUCT_ID));
            setProductImage(product);
            const htmlDetails =
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.NAME, product.name) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.PRICE, "R$ " + product.price) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.DESCRIPTION, product.description);
            wrapperDetails.html(htmlDetails);
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN);
        }
    }

    async function loadProductProfile(productId) {
        return await productFacade.getProduct(productId);
    }


    function getParamUrl(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    async function setProductImage(product) {
        const imgProduct = document.getElementById('img-product');
        imgProduct.src = product.image1 ?? product.image2 ?? "./src/images/default-product.jpg";
    };
});
