var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { convMoney, setCurrencyValue } from "../data/money.js";
const API_KEY = '9201780f68af4fe19b50557cccc60b1f';
const availableCurrencies = {
    usd: { symbol: "USD$", conversionRate: 1 },
    egp: { symbol: "EGP", conversionRate: 50 }
};
function updateEGPConversionRate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=EGP`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const egpRate = data.rates.EGP;
            if (egpRate) {
                availableCurrencies.egp.conversionRate = parseFloat(egpRate);
                console.log('Updated EGP conversion rate:', availableCurrencies.egp.conversionRate);
                if (currentCurrency === "egp") {
                    setCurrencyValue(availableCurrencies.egp.conversionRate);
                    updateAllPrices();
                }
            }
            else {
                console.error('Failed to fetch EGP rate from API');
            }
        }
        catch (error) {
            console.error('Error fetching currency data:', error);
        }
    });
}
let currentCurrency = "usd";
let isReady = false;
export function getCurrencySymbol() {
    return availableCurrencies[currentCurrency].symbol;
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
    return __awaiter(this, void 0, void 0, function* () {
        if (value === "egp" && availableCurrencies.egp.conversionRate === 1) {
            yield updateEGPConversionRate();
        }
        const rate = availableCurrencies[value];
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
    });
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
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".currency")) {
            currencyDivs.forEach((currencyDiv) => {
                var _a;
                (_a = currencyDiv.querySelector(".select-items")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            });
        }
    });
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
updateEGPConversionRate();
//# sourceMappingURL=currency.js.map
