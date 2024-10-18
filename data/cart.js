var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cart_instances, _Cart_localStorageName, _Cart_loadFromStorage;
import { generateToast } from "../js/global.js";
export class Cart {
    constructor(localStorageName) {
        _Cart_instances.add(this);
        this.cartItems = [];
        _Cart_localStorageName.set(this, void 0);
        __classPrivateFieldSet(this, _Cart_localStorageName, localStorageName, "f");
        __classPrivateFieldGet(this, _Cart_instances, "m", _Cart_loadFromStorage).call(this);
    }
    savetostorage() {
        localStorage.setItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f"), JSON.stringify(this.cartItems));
    }
    clearstorage() {
        localStorage.removeItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f"));
    }
    addToCart(productId, quantity) {
        quantity = quantity;
        let matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
        if (matchingItem) {
            matchingItem.quantity += quantity;
        }
        else {
            this.cartItems.push({
                productId,
                quantity,
            });
        }
        this.savetostorage();
        generateToast();
    }
    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        document.querySelectorAll(".cart-counter").forEach((counter) => {
            counter.textContent = `${cartQuantity}`;
        });
    }
    removeCart(productId) {
        this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
        this.updateCartQuantity();
        this.savetostorage();
    }
}
_Cart_localStorageName = new WeakMap(), _Cart_instances = new WeakSet(), _Cart_loadFromStorage = function _Cart_loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f")) || "[]");
};
export const cart = new Cart("cart");
export function resetStorage() {
    cart.cartItems = [];
    cart.clearstorage();
    cart.updateCartQuantity();
}
;
//# sourceMappingURL=cart.js.map