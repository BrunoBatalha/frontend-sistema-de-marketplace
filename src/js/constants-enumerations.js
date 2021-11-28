const CONSTANTS = {
  LABELS: {
    ADDRESS: "Endereço",
    OWNER: "Proprietário",
    NAME: "Nome",
    EMAIL: "Email",
    TELEPHONE: "Telefone",
    TYPES_OF_PRODUCTS: "Tipos de produtos",
    MESSAGE_SUCCESS_LOGIN: "Login realizado com sucesso! Redirecionando...",
    SUCCESS: "Sucesso"
  },
  URL_PARAMS: {
    SHOP_ID: "shopId",
    CATEGORY_ID: "categoryId"
  },
  SITE: {
    NAME: "Planet Marketplace",
    TITLES: {
      MY_PROFILE: "Meu Perfil",
      PROFILE_SHOP: "Perfil da loja",
      SIGNUP: "Cadastre-se",
      HOME: "Início",
      LOGIN: "Entrar",
      EDIT_USER: "Editar minhas informações"
    },
    PAGES: {
      MY_PROFILE: "profile-user",
      PROFILE_SHOP: "profile-shop",
      SIGNUP: "signup",
      HOME: "index",
      LOGIN: "login",
      EDIT_USER: "edit-user",
    },
  },
};

const ENUMERATIONS = {
  SITE: {
    TITLES: {
      "profile-user": CONSTANTS.SITE.TITLES.MY_PROFILE,
      "profile-shop": CONSTANTS.SITE.TITLES.PROFILE_SHOP,
      home: CONSTANTS.SITE.TITLES.HOME,
      signup: CONSTANTS.SITE.TITLES.SIGNUP,
      login: CONSTANTS.SITE.TITLES.LOGIN,
      "edit-user": CONSTANTS.SITE.TITLES.EDIT_USER,
    },
  },
  COLORS: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
};
