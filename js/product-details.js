import { getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { renderOrderSummray, renderPaymentSummary } from "./global.js";
import { getCurrencySymbol, updateAllPrices, initializeCurrency } from "../data/currency.js";
initializeCurrency();
// generate productDetails pages for products
function renderproductDetails() {
    // generate product url according to product id
    const url = new URL(window.location.href);
    const productId = url.searchParams.get('productId');
    ;
    const matchingproduct = getProduct(productId);
    let trackHTML = ``;
    if (!matchingproduct) {
        console.error("Product not found");
        return;
    }
    ;
    document.title = matchingproduct.name;
    trackHTML = `
            <img src="${matchingproduct.image}" alt="" />
            <div class="view-info">
                <h1>${matchingproduct.name}</h1>
                <h3 class="price" data-original-price-usd-cents="${matchingproduct.getPrice()}">${matchingproduct.getPrice()} ${getCurrencySymbol()}</h3>
                <h5><strong>Notes:</strong></h5>
                <ul>
                    <li>
                        Sale items are not eligible for returns, exchanges, or refunds.
                    </li>
                </ul>
                <div class="input">
                    <div class="product-quantity-container">
                        <div class="quantity-container">
                            <button
                                class="quantity-btn"
                                onclick="this.nextElementSibling.stepDown()">
                                -
                            </button>
                            <input
                                type="number"
                                class="quantity-input quantity-input-d"
                                value="1"
                                min="1"
                                max="100" />
                            <button
                                class="quantity-btn"
                                onclick="this.previousElementSibling.stepUp()">
                                +
                            </button>
                        </div>
                    </div>
                    <button class="add-to-cart add-to-cart-d" data-product-id="${matchingproduct.id}">
                        ADD TO CART
                    </button>
                </div>
                <p><strong>Categories:</strong> ${matchingproduct.type}</p>
                <p>
                    <strong>Share:</strong>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-telegram"></i>
                </p>
            </div>
        `;
    const VP = document.querySelector('.view-product1');
    VP.innerHTML = trackHTML;
    setupQuickViewAddToCart1(VP);
    updateAllPrices();
    // insert info for product description
    document.querySelector('.product-description .name').textContent = `${matchingproduct.name}`;
    document.querySelector('.product-description .type').textContent = `How to redeem A ${matchingproduct.type} Code?`;
    document.querySelector('.inner-li').innerHTML = `
                    <li>Login to your ${matchingproduct.type} account.</li>
					<li class="li-catch">Go to Redeem a ${matchingproduct.type} Code page.</li>
					<li>
						Enter the ${matchingproduct.type} Gift Card Code that you bought from us and click
						Continue.
					</li>
					<li>
						The funds will be added to your account and be ready for use to buy
						or gift games on ${matchingproduct.type}!
					</li>`;
}
// make add to cart work for productpage
function setupQuickViewAddToCart1(quickViewDiv) {
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
renderproductDetails();
//# sourceMappingURL=product-details.js.map