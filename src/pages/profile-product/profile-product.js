$(document).ready(async function () {
    var product = {};
    var user = {};

    await loadEntities();
    await fillProfileProduct();

    async function loadEntities() {
        try {
            user = await firebaseDatabase.loadUserData();
            product = await loadProductProfile(getParamUrl(CONSTANTS.URL_PARAMS.PRODUCT_ID));
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN);
        }
    }

    async function fillProfileProduct() {
        const wrapperDetails = $("#product-details");
        try {
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

    $("#quantity").on("change", setModalValues);

    function setModalValues() {
        const quantity = $("#quantity").val();
        if (quantity && quantity > 0) {
            const finalValue = (parseInt(quantity) * (product.price ? parseFloat(product.price) : 0)) ?? 0;
            $("#final-value").val(`R$ ${finalValue}`);
            const message = `Olá, estou interessado no seu produto '${product.name}'.Gostaria de fazer o pedido de ${quantity} unidades`;
            $("#message").val(message);
        }
    }

    function getParamUrl(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    async function setProductImage(product) {
        const imgProduct = document.getElementById('img-product');
        imgProduct.src = product.image1 ?? product.image2 ?? "./src/images/default-product.jpg";
    };

    async function sendWhatsapp(phone, text) {
        const baseURI = `whatsapp://send/?1=pt_BR&phone=${phone}&text=${text}`;
        window.location.assign(baseURI);
    }
});
