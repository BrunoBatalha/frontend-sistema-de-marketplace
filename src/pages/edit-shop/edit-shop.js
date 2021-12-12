$(document).ready(async function () {
    const inputs = getInputs();
    configureForm();

    await fillForm();

    async function fillForm() {
        try {
            const shop = await shopFacade.getByUserId();
            inputs.name.val(shop.name);
            inputs.cnpj.val(shop.cnpj);
            inputs.comercialPhone.val(shop.comercialPhone);
            inputs.instagram.val(shop.instagram);
            inputs.facebook.val(shop.facebook);
            inputs.state.val(shop.state);
            inputs.productTypes.val(shop.productTypes);
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME);
        }
    }

    function configureForm() {
        $("#form-edit-shop").on("submit", async function (event) {
            event.preventDefault();
            UTIL.toggleDisableForm();
            try {
                await shopFacade.update(
                    inputs.name.val(),
                    inputs.cnpj.val(),
                    inputs.comercialPhone.val(),
                    inputs.productTypes.val(),
                    inputs.state.val(),
                    inputs.instagram.val(),
                    inputs.facebook.val()
                );
                await UTIL.showToast(MESSAGES.GLOBAL.SUCCESSFULLY_UPDATE, ENUMERATIONS.COLORS.SUCCESS);
                UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_SHOP);
            } catch (error) {
                UTIL.showToast(UTIL.errorHandler(error));
            } finally {
                UTIL.toggleDisableForm();
            }
        });
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
});
