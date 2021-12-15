'use strict';

$(document).ready(async function () {
    var currentSelectedImg = null;

    await checkIfAlreadyHasShop();

    const inputs = getInputs();
    configureForm();

    function configureForm() {
        $("#form-create-shop").on("submit", onSubmitCreate);
    }

    async function onSubmitCreate(event) {
        event.preventDefault();

        UTIL.toggleDisableForm();
        try {
            await shopFacade.insert(
                inputs.name.val(),
                inputs.cnpj.val(),
                inputs.comercialPhone.val(),
                inputs.productTypes.val(),
                inputs.state.val(),
                inputs.instagram.val(),
                inputs.facebook.val(),
            );
            await UTIL.showToast(MESSAGES.GLOBAL.SUCCESSFULLY_UPDATE, ENUMERATIONS.COLORS.SUCCESS);
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_PROFILE);
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_PROFILE);
        } finally {
            UTIL.toggleDisableForm();
        }
    }

    function getInputs() {
        return {
            name: $("#inputName"),
            cnpj: $("#inputCnpj"),
            comercialPhone: $("#inputComercialPhone"),
            productTypes: $("#inputProductTypes"),
            state: $("#selectState"),
            instagram: $("#inputInstagram"),
            facebook: $("#inputFacebook"),
        };
    }

    async function checkIfAlreadyHasShop() {
        try {
            const has = await shopFacade.hasUserShop();
            if (has) {
                UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_SHOP);
            }
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
        }
    }
});
