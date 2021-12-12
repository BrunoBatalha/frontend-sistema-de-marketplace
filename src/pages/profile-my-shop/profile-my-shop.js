$(document).ready(async function () {
    await fillFields();
    configureButtons();

    async function fillFields() {
        const wrapperDetails = $("#shop-details");
        try {
            const shop = await loadData();
            const htmlDetails =
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.ACCESS, shop.access) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.COMERCIAL_PHONE, shop.comercialPhone) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.INSTAGRAM, shop.instagram) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.FACEBOOK, shop.facebook) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.SALES, shop.sales) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.INCOME_LAST_MONTH, shop.incomeLastMonth) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.INCOME_CURRENT_MONTH, shop.incomeCurrentMonth);
            wrapperDetails.html(htmlDetails);
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN);
        }
    }

    async function configureButtons() {
        $('#btn-edit-informations').on('click', function () {
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.EDIT_USER, 0);
        });

        const has = await hasShopUser()
        if (has) {
            
        }
    }

    async function hasShopUser() {
        try {
            return await shopFacade.hasUserShop();
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
        }
    }

    async function loadData() {
        try {
            return await shopFacade.getByUserId();
        } catch (error) {
            throw error;
        }
    }

    $("#input-profile-pic").on("change", loadImage);

    function loadImage(event) {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src);
        };
        $("#button-label-image").css("display", "none");
    }
});
