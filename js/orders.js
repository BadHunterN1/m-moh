import { orders, saveToStorage } from "../data/orders.js";
import { getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, initializeCurrency } from "../data/currency.js";
initializeCurrency();
function renderOrder() {
    let ordersHTML = '';
    orders.forEach((order) => {
        const id = order.id;
        const totalCostCents = order.totalCostCents;
        let cartPHTML = '';
        try {
            order.products.forEach((product) => {
                const productId = product.productId;
                const matchingproduct = getProduct(productId);
                const quantity = product.quantity;
                if (!matchingproduct) {
                    console.error("Product not found");
                    return;
                }
                cartPHTML += `
                    <div class="product-image-container">
                    <img src="${matchingproduct.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${matchingproduct.name}
                    </div>
                    <div class="product-delivery-date">
                        Price: ${parseInt(matchingproduct.getPrice()) * quantity} ${getCurrencySymbol()}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${quantity}
                    </div>

                    </div>

                    <div class="product-actions">
                    <button class="buy-again-button button-primary js-buy-again-button" data-product-id= '${matchingproduct.id}' data-quantity= ${quantity}>
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
                        <div>${order.orderTime}</div>
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
                <div class="order-header-right-section ">
                    <button class=" delete button-primary js-button-primary" data-product-id='${id}'>delete</button>
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
            let orders1 = JSON.parse(localStorage.getItem('orders2') || '[]');
            if (orders1 && orders1.length > 0) {
                orders1.shift();
                localStorage.setItem('orders2', JSON.stringify(orders1));
            }
        }
    });
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            if (!productId) {
                console.error('Product ID is missing');
                return;
            }
            const quantity = parseInt(`${button.dataset.quantity}`, 10);
            cart.addToCart(productId, quantity);
            button.innerHTML = 'Added';
            setTimeout(() => {
                button.innerHTML = `
                <span class="buy-again-message">Buy it again</span>
                `;
            }, 1000);
            cart.updateCartQuantity();
        });
    });
    document.querySelectorAll('.js-button-primary').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            if (!productId) {
                console.error('Product ID is missing');
                return;
            }
            deleteOrder(productId);
            saveToStorage();
        });
    });
    cart.updateCartQuantity();
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
}
renderOrder();
//# sourceMappingURL=orders.js.map