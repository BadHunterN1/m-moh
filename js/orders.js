import { orders, saveToStorage } from "../data/orders.js";
import { getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, initializeCurrency } from "../data/currency.js";
initializeCurrency();
// generate existing orders
function renderOrder() {
    const ordersGrid = document.querySelector('.js-orders-grid');
    const pageTitle = document.querySelector('.page-title');
    if (orders.length === 0) {
        pageTitle.textContent = "You haven't ordered yet";
        ordersGrid.innerHTML = '';
        return;
    }
    let ordersHTML = '';
    orders.forEach((order) => {
        const { id, totalCostCents, orderTime, products } = order;
        let cartPHTML = '';
        try {
            products.forEach((product) => {
                const { productId, quantity } = product;
                const matchingProduct = getProduct(productId);
                if (!matchingProduct) {
                    console.error("Product not found");
                    return;
                }
                cartPHTML += `
                    <div class="product-image-container">
                        <img src="${matchingProduct.image}">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-delivery-date">
                            Price: ${parseInt(matchingProduct.getPrice()) * quantity} ${getCurrencySymbol()}
                        </div>
                        <div class="product-quantity">Quantity: ${quantity}</div>
                    </div>
                    <div class="product-actions">
                        <button class="buy-again-button button-primary js-buy-again-button" data-product-id='${matchingProduct.id}' data-quantity=${quantity}>
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
                `;
            });
            ordersHTML += `
                <div class="order-container">
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${orderTime}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>${convMoney(totalCostCents)} ${getCurrencySymbol()}</div>
                            </div>
                        </div>
                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${id}</div>
                        </div>
                        <div class="order-header-right-section">
                            <button class="delete button-primary js-button-primary" data-product-id='${id}'>delete</button>
                        </div>
                    </div>
                    <div class="order-details-grid js-order-details-grid">
                        ${cartPHTML}
                    </div>
                </div>
            `;
        }
        catch (error) {
            console.error(`Invalid products in order: ${error}`);
            const orders1 = JSON.parse(localStorage.getItem('orders2') || '[]');
            if (orders1 && orders1.length > 0) {
                orders1.shift();
                localStorage.setItem('orders2', JSON.stringify(orders1));
            }
        }
    });
    ordersGrid.innerHTML = ordersHTML;
    addEventListeners();
    cart.updateCartQuantity();
}
// add eventlistener for delete order and buy again
function addEventListeners() {
    const buyAgainButtons = document.querySelectorAll('.js-buy-again-button');
    const deleteButtons = document.querySelectorAll('.js-button-primary');
    buyAgainButtons.forEach((button) => {
        button.addEventListener('click', handleBuyAgain);
    });
    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteOrder);
    });
}
// handle buy again button
function handleBuyAgain(event) {
    const button = event.currentTarget;
    const { productId, quantity } = button.dataset;
    if (!productId) {
        console.error('Product ID is missing');
        return;
    }
    cart.addToCart(productId, parseInt(quantity || '1', 10));
    button.innerHTML = 'Added';
    setTimeout(() => {
        button.innerHTML = '<span class="buy-again-message">Buy it again</span>';
    }, 1000);
    cart.updateCartQuantity();
}
// active delete order from order history
function handleDeleteOrder(event) {
    const button = event.currentTarget;
    const { productId } = button.dataset;
    if (!productId) {
        console.error('Product ID is missing');
        return;
    }
    deleteOrder(productId);
    saveToStorage();
}
// delete order from order history
function deleteOrder(orderId) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        renderOrder();
    }
    else {
        console.log(`Order with ID ${orderId} not found.`);
    }
}
renderOrder();
//# sourceMappingURL=orders.js.map