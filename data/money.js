let currentCurrencyValue = 1;
export function setCurrencyValue(value) {
    currentCurrencyValue = value;
}
export function convMoney(priceUSDCents) {
    const priceUSD = priceUSDCents / 100;
    const convertedPrice = priceUSD * currentCurrencyValue;
    return convertedPrice.toFixed(2);
}
//# sourceMappingURL=money.js.map