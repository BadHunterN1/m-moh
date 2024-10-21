var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { getProduct } from "../data/product.js";
import { cart, resetStorage } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, initializeCurrency, updatePriceElement } from "../data/currency.js";
import { addOrder } from "../data/orders.js";
import { AuthManager } from "../data/authmanager.js";
import { getProductPriceInfo } from "../data/product.js";
initializeCurrency();
function createPopup(innerHTML) {
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('more-info');
    popupDiv.innerHTML = innerHTML;
    document.body.appendChild(popupDiv);
    popupDiv.style.opacity = '0';
    popupDiv.style.transform = 'scale(0.8)';
    setTimeout(() => {
        popupDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        popupDiv.style.opacity = '1';
        popupDiv.style.transform = 'scale(1)';
    }, 10);
    return popupDiv;
}
function closePopup(popup) {
    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.8)';
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 300);
}
const moreInfoButton = document.querySelector('.more-info-button');
moreInfoButton === null || moreInfoButton === void 0 ? void 0 : moreInfoButton.addEventListener('click', () => {
    const innerHTML = `
        <div class="container">
            <button class="info-delete">X</button>
            <h2>We Will Take <span class="vodafone">Vodafone Cash</span> As An Example</h2>
            <ul>
                <li>
                    After Opening Your App Select <span class="wallet">More</span>
                    <img src="imgs/54a2542f-a434-4121-9f00-18479f948b4f.jpg" alt="" />
                </li>
                <li>
                    Select <span class="vodafone">Vodafone Cash</span>
                    <img src="imgs/81650d26-234b-4798-bdf4-9dc4caf19932.jpg" alt="" />
                </li>
                <li>
                    Select <span class="wallet">Money Transfer</span>
                    <img src="imgs/4c201f7a-2193-4a5f-81b9-28eb9e15ce77.jpg" alt="" />
                </li>
                <li>
                    Add Number We Provided According To Your <span class="wallet">Wallet</span> And Your Order <span class="wallet">Price</span>
                    <img src="imgs/c6c619f3-f0a5-4f6e-94d1-579badb9c6f8.jpg" alt="" />
                </li>
            </ul>
        </div>
    `;
    const moreInfoDiv = createPopup(innerHTML);
    moreInfoDiv.addEventListener('click', (e) => {
        if (e.target === moreInfoDiv || e.target.classList.contains('info-delete')) {
            closePopup(moreInfoDiv);
        }
    });
});
function handleImagePopup(img) {
    img.addEventListener('click', () => {
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('popup-overlay');
        const popupDiv = document.createElement('div');
        popupDiv.classList.add('popup');
        const clonedImg = img.cloneNode(true);
        popupDiv.appendChild(clonedImg);
        overlayDiv.appendChild(popupDiv);
        document.body.appendChild(overlayDiv);
        overlayDiv.addEventListener('click', (e) => {
            if (e.target === overlayDiv) {
                document.body.removeChild(overlayDiv);
            }
        });
    });
}
function initializeImagePopups() {
    const infoImgs = document.querySelectorAll('.more-info img');
    infoImgs.forEach(handleImagePopup);
}
(_a = document.querySelector('.more-info-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', initializeImagePopups);
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
const inputsToVerify = [
    { id: "trx_id", length: 12, pattern: /^\d{12}$/, message: "Input must be exactly 12 numbers." },
    { id: "phone", length: 11, pattern: /^01\d{9}$/, message: "Input must be exactly 11 numbers and start with 01." }
    // Add more inputs with length and pattern requirements here
];
function validateField(field, pattern, message) {
    const isValid = pattern.test(field.value);
    field.setCustomValidity(isValid ? "" : message);
    field.reportValidity();
    return isValid;
}
function validateForm(form) {
    let isValid = true;
    inputsToVerify.forEach(input => {
        const field = form.elements.namedItem(input.id);
        if (field) {
            isValid = validateField(field, input.pattern, input.message) && isValid;
        }
        else {
            console.warn(`Field with id "${input.id}" not found`);
            isValid = false;
        }
    });
    const emailField = form.elements.namedItem("from_email");
    if (emailField) {
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        isValid = validateField(emailField, emailPattern, "Email must end with @gmail.com") && isValid;
    }
    else {
        console.warn("Email field not found");
        isValid = false;
    }
    return isValid;
}
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        if (!validateForm(form)) {
            console.log("Form is invalid");
            return;
        }
        console.log("Form is valid, proceeding with submission");
        const authManager = AuthManager.getInstance();
        if (!authManager.isLoggedIn()) {
            window.location.href = 'register.html';
            return;
        }
        if (cart.cartItems.length === 0) {
            console.log("Cart is empty");
            // Handle empty cart scenario
            return;
        }
        const totalCostCents = calculateTotalPrice();
        try {
            yield sendEmailJS(form);
            console.log("Email sent successfully");
            addOrder(cart.cartItems, totalCostCents);
            resetStorage();
            window.location.href = 'orders.html';
        }
        catch (error) {
            console.error("Failed to send email:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    });
}
function sendEmailJS(form) {
    return __awaiter(this, void 0, void 0, function* () {
        const submitButton = document.querySelector(".checkout-btn");
        if (!submitButton) {
            throw new Error("Submit button not found");
        }
        submitButton.disabled = true;
        try {
            const formData = new FormData(form);
            formData.delete('image_upload');
            // @ts-ignore
            let templateParams = Object.fromEntries(formData);
            // @ts-ignore
            const result = yield emailjs.send("service_upc98dm", "template_qca63ue", templateParams);
            console.log("SUCCESS!", result.text);
        }
        catch (error) {
            console.error("FAILED...", error);
            throw error;
        }
        finally {
            submitButton.disabled = false;
        }
    });
}
function setupImageUpload(form) {
    const fileInput = form.querySelector('#image_upload');
    const rateInput = form.querySelector('#image');
    fileInput.addEventListener('change', (event) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const target = event.target;
        const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            try {
                const compressedDataUrl = yield compressImage(file, 480, 0.7);
                rateInput.value = compressedDataUrl;
            }
            catch (error) {
                console.error("Error compressing image:", error);
            }
        }
    }));
}
function compressImage(file, maxWidth, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                var _a;
                const img = new Image();
                img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Failed to get canvas context'));
                        return;
                    }
                    const scaleFactor = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleFactor;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedDataUrl);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    });
}
// Call this function to set up the image upload functionality
setupImageUpload(document.querySelector('form'));
function initializeCheckout() {
    renderPaymentSummaryCart();
    document.addEventListener('currencyChanged', renderPaymentSummaryCart);
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
        // Add real-time validation
        inputsToVerify.forEach(input => {
            const field = form.elements.namedItem(input.id);
            if (field) {
                field.addEventListener("input", () => validateField(field, input.pattern, input.message));
            }
        });
        const emailField = form.elements.namedItem("from_email");
        if (emailField) {
            const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            emailField.addEventListener("input", () => validateField(emailField, emailPattern, "Email must end with @gmail.com"));
        }
    }
    else {
        console.error("Contact form not found");
    }
}
initializeCheckout();
//# sourceMappingURL=checkout.js.map