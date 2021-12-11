const UTIL = {
  showToastTreatError: async (message) => {
    this.showToast(this.errorHandler(message))
  },

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

  redirectTo: function (page, timeout = 3000) {
    setTimeout(function () {
      window.location.assign(`${page}.html`);
    }, timeout);
  },

  toggleDisableForm: function (idForm) {
    const isDisabled = $("form :input").prop("disabled");
    if (idForm) {
      $(`#${idForm} :input`).prop("disabled", !isDisabled);
      return;
    }
    $("form :input").prop("disabled", !isDisabled);
  },

  errorHandler(error) {
    if (error && error.code) {
      return MESSAGES.FIREBASE[error.code]
        ?? MESSAGES.GLOBAL[error.code]
        ?? MESSAGES.GLOBAL.UNKNOWN_ERROR;
    }
    return error ?? MESSAGES.GLOBAL.UNKNOWN_ERROR;
  },

  domRender: {
    getHtmlDetail: function (titleDetail, text) {
      return `
            <span class="details__title-details">${titleDetail}:</span>
            <p class="details__text-details">${text}</p>
          `;
    },
    getHtmlOptionsSelect: function (options, initialOption) {
      const firstOption = `<option selected disabled>${initialOption}</option>`;
      return firstOption + options.reduce((accumulator, option) => `${accumulator}<option value="${option}">${option}</option>`, '');
    },
  },
};
