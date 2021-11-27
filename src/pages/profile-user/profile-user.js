$(document).ready(async function () {
  await fillProfileUser();

  async function fillProfileUser() {
    const wrapperDetails = $("#user-details");
    try {
      const user = await loadMock();
      const htmlDetails =
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.OWNER, user.owner) +
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.TELEPHONE, user.telephone) +
        UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.EMAIL, user.email);
      wrapperDetails.html(htmlDetails);
    } catch (error) {
      console.error(error);
      await UTIL.showToast("Falha ao carregar informações.")
    }
  }

  function loadMock() {
    return new Promise(function (resolve) {
      resolve({
        owner: "1Jayce Talis",
        email: "jayceTalisOSenhorDoProgresso@Pilltover.com",
        telephone: "(92) 92492-2189",
      });
    });
  }
});
