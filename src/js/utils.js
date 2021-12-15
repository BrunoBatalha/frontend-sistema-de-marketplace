const UTIL = {
  showToastTreatError: async function (message) {
    this.showToast(this.errorHandler(message));
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
    getCardProductDetail: function (name, description, price, image) {
      return `
      <div class="col-md-6 my-1">
          <div class="card-deck">
              <div class="card">
                  <div class="card-body row">
                      <div class="col-md-4 min-img-product-container">
                          <img id="img-banner" width="100%" height="100%" class="img-banner" src="${image}" />
                      </div>
                      <div class="col-md-8">
                          <h5 class="card-title">Nome: ${name}</h5>
                          <p class="card-text">Descrição: ${description}</p>
                          <p class="card-text"><small class="text-muted">Valor: R$ ${price}</small>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
    },
    getHtmlOptionsSelect: function (options, initialOption) {
      const firstOption = `<option selected disabled>${initialOption}</option>`;
      return firstOption + options.reduce((accumulator, option) => `${accumulator}<option value="${option}">${option}</option>`, '');
    },
  },
};
