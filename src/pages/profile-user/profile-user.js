$(document).ready(async function () {
  await fillProfileUser();
  configureButtons();

  async function fillProfileUser() {
    const wrapperDetails = $("#user-details");
    try {
      const user = await loadUserData();
      const htmlDetails =
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.NAME, user.name) +
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.TELEPHONE, user.telephone) +
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.EMAIL, user.email);
      wrapperDetails.html(htmlDetails);
    } catch (error) {
      UTIL.showToast(UTIL.errorHandler(error));
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME);
    }
  }

  function configureButtons() {
    $('#btn-edit-informations').on('click', function () {
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.EDIT_USER, 0);
    });
  }

  async function loadUserData() {
    try {
      return await firebaseDatabase.loadUserData();
    } catch (error) {
      throw error;
    }
  }
});
