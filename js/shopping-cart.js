import { getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { renderOrderSummray } from "./global.js";
import { getCurrencySymbol, updateAllPrices, initializeCurrency } from "../data/currency.js";
initializeCurrency();
// generate cart table html
function createCartItemHTML(cartItem, product) {
    if (product) {
        return `
            <tr>
                <td><button class="delete" data-product-id="${product.id}">x</button></td>
                <td class="img-td">
                    <img src="${product.image}" width="80" />
                </td>
                <td class="h-td">${product.name}</td>
                <td class="price g" data-label="Price" data-original-price-usd-cents="${product.priceCents}">${convMoney(product.priceCents)} ${getCurrencySymbol()}</td>
                <td class="quantity" data-label="Quantity">
                    <div class="product-quantity-container">
                        <div class="quantity-container">
                            <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                            <input type="number" class="quantity-input"
                                id="quantity-${product.id}"
                                name="quantity-${product.id}"
                                data-product-id="${product.id}"
                                value="${cartItem.quantity}" min="1" max="100">
                            <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                        </div>
                    </div>
                </td>
                <td class="price" data-label="Subtotal"
                    data-original-price-usd-cents="${product.priceCents * cartItem.quantity}">
                    ${convMoney(product.priceCents * cartItem.quantity)} ${getCurrencySymbol()}
                </td>
            </tr>
        `;
    }
}
// insert cart table to tbody
function renderCartItems() {
    const tbody = document.querySelector("tbody");
    if (cart.cartItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-cart in-cart">
                        <h1>No products in the cart.</h1>
                        <p>Before proceed to checkout you must add some products to your shopping cart.<br>
                        You will find a lot of interesting products on our "Shop" page.</p>
                        <button class="in-cart-button"><a href="#">Return To Shop</a></button>
                    </div>
                </td>
            </tr>
        `;
    }
    else {
        tbody.innerHTML = cart.cartItems.map(cartItem => {
            const product = getProduct(cartItem.productId);
            return product ? createCartItemHTML(cartItem, product) : '';
        }).join('');
    }
}
// handle delete button and updateQuantity
function setupEventListeners() {
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            if (productId) {
                cart.removeCart(productId);
                renderAll();
            }
        });
    });
    document.querySelectorAll(".quantity-input").forEach(input => {
        var _a, _b;
        const updateQuantity = () => {
            const productId = input.dataset.productId;
            let quantity = Math.min(Math.max(Number(input.value), 1), 100);
            input.value = quantity.toString();
            const matchingItem = cart.cartItems.find(item => item.productId === productId);
            if (matchingItem) {
                matchingItem.quantity = quantity;
                cart.updateCartQuantity();
                cart.savetostorage();
            }
        };
        ['change', 'keydown'].forEach(event => input.addEventListener(event, (e) => {
            if (event === 'keydown' && e.key !== 'Enter')
                return;
            updateQuantity();
            renderAll();
        }));
        (_a = input.previousElementSibling) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            updateQuantity();
            renderAll();
        });
        (_b = input.nextElementSibling) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            updateQuantity();
            renderAll();
        });
    });
}
function calculateTotalPrice() {
    return cart.cartItems.reduce((total, cartItem) => {
        const product = getProduct(cartItem.productId);
        return product ? total + (product.priceCents * cartItem.quantity) : total;
    }, 0);
}
// generate paymentsummary for cart page
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
        <a class="checkout-btn" href ="${cart.cartItems.length === 0 ? '#' : 'checkout.html'}">PROCEED TO CHECKOUT</a>
    `;
}
function renderAll() {
    renderCartItems();
    renderPaymentSummaryCart();
    setupEventListeners();
    renderOrderSummray();
    renderPaymentSummaryCart();
    updateAllPrices();
}
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
});
//# sourceMappingURL=shopping-cart.js.map