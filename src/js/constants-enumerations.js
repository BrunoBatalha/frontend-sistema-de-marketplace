const CONSTANTS = {
  LABELS: {
    ADDRESS: "Endereço",
    OWNER: "Proprietário",
    NAME: "Nome",
    EMAIL: "Email",
    TELEPHONE: "Telefone",
    TYPES_OF_PRODUCTS: "Tipos de produtos",
    MESSAGE_SUCCESS_LOGIN: "Login realizado com sucesso! Redirecionando...",
    SUCCESS: "Sucesso",
    SELECT_STATE: "Selecione o estado",
    MY_SHOP: "Minha loja",
  },
  STATES: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],
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
      EDIT_USER: "Editar minhas informações",
      MY_SHOP: "Minha Loja"
    },
    PAGES: {
      MY_PROFILE: "profile-user",
      PROFILE_SHOP: "profile-shop",
      SIGNUP: "signup",
      HOME: "index",
      LOGIN: "login",
      EDIT_USER: "edit-user",
      CREATE_SHOP: "create-shop",
      MY_SHOP: "my-shop",
    },
  },
};

const ENUMERATIONS = {
  SITE: {
    TITLES: {
      "profile-user": CONSTANTS.SITE.TITLES.MY_PROFILE,
      "profile-shop": CONSTANTS.SITE.TITLES.PROFILE_SHOP,
      "home": CONSTANTS.SITE.TITLES.HOME,
      "signup": CONSTANTS.SITE.TITLES.SIGNUP,
      "login": CONSTANTS.SITE.TITLES.LOGIN,
      "edit-user": CONSTANTS.SITE.TITLES.EDIT_USER,
    },
  },
  COLORS: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
};

const MESSAGES = {
  FIREBASE: {
    "auth/too-many-requests": "Muitas tentativas de acesso. Tente novamente mais tarde",
    "auth/email-already-in-use": "Email já está em uso",
    "auth/user-not-found": "Cadastro não encontrado",
    "auth/weak-password": "A senha deve conter ao menos 6 caracteres",
    "auth/wrong-password": "Email ou Senha inválido"
  },
  GLOBAL: {
    SUCCESSFULLY_LOGIN: "Login realizado com sucesso",
    SUCCESSFULLY_SIGN_UP: "Cadastro realizado com sucesso",
    SUCCESSFULLY_UPDATE: "Informações alteradas com sucesso",
    ERROR_ON_LOAD_INFORMATIONS: "Falha ao carregar informações",
    UNKNOWN_ERROR: "Erro desconhecido",
    PASSWORDS_NOT_MATCH: "Senhas não coincidem",
    USER_NOT_LOGGED: "Erro ao acessar o conteúdo: usuário não logado",
    USER_ALREADY_LOGGED: "Usuário já logado!",
    ERROR_ON_LOAD_DATA: "Erro inesperado ao carregar dados"
  }
};