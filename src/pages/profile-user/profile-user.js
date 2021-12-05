$(document).ready(async function () {
  await fillProfileUser();
  configureButtons();

  async function fillProfileUser() {
    const wrapperDetails = $("#user-details");
    try {
      const user = await loadMock();
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

  function loadMock() {
    const userData = localStorage.getItem("userData");
    const userUid = localStorage.getItem("userUid");
    if (userData && userUid) {
      return JSON.parse(userData);
    }
    throw new Error("Falha ao carregar perfil");
  }
});
