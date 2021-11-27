const CONSTANTS = {
  LABELS: {
    ADDRESS: "Endereço",
    OWNER: "Proprietário",
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
    },
    PAGES: {
      MY_PROFILE: "profile-user",
      PROFILE_SHOP: "profile-shop",
      SIGNUP: "signup",
      HOME: "home",
      LOGIN: "index",
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
    },
  },
  COLORS: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
};
