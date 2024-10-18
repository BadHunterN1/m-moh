import { getProduct } from "../data/product.js";
import { cart, resetStorage } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, initializeCurrency } from "../data/currency.js";
import { addOrder } from "../data/orders.js";
import { AuthManager } from "../data/authmanager.js";
initializeCurrency();
function calculateTotalPrice() {
    return cart.cartItems.reduce((total, cartItem) => {
        const product = getProduct(cartItem.productId);
        return product ? total + (product.priceCents * cartItem.quantity) : total;
    }, 0);
}
function renderPaymentSummaryCart() {
    const totalPriceCents = calculateTotalPrice();
    document.querySelector(".cart-totals").innerHTML = `
        <h2>CART TOTALS</h2>
        <div class="sub-totals-item">
            Subtotal
            <span class="price" data-original-price-usd-cents="${totalPriceCents}">${convMoney(totalPriceCents)} ${getCurrencySymbol()}</span>
        </div>
        <div class="totals-item">
            Total
            <span class="total-price price" data-original-price-usd-cents="${totalPriceCents}">
            ${convMoney(totalPriceCents)} ${getCurrencySymbol()}</span>
        </div>
    `;
    let cartQuantity1 = 0;
    cart.cartItems.forEach((cartItem) => {
        cartQuantity1 += cartItem.quantity;
    });
    document.querySelector('#contact_number').value = `You ordered ${cartQuantity1} items`;
    document.addEventListener('formSubmitSuccess', (event) => {
        const form = document.getElementById('contact-form');
        if (form.checkValidity()) {
            const authManager = AuthManager.getInstance();
            if (authManager.isLoggedIn()) {
                const cartItems = cart.cartItems;
                if (cartItems.length > 0) {
                    const totalCostCents = calculateTotalPrice();
                    addOrder(cartItems, totalCostCents);
                }
                resetStorage();
                window.location.href = 'orders.html';
            }
            else {
                window.location.href = 'register.html';
            }
        }
        else {
            form.reportValidity();
        }
    });
}
renderPaymentSummaryCart();
//# sourceMappingURL=checkout.js.map
