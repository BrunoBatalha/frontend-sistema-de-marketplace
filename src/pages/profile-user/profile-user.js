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
      console.error(error);
      await UTIL.showToast("Falha ao carregar informações.")
    }
  }

  function configureButtons(){
    $('#btn-edit-informations').on('click',function(){
      UTIL.redirectTo(CONSTANTS.SITE.PAGES.EDIT_USER, 0 )
    })
  }

  function loadMock() {
    return new Promise(function (resolve) {
      resolve({
        name: "1Jayce Talis",
        email: "jayceTalisOSenhorDoProgresso@Pilltover.com",
        telephone: "(92) 92492-2189",
      });
    });
  }
});
