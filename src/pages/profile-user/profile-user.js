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
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.HOME);
      await UTIL.showToast(error);
    }
  }

  function configureButtons() {
    $('#btn-edit-informations').on('click', function () {
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.EDIT_USER, 0);
    });
  }

  function loadUserData() {
    return firebaseDatabase.loadUserData()
  }
});
