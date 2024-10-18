import { convMoney, setCurrencyValue } from "../data/money.js";

type CurrencyType = "usd" | "egp";

interface CurrencyConfig {
    symbol: string;
    conversionRate: number;
}

const API_KEY = '9201780f68af4fe19b50557cccc60b1f';

const availableCurrencies: Record<CurrencyType, CurrencyConfig> = {
    usd: { symbol: "USD$", conversionRate: 1 },
    egp: { symbol: "EGP", conversionRate: 50 }
};

async function updateEGPConversionRate() {
    try {
        const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=EGP`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const egpRate = data.rates.EGP;

        if (egpRate) {
            availableCurrencies.egp.conversionRate = parseFloat(egpRate);
            console.log('Updated EGP conversion rate:', availableCurrencies.egp.conversionRate);
            if (currentCurrency === "egp") {
                setCurrencyValue(availableCurrencies.egp.conversionRate);
                updateAllPrices();
            }
        } else {
            console.error('Failed to fetch EGP rate from API');
        }
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

let currentCurrency: CurrencyType = "usd";
let isReady = false;

export function getCurrencySymbol(): string {
    return availableCurrencies[currentCurrency].symbol;
}

export function updatePriceElement(element: HTMLElement): void {
    const originalPriceUSDCents = parseInt(element.dataset.originalPriceUsdCents || "0");
    element.textContent = `${convMoney(originalPriceUSDCents)} ${getCurrencySymbol()}`;
}

export function updateAllPrices(): void {
    document.querySelectorAll<HTMLElement>(".price").forEach(updatePriceElement);
}

export function initializePrices(): void {
    if (isReady) return;
    document.querySelectorAll<HTMLElement>(".price").forEach((element) => {
        const currentPrice = parseFloat(element.textContent?.replace(/[^0-9.]/g, "") || "0");
        const originalPriceUSDCents = Math.round(currentPrice * (currentCurrency === "egp" ? 2 : 100));
        element.dataset.originalPriceUsdCents = originalPriceUSDCents.toString();
    });
    isReady = true;
}

async function changeCurrency(value: CurrencyType): Promise<void> {
    if (value === "egp" && availableCurrencies.egp.conversionRate === 1) {
        await updateEGPConversionRate();
    }

    const rate = availableCurrencies[value];
    currentCurrency = value;
    setCurrencyValue(rate.conversionRate);
    localStorage.setItem("currency", value);

    document.querySelectorAll<HTMLElement>(".currency").forEach((currencyDiv) => {
        const currentImg = currencyDiv.querySelector<HTMLImageElement>(".current-img");
        const currentCurrencyElement = currencyDiv.querySelector<HTMLElement>(".current-currency");
        if (currentImg) currentImg.src = `imgs/${value}.png`;
        if (currentCurrencyElement) currentCurrencyElement.textContent = value.toUpperCase();
    });

    updateAllPrices();
}

export function setupCurrencyDropdowns(): void {
    const currencyDivs = document.querySelectorAll<HTMLElement>(".currency");

    currencyDivs.forEach((currencyDiv) => {
        const selectBox = currencyDiv.querySelector<HTMLElement>(".select-selected");
        const dropdownItems = currencyDiv.querySelector<HTMLElement>(".select-items");
        if (!selectBox || !dropdownItems) return;

        selectBox.addEventListener("click", () => dropdownItems.classList.toggle("active"));

        dropdownItems.querySelectorAll<HTMLElement>("div").forEach((item) => {
            item.addEventListener("click", function () {
                const newCurrency = this.dataset.value as CurrencyType;
                if (newCurrency) {
                    changeCurrency(newCurrency);
                    dropdownItems.classList.remove("active");
                }
            });
        });
    });

    document.addEventListener("click", (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest(".currency")) {
            currencyDivs.forEach((currencyDiv) => {
                currencyDiv.querySelector<HTMLElement>(".select-items")?.classList.remove("active");
            });
        }
    });

    const storedCurrency = localStorage.getItem("currency") as CurrencyType || "usd";
    changeCurrency(storedCurrency);
    initializePrices();
}

export function initializeCurrency(): void {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupCurrencyDropdowns);
    } else {
        setupCurrencyDropdowns();
    }
}

updateEGPConversionRate();
