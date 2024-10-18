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
        keywords: ["playstation network card 20 ksa", "playstation", "psn"],
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
    {
        id: "12",
        image: "imgs/20-EUR-Valorant-Points-430x575.png",
        name: "20 EUR Valorant Points",
        description: "20 EUR Valorant Points",
        priceCents: 2144,
        keywords: ["20 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
    },
    {
        id: "13",
        image: "imgs/25-EUR-Valorant-Points-430x575.png",
        name: "25 EUR Valorant Points",
        description: "25 EUR Valorant Points",
        priceCents: 2680,
        keywords: ["25 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
    },
    {
        id: "14",
        image: "imgs/50-EUR-Valorant-Points-430x575.png",
        name: "50 EUR Valorant Points",
        description: "50 EUR Valorant Points",
        priceCents: 5350,
        keywords: ["50 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
    },
    {
        id: "15",
        image: "imgs/100-EUR-Valorant-Points-430x575.png",
        name: "100 EUR Valorant Points",
        description: "100 EUR Valorant Points",
        priceCents: 10700,
        keywords: ["100 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
    },
    {
        id: "16",
        image: "imgs/pubg-60-430x602.png.avif",
        name: "PUBG MOBILE 60 UC (GLOBAL)",
        description: "PUBG MOBILE 60 UC (GLOBAL)",
        priceCents: 90,
        keywords: ["PUBG MOBILE 60 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "PUBG MOBILE",
    },
    {
        id: "17",
        image: "imgs/pubg-325-430x605.png.avif",
        name: "PUBG MOBILE 325 UC (GLOBAL)",
        description: "PUBG MOBILE 325 UC (GLOBAL)",
        priceCents: 450,
        keywords: ["PUBG MOBILE 325 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "PUBG MOBILE",
    },
    {
        id: "18",
        image: "imgs/pubg-660-430x602.png.avif",
        name: "PUBG MOBILE 660 UC (GLOBAL)",
        description: "PUBG MOBILE 660 UC (GLOBAL)",
        priceCents: 900,
        keywords: ["PUBG MOBILE 660 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "PUBG MOBILE",
    },
    {
        id: "19",
        image: "imgs/pubg-1800-430x603.png.avif",
        name: "PUBG MOBILE 1800 UC (GLOBAL)",
        description: "PUBG MOBILE 1800 UC (GLOBAL)",
        priceCents: 2250,
        keywords: ["PUBG MOBILE 1800 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "PUBG MOBILE",
    },
].map((productDetails) => {
    return new Product(productDetails);
});
//# sourceMappingURL=product.js.map
