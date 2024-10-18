import { convMoney, setCurrencyValue } from "../data/money.js";
const availableCurrencys = {
    usd: { symbol: "USD$", conversionRate: 1 },
    egp: { symbol: "EGP", conversionRate: 50 }
};
let currentCurrency = "usd";
let isReady = false;
export function getCurrencySymbol() {
    return availableCurrencys[currentCurrency].symbol;
}
export function updatePriceElement(element) {
    const originalPriceUSDCents = parseInt(element.dataset.originalPriceUsdCents || "0");
    element.textContent = `${convMoney(originalPriceUSDCents)} ${getCurrencySymbol()}`;
}
export function updateAllPrices() {
    document.querySelectorAll(".price").forEach(updatePriceElement);
}
export function initializePrices() {
    if (isReady)
        return;
    document.querySelectorAll(".price").forEach((element) => {
        var _a;
        const currentPrice = parseFloat(((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[^0-9.]/g, "")) || "0");
        const originalPriceUSDCents = Math.round(currentPrice * (currentCurrency === "egp" ? 2 : 100));
        element.dataset.originalPriceUsdCents = originalPriceUSDCents.toString();
    });
    isReady = true;
}
function changeCurrency(value) {
    const rate = availableCurrencys[value];
    currentCurrency = value;
    setCurrencyValue(rate.conversionRate);
    localStorage.setItem("currency", value);
    document.querySelectorAll(".currency").forEach((currencyDiv) => {
        const currentImg = currencyDiv.querySelector(".current-img");
        const currentCurrencyElement = currencyDiv.querySelector(".current-currency");
        if (currentImg)
            currentImg.src = `imgs/${value}.png`;
        if (currentCurrencyElement)
            currentCurrencyElement.textContent = value.toUpperCase();
    });
    updateAllPrices();
}
export function setupCurrencyDropdowns() {
    const currencyDivs = document.querySelectorAll(".currency");
    currencyDivs.forEach((currencyDiv) => {
        const selectBox = currencyDiv.querySelector(".select-selected");
        const dropdownItems = currencyDiv.querySelector(".select-items");
        if (!selectBox || !dropdownItems)
            return;
        selectBox.addEventListener("click", () => dropdownItems.classList.toggle("active"));
        dropdownItems.querySelectorAll("div").forEach((item) => {
            item.addEventListener("click", function () {
                const newCurrency = this.dataset.value;
                if (newCurrency) {
                    changeCurrency(newCurrency);
                    dropdownItems.classList.remove("active");
                }
            });
        });
    });
    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".currency")) {
            currencyDivs.forEach((currencyDiv) => {
                var _a;
                (_a = currencyDiv.querySelector(".select-items")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            });
        }
    });
    // Initialize with stored currency or default to USD
    const storedCurrency = localStorage.getItem("currency") || "usd";
    changeCurrency(storedCurrency);
    initializePrices();
}
export function initializeCurrency() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupCurrencyDropdowns);
    }
    else {
        setupCurrencyDropdowns();
    }
}
//# sourceMappingURL=currency.js.map