$(document).ready(function () {
    fillItemsCarousel()

    function fillItemsCarousel() {
        const wrapperItemsShop = $("#carouselInnerShops");
        const wrapperItemsProduct = $("#carouselInnerProducts");
        listMock().then(listItems => {
            const allItemsHtml = listItems.reduce((accumulator, item, index) => {
                return accumulator + getHtmlCarouselItem(item.image, index == 5);
            }, "");
            wrapperItemsShop.html(allItemsHtml);
            wrapperItemsProduct.html(allItemsHtml);
            configureCarousels();
        });

        function getHtmlCarouselItem(srcImage, isActive) {
            return `
                <div class="carousel-item ${isActive ? "active" : ""}">
                    <div class="carousel-item__img-wrapper">
                        <img src="${srcImage}" class="carousel-item__img-wrapper__image d-block w-100">
                    </div>
                </div>`;
        }
    }

    function listMock() {
        return new Promise(function (resolve) {
            const list = [1, 2, 3, 4, 5, 7, 8, 9].map((item) => ({ image: `https://via.placeholder.com/300x300.png/09f/fff?text=loja${item}` }))
            resolve(list);
        })
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
    }
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