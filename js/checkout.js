import { getProduct } from "../data/product.js";
import { cart, resetStorage } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, initializeCurrency, updatePriceElement } from "../data/currency.js";
import { addOrder } from "../data/orders.js";
import { AuthManager } from "../data/authmanager.js";
import { getProductPriceInfo } from "../data/product.js";
initializeCurrency();
function calculateTotalPrice() {
    let subtotalCents = 0;
    let discountedSubtotalCents = 0;
    let cartQuantity = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        if (product) {
            const priceInfo = getProductPriceInfo(product);
            subtotalCents += priceInfo.originalPriceCents * cartItem.quantity;
            discountedSubtotalCents += priceInfo.discountedPriceCents * cartItem.quantity;
            cartQuantity += cartItem.quantity;
        }
    });
    const finalTotalCents = cart.totalDiscount
        ? Math.round(discountedSubtotalCents * (1 - cart.totalDiscount / 100))
        : discountedSubtotalCents;
    const finalTotal = finalTotalCents;
    return finalTotal;
}
function updateCartTotals(totalPriceCents) {
    const cartTotalsElement = document.querySelector(".cart-totals");
    if (!cartTotalsElement)
        return;
    cartTotalsElement.innerHTML = `
        <h2>CART TOTALS</h2>
        <div class="sub-totals-item">
            Subtotal
            <span class="price" data-original-price-usd-cents="${totalPriceCents}"></span>
        </div>
        <div class="totals-item">
            Total
            <span class="total-price price" data-original-price-usd-cents="${totalPriceCents}"></span>
        </div>
    `;
}
let cartInHTML = '';
function updateOrderSummary(totalPriceCents, cartQuantity) {
    const testDiv = document.querySelector('.test');
    if (!testDiv)
        return;
    testDiv.innerHTML = `  
        <div class="form-input-material">
            <input
                style="color: gray"
                type="text"
                name="Full_Price"
                id="Full_Price"
                placeholder=" "
                class="form-control-material price"
                data-original-price-usd-cents="${totalPriceCents}"
                autocomplete="off"
                readonly
                value="Your total price: ${convMoney(totalPriceCents)} ${getCurrencySymbol()}" />
            <label for="Full_Price">Total Price</label>
        </div>
        <div style="opacity: 0;" class="form-input-material"> 
            <textarea
                style="color: gray; height: 40px; pointer-events: none;"
                name="order"
                id="order"
                placeholder=""
                autocomplete="off"
                class="form-control-material"
                readonly></textarea>
            <label for="order">Your Order</label>
        </div>`;
    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingproduct = getProduct(productId);
        if (matchingproduct) {
            cartInHTML += `<p> <strong>Product Name:</strong>${matchingproduct.name} <br> <strong>Product Quantity:</strong> ${cartItem.quantity}, <br> </p>`;
        }
    });
    document.querySelector("#order").value = cartInHTML;
    document.getElementById('contact_number').value = `You ordered ${cartQuantity} items`;
}
function renderPaymentSummaryCart() {
    const totalPriceCents = calculateTotalPrice();
    const cartQuantity = cart.cartItems.reduce((total, { quantity }) => total + quantity, 0);
    updateCartTotals(totalPriceCents);
    updateOrderSummary(totalPriceCents, cartQuantity);
    document.querySelectorAll('.price').forEach(updatePriceElement);
}
function handleFormSubmit(event) {
    const form = document.getElementById('contact-form');
    if (!form || !form.checkValidity()) {
        form === null || form === void 0 ? void 0 : form.reportValidity();
        return;
    }
    const authManager = AuthManager.getInstance();
    if (authManager.isLoggedIn()) {
        if (cart.cartItems.length > 0) {
            const totalCostCents = calculateTotalPrice();
            addOrder(cart.cartItems, totalCostCents);
        }
        resetStorage();
        window.location.href = 'orders.html';
    }
    else {
        window.location.href = 'register.html';
    }
}
renderPaymentSummaryCart();
document.addEventListener('currencyChanged', renderPaymentSummaryCart);
document.addEventListener('formSubmitSuccess', handleFormSubmit);
//# sourceMappingURL=checkout.js.map