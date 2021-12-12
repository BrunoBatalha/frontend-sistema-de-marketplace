$(document).ready(async function () {
    $('#nav-links-component').html(`
        <ul class="nav container mb-3">
            <li class="nav-item">
                <div class="dropdown">
                    <a class="nav-link active dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">
                        Lojas
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Imóveis</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Auto peças</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Eletrônicos e celulares</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Moda e beleza</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Animais de estimação</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Serviços</a></li>
                        <li><a class="dropdown-item" href="${CONSTANTS.SITE.PAGES.HOME}.html?${CONSTANTS.URL_PARAMS.CATEGORY_ID}=1">Artigos infatis</a></li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    Produtos
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    Serviços
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    Sobre nós
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
        </ul>
    `);

    $('#navbar-component').html(`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="${CONSTANTS.SITE.PAGES.HOME}.html"><i class="bi bi-bag-check navbar__icon"></i></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarTarget">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navBarTarget">
                    <form class="d-flex ms-auto me-3">
                        <input class="form-control" type="search" placeholder="Procurar..." />
                        <button class="btn btn-outline-primary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                    <ul class="navbar-nav mb-2 mb-lg-0 align-items-lg-center" id="ul-nav-item"></ul>
                </div>
            </div>
        </nav>
    `);

    $('#toast-component').html(`
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11;">
            <div id="toast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-body">
                    <span id="toastBody"></span>
                </div>
            </div>
        </div>
    `);

    if (await firebaseAuth.getUid()) {
        $('#ul-nav-item').append(`
            <li class= "nav-item">
                <a class="nav-link" href="profile-user.html" title="Meu perfil">
                    <i class="bi bi-person-fill navbar__icon"></i>
                </a>
            </li>
            <li class= "nav-item">
                <a class="nav-link" title="Sair" href="#" id="btn-logout">
                    <i class="bi bi-box-arrow-right"></i>
                </a>
            </li>
        `);
    } else {
        $('#ul-nav-item').append(`
            <li class= "nav-item">
                <a class="nav-link" href="${CONSTANTS.SITE.PAGES.LOGIN}.html">Entrar</a>
            </li >
        `);
    }

    $('#btn-logout').on('click', async function () {
        try {
            UTIL.showToast("Saindo...", ENUMERATIONS.COLORS.WARN);
            await firebaseAuth.signOut();
            UTIL.redirectTo(CONSTANTS.SITE.PAGES.LOGIN)
        } catch (error) {
            UTIL.showToastTreatError(error);
        }
    })
});
