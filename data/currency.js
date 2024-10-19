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
const availableCurrencies = {
    usd: { symbol: "USD$", conversionRate: 1 },
    egp: { symbol: "EGP", conversionRate: 49.76 }
};
let currentCurrency = "usd";
// const API_KEY = '9201780f68af4fe19b50557cccc60b1f';
// async function updateEGPConversionRate(): Promise<void> {
//     try {
//         const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=EGP`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         const egpRate = parseFloat(data.rates.EGP);
//         if (egpRate) {
//             availableCurrencies.egp.conversionRate = egpRate;
//             console.log('Updated EGP conversion rate:', egpRate);
//             if (currentCurrency === "egp") {
//                 setCurrencyValue(egpRate);
//                 updateAllPrices();
//             }
//         } else {
//             console.error('Failed to fetch EGP rate from API');
//         }
//     } catch (error) {
//         console.error('Error fetching currency data:', error);
//     }
// }
export function getCurrencySymbol() {
    return availableCurrencies[currentCurrency].symbol;
}
export function getCurrentCurrency() {
    return currentCurrency;
}
export function updatePriceElement(element) {
    const originalPriceUSDCents = parseInt(element.dataset.originalPriceUsdCents || "0");
    const convertedPrice = convMoney(originalPriceUSDCents);
    const priceText = `${convertedPrice} ${getCurrencySymbol()}`;
    if (element instanceof HTMLInputElement) {
        element.value = element.id === "Full_Price" ? `Your total price: ${priceText}` : priceText;
    }
    else {
        element.textContent = priceText;
    }
}
export function updateAllPrices() {
    document.querySelectorAll(".price").forEach(updatePriceElement);
}
function changeCurrency(value) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (value === "egp" && availableCurrencies.egp.conversionRate === 1) {
        //     await updateEGPConversionRate();
        // }
        currentCurrency = value;
        setCurrencyValue(availableCurrencies[value].conversionRate);
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
        document.dispatchEvent(new Event('currencyChanged'));
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
}
export function initializeCurrency() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupCurrencyDropdowns);
    }
    else {
        setupCurrencyDropdowns();
    }
}
// updateEGPConversionRate();
//# sourceMappingURL=currency.js.map