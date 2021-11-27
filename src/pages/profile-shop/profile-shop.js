$(document).ready(function () {
    fillProfileShop();

    function fillProfileShop() {
        const wrapperDetails = $('#shop-details');
        const wrapperBanner = $('#shop-banner');
        const wrapperItemsOffered = $('#shop-items-offered');
        loadMock(getParamUrl(CONSTANTS.URL_PARAMS.SHOP_ID)).then(shop => {
            const htmlDetails =
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.ADDRESS, shop.address) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.OWNER, shop.owner) +
                UTIL.domRender.getHtmlDetail(CONSTANTS.LABELS.TYPES_OF_PRODUCTS, shop.typesOfProducts);
            wrapperDetails.html(htmlDetails);
            wrapperBanner.html(domRenderLocal.getHtmlBanner(shop.image))
            wrapperItemsOffered.html(domRenderLocal.getHtmlItemsOffered(shop.items));
        })
    }

    function loadMock() {
        return new Promise(function (resolve) {
            resolve({
                image: `https://via.placeholder.com/300x300.png/09f/fff?text=lojacarregada`,
                address: "Rua Rio Javaria, 361",
                owner: "Jayce Talis",
                typesOfProducts: "Cama, mesa e banho",
                name: "Pilltover Shop",
                items: [
                    {
                        name: "Caixa Hextec",
                        image: "https://via.placeholder.com/150.png/09f/fff?text=produto"
                    },
                    {
                        name: "Caixa Hextec1",
                        image: "https://via.placeholder.com/150.png/09f/fff?text=produto"
                    },
                    {
                        name: "Caixa Hextec2",
                        image: "https://via.placeholder.com/150.png/09f/fff?text=produto"
                    },
                    {
                        name: "Caixa Hextec3",
                        image: "https://via.placeholder.com/150.png/09f/fff?text=produto"
                    },
                    {
                        name: "Caixa Hextec4",
                        image: "https://via.placeholder.com/150.png/09f/fff?text=produto"
                    },
                ]
            });
        })
    }

    function getParamUrl(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const domRenderLocal = {
        getHtmlBanner: function (imageUrl) {
            return `
                <img  src="${imageUrl}" class="w-100 mb-2">
            `;
        },
        getHtmlItemsOffered: function (products) {
            return products.reduce((accumulator, product) => {
                return `${accumulator}
                    <a href="profile-product.html" class="col-lg-3 col-md-4 col-sm-6 bg-transparent">
                        <img class="card-img-top" src="${product.image}">
                        <div class="card-body bg-white">
                            <p class="card-title text-center">${product.name}</p>
                        </div>
                    </a>
                `;
            }, "")
        }
    }
});
