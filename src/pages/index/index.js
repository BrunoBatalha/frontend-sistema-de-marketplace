$(document).ready(async function () {
    await fillItemsCarousel();

    async function fillItemsCarousel() {
        const products = await listProduct();
        if (products) {
            const allItemsHtml = products.reduce((accumulator, item, index) => {
                return accumulator + getHtmlCarouselItem(item.image1 ?? item.image2 ?? "./src/images/default-product.jpg", index == 0, item.id);
            }, "");
            setCarousel(allItemsHtml, $("#carouselInnerProducts"));
        }
        const shops = await listShops();
        if (shops) {
            const allItemsHtml = shops.reduce((accumulator, item, index) => {
                return accumulator + getHtmlCarouselItem(item.banner ?? "./src/images/default-shop.jpg", index == 0, item.id);
            }, "");
            setCarousel(allItemsHtml, $("#carouselInnerShops"));
        }
    }

    function setCarousel(allItemsHtml, wrapper) {
        wrapper.html(allItemsHtml);
        configureCarousels();
    }

    function getHtmlCarouselItem(srcImage, isActive, shopId) {
        return `
            <div class="carousel-item ${isActive ? "active" : ""}">
                <a href="profile-shop.html?${CONSTANTS.URL_PARAMS.SHOP_ID}=${shopId}" class="carousel-item__img-wrapper">
                    <img src="${srcImage}" class="carousel-item__img-wrapper__image d-block w-100">
                </a>
            </div>`;
    }

    async function listShops() {
        try {
            return await firebaseDatabase.list("shop");
        } catch (error) {
            UTIL.showToastTreatError(error);
        }
    }

    async function listProduct() {
        try {
            return await firebaseDatabase.list("products");
        } catch (error) {
            UTIL.showToastTreatError(error);
        }
    }
});

function configureCarousels() {
    configureCarouselThatShowMultipleItems('#carouselControlsShops');
    configureCarouselThatShowMultipleItems('#carouselControlsProducts');
}

function configureCarouselThatShowMultipleItems(idCarousel) {
    const carouselMultipleItems = $(idCarousel);
    const carouselDom = {
        nextControl: $(`${idCarousel} .carousel-control-next`),
        prevControl: $(`${idCarousel} .carousel-control-prev`),
        goNext: function () {
            if (this._scrollPosition < this._width - this._widthItems * 4) {
                this._scrollPosition += this._widthItems;
                this._animate();
            }
        },
        goPrevious: function () {
            if (this._scrollPosition > 0) {
                this._scrollPosition -= this._widthItems;
                this._animate();
            }
        },
        _inner: $(`${idCarousel} .carousel-inner`),
        _width: $(`${idCarousel} .carousel-inner`)[0].scrollWidth,
        _widthItems: $(".carousel-item").width(),
        _scrollPosition: 0,
        _animate: function () {
            this._inner.animate({ scrollLeft: this._scrollPosition }, 600);
        },
    };
    if (window.matchMedia("(min-width: 768px)").matches) {
        new bootstrap.Carousel(carouselMultipleItems, {
            interval: false,
        });
        carouselDom.nextControl.on("click", function () {
            carouselDom.goNext();
        });
        carouselDom.prevControl.on("click", function () {
            carouselDom.goPrevious();
        });
    } else {
        $(carouselMultipleItems).addClass("slider");
    }
}