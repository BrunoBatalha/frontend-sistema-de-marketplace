function goTo(url, timeout = 1000) {
    setTimeout(function () {
        window.location.replace(url);
    }, timeout);
}