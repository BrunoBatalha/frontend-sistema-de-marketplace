$(document).ready(async function () {
    const inputs = getInputs();
    configureForm();

    await fillFormUser();

    async function fillFormUser() {
        try {
            const user = await loadUserData();
            inputs.name.val(user.name)
            inputs.email.val(user.email)
            inputs.telephone.val(user.telephone)
        } catch (error) {
            console.error(error);
            await UTIL.showToast("Falha ao carregar informações.")
        }
    }
    function configureForm() {
        $("#form-signup").on("submit", async function (event) {
            event.preventDefault();
            try {
                await editUserDatabase();
                await UTIL.showToast("Informações alteradas com sucesso! Redirecionando...", ENUMERATIONS.COLORS.SUCCESS)
                UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_PROFILE)
            } catch (err) {
                UTIL.showToast(err.message ?? err)
                UTIL.toggleDisableForm();
            }
        });
    }
    async function editUserDatabase() {
        return new Promise(resolve => { resolve() })
    }
    function getInputs() {
        return {
            name: $("#inputName"),
            email: $("#inputEmail"),
            telephone: $("#inputTelephone"),
        };
    }

    function loadUserData() {
        return firebaseDatabase.loadUserData()
    }
});
