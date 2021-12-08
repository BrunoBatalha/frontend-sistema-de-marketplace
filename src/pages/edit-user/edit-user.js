$(document).ready(async function () {
    const inputs = getInputs();
    configureForm();

    await fillFormUser();

    async function fillFormUser() {
        try {
            const user = await loadUserData();
            inputs.name.val(user.name);
            inputs.email.val(user.email);
            inputs.telephone.val(user.telephone);
        } catch (error) {
            UTIL.showToast(UTIL.errorHandler(error));
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME);
        }
    }

    function configureForm() {
        $("#form-signup").on("submit", async function (event) {
            event.preventDefault();
            UTIL.toggleDisableForm();
            try {
                await editUserDatabase();
                await UTIL.showToast(MESSAGES.GLOBAL.SUCCESSFULLY_UPDATE, ENUMERATIONS.COLORS.SUCCESS);
                UTIL.redirectTo(CONSTANTS.SITE.PAGES.MY_PROFILE);
            } catch (error) {
                UTIL.showToast(UTIL.errorHandler(error));
            } finally {
                UTIL.toggleDisableForm();
            }
        });
    }

    async function loadUserData() {
        try {
            return await firebaseDatabase.loadUserData();
        } catch (error) {
            throw error;
        }
    }

    async function editUserDatabase() {
        try {
            const data = getFormData();
            const userUid = await firebaseAuth.getUid();
            if (userUid == null) {
                throw { code: "USER_NOT_LOGGED" };
            }

            const ref = `users/${userUid}`;
            await firebaseDatabase.updateData(data, ref);
            await setLocalStorage();
        } catch (error) {
            throw error;
        }
    }

    function getFormData() {
        return {
            name: inputs.name.val(),
            email: inputs.email.val(),
            telephone: inputs.telephone.val()
        };
    }

    function getInputs() {
        return {
            name: $("#inputName"),
            email: $("#inputEmail"),
            telephone: $("#inputTelephone"),
        };
    }

    async function setLocalStorage() {
        try {
            const userUid = await firebaseAuth.getUid();
            if (userUid == null) {
                throw { code: "USER_NOT_LOGGED" };
            }

            const ref = `users/${userUid}`;
            const data = await firebaseDatabase.readData(ref);
            if (!data) {
                throw { code: "ERROR_ON_LOAD_DATA" };
            }

            localStorage.setItem("userUid", userUid);
            localStorage.setItem("userData", JSON.stringify(data));
        } catch (error) {
            throw error;
        }
    }
});
