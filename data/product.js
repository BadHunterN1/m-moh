import { convMoney } from "../data/money.js";
export function getProduct(productId) {
    const product = products.find((product) => product.id === productId);
    return product || null; // Return null if product is not found
}
export class Product {
    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.priceCents = productDetails.priceCents;
        this.description = productDetails.description;
        this.type = productDetails.type;
        this.keywords = productDetails.keywords;
    }
    getPrice() {
        return convMoney(this.priceCents);
    }
}
class steam extends Product {
    // sizeChartLink;
    constructor(productDetails) {
        super(productDetails);
        // this.sizeChartLink = productDetails.sizeChartLink;
    }
}
class appliances extends Product {
    // instructionsLink;
    // warrantyLink;
    constructor(productDetails) {
        super(productDetails);
        // this.instructionsLink = productDetails.instructionsLink;
        // this.warrantyLink = productDetails.warrantyLink;
    }
}
export const products = [
    {
        id: "1",
        image: "imgs/Steam-Wallet-Code-USA-5-USD-553x800.png.avif",
        name: "Steam Wallet Code USD 5$",
        description: "Steam Wallet Code USD 5$",
        priceCents: 500,
        keywords: ["Steam Wallet Code USA USD 20", "Steam", "Wallet"],
        type: "steam",
    },
    {
        id: "2",
        image: "imgs/Steam-Wallet-Code-USA-10-USD-553x800.png.avif",
        name: "Steam Wallet Code USD 10$",
        description: "Steam Wallet Code USD 10$",
        priceCents: 1000,
        keywords: ["Steam Wallet Code USA USD 10", "Steam", "Wallet"],
        type: "steam",
    },
    {
        id: "3",
        image: "imgs/Steam-Wallet-Code-USA-20-USD-553x800.png.avif",
        name: "Steam Wallet Code USD 20$",
        description: "Steam Wallet Code USD 20$",
        priceCents: 2000,
        keywords: ["Steam Wallet Code USA USD 20", "Steam", "Wallet"],
        type: "steam",
    },
    {
        id: "4",
        image: "imgs/Steam-Wallet-Code-USA-50-USD-553x800.png.avif",
        name: "Steam Wallet Code USD 50$",
        description: "Steam Wallet Code USD 50$",
        priceCents: 5000,
        keywords: ["Steam Wallet Code USA USD 50", "Steam", "Wallet"],
        type: "steam",
    },
    {
        id: "5",
        image: "imgs/Steam-Wallet-Code-USA-100-USD-553x800.png.avif",
        name: "Steam Wallet Code USD 100$",
        description: "Steam Wallet Code USD 100$",
        priceCents: 10000,
        keywords: ["Steam Wallet Code USA USD 100", "Steam", "Wallet"],
        type: "steam",
    },
    {
        id: "6",
        image: "imgs/playstation-network-card-10-uae.png.avif",
        name: "playstation network card $10 uae",
        description: "playstation network card $10 uae",
        priceCents: 10000,
        keywords: ["playstation network card 10 uae", "playstation", "psn"],
        type: "playstation",
    },
    {
        id: "7",
        image: "imgs/playstation-network-card-20-ksa.png.avif",
        name: "playstation network card $20 ksa",
        description: "playstation network card $20 ksa",
        priceCents: 2000,
        keywords: ["playstation network card 10 ksa", "playstation", "psn"],
        type: "playstation",
    },
    {
        id: "8",
        image: "imgs/playstation-network-card-40-uae.png.avif",
        name: "playstation network card $40 uae",
        description: "playstation network card $40 uae",
        priceCents: 4000,
        keywords: ["playstation network card 40 uae", "playstation", "psn"],
        type: "playstation",
    },
    {
        id: "9",
        image: "imgs/playstation-network-card-50-kw.png",
        name: "playstation network card $50 kw",
        description: "playstation network card $50 kw",
        priceCents: 5000,
        keywords: ["playstation network card 50 kw", "playstation", "psn"],
        type: "playstation",
    },
    {
        id: "10",
        image: "imgs/playstation-network-card-75-us.png.avif",
        name: "playstation network card $75 us",
        description: "playstation network card $75 us",
        priceCents: 7500,
        keywords: ["playstation network card 75 us", "playstation", "psn"],
        type: "playstation",
    },
    {
        id: "11",
        image: "imgs/playstation-network-card-100-kw.png.avif",
        name: "playstation network card $100 kw",
        description: "playstation network card $100 kw",
        priceCents: 10000,
        keywords: ["playstation network card 100 kw", "playstation", "psn"],
        type: "playstation",
    },
].map((productDetails) => {
    return new Product(productDetails);
});
//# sourceMappingURL=product.js.map