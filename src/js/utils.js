const showToast = async function (message = "", type = "error", timeout = 3000) {
    const className = `md-toast-${type}`;

    $("#toast").addClass(className);
    $("#toast").toast("show");
    $('#toastBody').html(message);

    setTimeout(function () {
        $("#toast").toast("hide");
        $("#toast").removeClass(className);
    }, timeout);
}