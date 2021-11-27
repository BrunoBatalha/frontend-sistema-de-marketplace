const UTIL = {
  showToast: async function (
    message = "",
    type = ENUMERATIONS.COLORS.ERROR,
    timeout = 3000
  ) {
    const className = `md-toast-${type}`;

    $("#toast").addClass(className);
    $("#toast").toast("show");
    $("#toastBody").html(message);

    setTimeout(function () {
      $("#toast").toast("hide");
      $("#toast").removeClass(className);
    }, timeout);
  },

  redirectTo: function (page) {
    setTimeout(function () {
      window.location.assign(`${page}.html`);
    }, 3000)
  },

  toggleDisableForm: function (idForm) {
    const isDisabled = $("form :input").prop("disabled");
    if (idForm) {
      $(`#${idForm} :input`).prop("disabled", !isDisabled);
      return;
    }
    $("form :input").prop("disabled", !isDisabled);
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
