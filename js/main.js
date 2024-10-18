import { products, getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { renderOrderSummray, renderPaymentSummary } from "./global.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, updateAllPrices, initializeCurrency } from "../data/currency.js";
initializeCurrency();
// generate cards to be put inside swiper
function createProductHTML(product) {
    return `
        <div class="card swiper-slide">
            <div class="img-con">
                <div class="buttons">
                    <button class="view-button" data-product-id="${product.id}" data-pop="Quick view">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button data-pop="Add to Cart" class="add-to-cart" data-product-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                <a href="product-details.html?productId=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
            </div>
            <a href="product-details.html?productId=${product.id}"><h4>${product.name}</h4></a>
            <p>${product.description}</p>
            <div class="price" data-original-price-usd-cents="${product.priceCents}">
                ${convMoney(product.priceCents)} ${getCurrencySymbol()}
            </div>
        </div>`;
}
// generate swipers according to products types
function createTypeHTML(type, products) {
    const htmlProducts = products.map(createProductHTML).join('');
    return `
        <div class="container">
            <div class="section-header"><h3>${type.toUpperCase()}</h3></div>
            <div class="product">
                <div class="product-name"><span>${type.toUpperCase()}</span></div>
                <div class="swiper swiper-3 js-swiper-${type}">
                    <div class="swiper-wrapper">${htmlProducts}</div>
                </div>
            </div>
        </div>`;
}
// add product types to swipers
function updateProducts() {
    const productTypes = ['steam', 'playstation'];
    const htmlContent = productTypes
        .map(type => {
        const specificProducts = products.filter(product => product.type === type);
        return specificProducts.length ? createTypeHTML(type, specificProducts) : '';
    })
        .join('');
    const productsContainer = document.querySelector(".products");
    if (productsContainer) {
        productsContainer.innerHTML = htmlContent;
    }
    initializeSwipers();
    updateAllPrices();
    setupQuickView();
    setupAddToCart();
}
// handle QuickView button on card
function setupQuickView() {
    document.querySelectorAll('.view-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            if (!productId) {
                console.error("Product ID is undefined");
                return;
            }
            const matchingProduct = getProduct(productId);
            if (!matchingProduct) {
                console.error("Product not found");
                return;
            }
            const quickHtml = `
				<button class="close">x</button>
				<div class="view-product">
					<img src="${matchingProduct.image}" alt="" />
					<div class="view-info">
						<a href="product-details.html?productId=${matchingProduct.id}">${matchingProduct.name}</a>
						<div class="price" data-original-price-usd-cents="${matchingProduct.priceCents}">${matchingProduct.getPrice()} ${getCurrencySymbol()}</div>
						<h5><strong>Notes:</strong></h5>
						<ul>
							<li>Sale items are not eligible for returns, exchanges, or refunds.</li>
						</ul>
						<div class="input">
							<div class="product-quantity-container">
								<div class="quantity-container">
									<button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
									<input type="number" class="quantity-input quantity-input-d" value="1" min="1" max="100" />
									<button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
								</div>
							</div>
							<button class="add-to-cart add-to-cart-d" data-product-id='${matchingProduct.id}'>ADD TO CART</button>
						</div>
						<p><strong>Categories:</strong> ${matchingProduct.type}</p>
						<p>
							<strong>Share:</strong> 
							<i class="fa-brands fa-facebook-f"></i>
							<i class="fa-brands fa-x-twitter"></i>
							<i class="fa-brands fa-linkedin-in"></i>
							<i class="fa-brands fa-whatsapp"></i>
							<i class="fa-brands fa-telegram"></i>
						</p>
					</div>
				</div>
			`;
            const div = document.createElement('div');
            div.classList.add('quick-view');
            div.innerHTML = quickHtml;
            document.body.appendChild(div);
            // active overlay when QuickView is active 
            const over = document.querySelector('.overlay');
            over.classList.add('active');
            const closeQuickView = () => {
                div.style.opacity = "0";
                over.style.opacity = "0";
                setTimeout(() => {
                    over.classList.remove('active');
                    div.remove();
                }, 200);
            };
            const closeButton = div.querySelector('.close');
            closeButton.addEventListener('click', closeQuickView);
            over.addEventListener('click', closeQuickView);
            setupQuickViewAddToCart(div);
        });
    });
    updateAllPrices();
}
// handle add to cart for QuickView
function setupQuickViewAddToCart(quickViewDiv) {
    const addToCartButton = quickViewDiv.querySelector('.add-to-cart-d');
    if (!addToCartButton)
        return;
    addToCartButton.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const productId = target.dataset.productId;
        if (!productId) {
            console.error('Product ID is missing');
            return;
        }
        const quantityInput = quickViewDiv.querySelector('.quantity-input-d');
        if (!quantityInput) {
            console.error('Quantity input not found');
            return;
        }
        let quantity = Math.max(1, Math.min(100, Number(quantityInput.value)));
        quantityInput.value = quantity.toString();
        cart.addToCart(productId, quantity);
        cart.updateCartQuantity();
        renderOrderSummray();
        renderPaymentSummary();
        target.textContent = 'Added';
        setTimeout(() => {
            target.textContent = 'Add to Cart';
        }, 2000);
    });
}
// handle add to cart for cards
function setupAddToCart() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute('data-product-id');
            if (!productId)
                return;
            cart.addToCart(productId, 1);
            cart.updateCartQuantity();
            renderOrderSummray();
            renderPaymentSummary();
            const icon = button.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-check';
                setTimeout(() => {
                    icon.className = 'fa-solid fa-cart-shopping';
                }, 2000);
            }
        });
    });
}
// active and setting swipers
const swiper = new Swiper(".swiper-1", {
    effect: "fade",
    slidesPerView: 1,
    loop: true,
    autoplay: {
        pauseOnMouseEnter: true,
        delay: 5000,
    },
    speed: 500,
    navigation: {
        nextEl: "#next1",
        prevEl: "#prev1",
    },
});
const swiper1 = new Swiper(".swiper-2", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    breakpoints: {
        1025: {
            spaceBetween: 40,
            slidesPerView: 8,
        },
    },
    speed: 500,
    navigation: {
        nextEl: "#next2",
        prevEl: "#prev2",
    },
});
// handle more than one swiper 3
let swiperInstances = [];
function initializeSwipers() {
    swiperInstances.forEach(instance => instance.destroy(true, true));
    swiperInstances = [];
    document.querySelectorAll('.swiper-3').forEach(swiperEl => {
        swiperInstances.push(new Swiper(swiperEl, {
            slidesPerView: 2,
            loop: true,
            spaceBetween: 40,
            breakpoints: { 640: { slidesPerView: 4 } },
            autoplay: { pauseOnMouseEnter: true, delay: 2000 },
            speed: 500,
            navigation: { nextEl: "#next3", prevEl: "#prev3" },
        }));
    });
}
updateProducts();
const swiper3 = new Swiper(".swiper-4", {
    slidesPerView: 1,
    loop: true,
    breakpoints: {
        500: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    },
    autoplay: {
        pauseOnMouseEnter: true,
        delay: 3000,
    },
    speed: 1000,
    navigation: {
        nextEl: "#next3",
        prevEl: "#prev3",
    },
});
//# sourceMappingURL=main.js.map