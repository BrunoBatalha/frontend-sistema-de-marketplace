const util = {
  showToast: async function (message = "", type = "error", timeout = 3000) {
    const className = `md-toast-${type}`;

    $("#toast").addClass(className);
    $("#toast").toast("show");
    $("#toastBody").html(message);

    setTimeout(function () {
      $("#toast").toast("hide");
      $("#toast").removeClass(className);
    }, timeout);
  },
  domRender: {
    getHtmlDetail: function (titleDetail, text) {
      return `
                <span class="details__title-details">${titleDetail}:</span>
                <p class="details__text-details">${text}</p>
            `;
    },
  },
};
