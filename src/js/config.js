$(document).ready(function () {
  const pages = Object.keys(ENUMERATIONS.SITE.TITLES); // ["profile-user", "profile-shop", "index", "home", "signup"];

  setTitlePage(window.location.pathname);

  function setTitlePage(url) {
    document.title = CONSTANTS.SITE.NAME;

    for (const page of pages) {
      const isInPage = url.split(page).length != 1;
      if (isInPage) {
        document.title += ` - ${ENUMERATIONS.SITE.TITLES[page]}`;
      }
    }
  }
});
