// Update the orders array to use the new Order type
export const orders = JSON.parse(localStorage.getItem('orders2') || '[]');
// Helper function to generate a UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// Update the addOrder function to create an Order object
export function addOrder(cartItems, totalCostCents) {
    const newOrder = {
        id: generateUUID(),
        orderTime: new Date().toISOString(),
        products: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        })),
        totalCostCents: totalCostCents
    };
    orders.unshift(newOrder);
    saveToStorage();
}
export function saveToStorage() {
    localStorage.setItem('orders2', JSON.stringify(orders));
}
//# sourceMappingURL=orders.js.map