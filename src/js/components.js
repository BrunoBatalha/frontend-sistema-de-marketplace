$(document).ready(function () {
    $('#nav-links-component').html(`
        <ul class="nav container mb-3">
            <li class="nav-item">
                <div class="dropdown">
                    <a class="nav-link active dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-bs-toggle="dropdown">
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
                <a class="nav-link" href="#">Produtos
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Serviços
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Sobre nós
                    <i class="bi bi-caret-down-fill"></i>
                </a>
            </li>
        </ul>
    `)

    $('#navbar-component').html(`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#"><i class="bi bi-bag-check navbar__icon"></i></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarTarget">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navBarTarget">
                    <form class="d-flex ms-auto me-3">
                        <input class="form-control" type="search" placeholder="Procurar...">
                        <button class="btn btn-outline-primary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                    <ul class="navbar-nav mb-2 mb-lg-0 align-items-lg-center">
                        <li class="nav-item me-3">
                            <a class="nav-link" href="#">
                                <i class="bi bi-gear-fill navbar__icon"></i>
                            </a>
                        </li>
                        <li class="nav-item me-3">
                            <a class="nav-link" href="index.html">Entrar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="profile-user.html">
                                <i class="bi bi-person-fill navbar__icon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `);    
})