import { getProduct } from "../data/product.js";
import { cart } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, updateAllPrices } from "../data/currency.js";
import { searchBarCon } from "../data/search.js";
import { AuthManager, initializeAuth } from '../data/authmanager.js';
// global file for all pages
// categories array for categories hsec2
const categories = [
    { summary: "PC", content: ["Steam Wallet Code", "Valorant"], url: `shop.html?search=` },
    { summary: "PSN", content: ["PlayStation", "PlayStation Plus"], url: `shop.html?search=` },
    { summary: "XBOX", content: ["Xbox Game Pass", "Xbox Games"], url: `shop.html?search=` },
    { summary: "MOBILE", content: ["PUBG Mobile", "Roblox"], url: `shop.html?search=` },
    { summary: "PROGRAMS", content: ["Wallpaper Engine", "Office 365"], url: `shop.html?search=` },
];
let htmlHeader = ``;
let htmlSticky = ``;
let htmlFooter = ``;
let htmlEnd = ``;
// generate headers
function generateHeader() {
    return htmlHeader = `
	<a href="#header" class="up"><i class="fa-solid fa-angles-up"></i></a>
	<div class="overlay"></div>
	<header class="header" id="header">
			<div class="container">
				<div class="currency">
					<div class="select-selected">
						<img
							class="current-img"
							src="imgs/usd.png"
							alt=""
							width="20px"
							height="20px" />
						<span class="current-currency"> USD</span>
						<i class="fa-solid fa-caret-down"></i>
					</div>
					<div class="select-items">
						<div data-value="egp"><img src="imgs/egp.png" alt="" /> EGP</div>
						<div data-value="usd"><img src="imgs/usd.png" alt="" /> USD</div>
					</div>
				</div>
				<div class="social">
					<a href="#"><i class="fa-brands fa-facebook"></i></a>
					<i class="fa-brands fa-whatsapp"></i>
				</div>
			</div>
		</header>
		<header class="header2">
		<aside>
			<div class="aside-head">
				<h3>Shopping cart</h3>
				<button class="close-button">
					<i class="fa-solid fa-xmark"></i> Close
				</button>
			</div>
			<div class="fill-cart">
				<div class="cart-items"></div>
				<div class="shopping-cart-footer">
					<div class="cart-price"></div>
					<a href="shopping-cart.html">View Cart</a>
				</div>
			</div>
		</aside>
			<nav>
				<button class="close-button">
					<i class="fa-solid fa-xmark"></i> Close
				</button>
				<div class="search-bar">
					<input
						placeholder="search for products"
						type="search"
						id="header-search2" 
						class = "search-bar1"/>
					<i class="fa-solid fa-magnifying-glass search-button"></i>
				</div>
				<div class = "categorys">
				<ul>
				<li><a class="sign-in" href="#">Login/Register</a></li>
				</ul>
				</div>
				<div class="currency">
					<div class="select-selected">
						<img
							class="current-img"
							src="imgs/USD.png"
							alt=""
							width="20px"
							height="20px" />
						<span class="current-currency"> USD</span>
						<i class="fa-solid fa-caret-down"></i>
					</div>
					<div class="select-items">
						<div data-value="egp"><img src="imgs/egp.png" alt="" /> EGP</div>
						<div data-value="usd"><img src="imgs/usd.png" alt="" /> USD</div>
					</div>
				</div>
			</nav>
			<div class="container">
				<div class="hsec1">
					<button class="nav-button"><i class="fa-solid fa-bars"></i> </button>
					<a href="index.html"><img src="imgs/logo-final_Logo-green-horizontal.png" alt="" /></a>
					<div class="search-bar">
						<input
							placeholder="search for products"
							type="search"
							id="header-search"
							class = "search-bar1" />
						<i class="fa-solid fa-magnifying-glass search-button"></i>
					</div>
					<div class = "register-wrap" style = "position: relative;">
						<a class="sign-in" href="#"> <i class="fa-regular fa-user"></i> Login/Register</a>
						<div id="dropdownMenu1" class="dropdown-menu1">
							<div class = "register" id="signOut">Sign Out</div>	
							<a href= "orders.html"class = "register">Your Orders</a>	
						</div>
					</div>
					<div class="cart">
						<i class="fa-solid fa-magnifying-glass"></i>
						<div class = "cart-container">
							<div class = "cart-counter">0</div>
							<svg xmlns="http://www.w3.org/2000/svg">
								<path
									d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A3,3,0,0,0,21,6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1Z" />
							</svg>
						</div>
					</div>
				</div>
				<div class="hsec2">
				</div>
			</div>
		</header>`;
}
// generate sticky header 
function generateStickyHeader() {
    return htmlSticky = `
			<div class="container">
				<div class="hsec1">
					<button class="nav-button"><i class="fa-solid fa-bars"></i> </button>
					<a href="index.html"><img src="imgs/logo-final_word-green.png" alt="" /></a>
					<div class="hsec2">
					</div>
					<div class="cart">
					<a class="sign-in" href="#"><i class="fa-regular fa-user"></i> Login/Register</a>
						<i class="fa-solid fa-magnifying-glass"></i>
						<div class="cart-container">
							<div class="cart-counter">0</div>
							<svg xmlns="http://www.w3.org/2000/svg">
								<path
									d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A3,3,0,0,0,21,6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1Z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		`;
}
// generate footer 
function generateFooter() {
    return htmlFooter = `
		<div class="container">
			<div class="f-sec1">
				<img src="imgs/logo-final_Logo-green-horizontal.png" alt="" />
				<h5>
					IaM A Live is one of the first online Stores that sell <br />digital
					codes & gift cards for gamers.
				</h5>
				<h5>
					Reg. No.: 13451600 <br />128 City Road, London, United Kingdom, EC1V
					2NX
				</h5>
				<div class="social">
					<a href="#"><i class="fa-brands fa-whatsapp"></i></a>
					<a href="#"><i class="fa-brands fa-facebook"></i></a>
				</div>
			</div>
			<div class="f-sec2">
				<h4>IAM A LIVE</h4>
				<a href="#"> Privacy Policy</a>
				<a href="#">Refund Policy</a>
				<a href="#">Terms & Conditions </a>
				<a href="orders.html">My Orders</a>
			</div>
			<div class="f-sec2">
				<h4>CONTACT US</h4>
				<a href="mailto:ahmam2004@gmail.com"
					><i class="fa-solid fa-envelope"></i> ahmam2004@gmail.com</a
				>
				<a href="tel:01020697551"><i class="fa-solid fa-phone"></i> +201020697551</a>
				<a href="#"> Support Ticket </a>
				<a href="#">FAQ</a>
			</div>
			<div class="f-sec2">
				<div class="wrapper">
					<h4>Join our newsletter!</h4>
					<form action="">
						<input
							type="email"
							id="newsletter-email"
							placeholder="Your Email address" />
						<button type="submit">Sign Up</button>
					</form>
				</div>
				<div class="wrapper">
					<h4>Payment Systems</h4>
					<img src="imgs/Payment-Methods-400x27.png.avif" alt="" />
				</div>
			</div>
		</div>
		`;
}
// generate development copyright
function generateEnd() {
    return htmlEnd = `
	<a href="#"><strong>IAM LIVE</strong></a> 2022 Created By
	<strong>BadHunterN1</strong>.
`;
}
// append all headers and footer and end 
function appendHeader() {
    const header = document.createElement("header");
    header.id = `header-container`;
    header.innerHTML = generateHeader();
    document.body.prepend(header);
    const stickyHeader = document.createElement("div");
    stickyHeader.classList.add("sticky-header");
    stickyHeader.innerHTML = generateStickyHeader();
    document.body.prepend(stickyHeader);
    const footer = document.createElement("footer");
    footer.innerHTML = generateFooter();
    const end = document.createElement("div");
    end.classList.add("end");
    end.innerHTML = generateEnd();
    footer.append(end);
    document.body.append(footer);
}
appendHeader();
// make stickyheader sticky
window.addEventListener("scroll", function () {
    const stickyHeader = document.querySelector(".sticky-header");
    stickyHeader.classList.toggle("sticked", window.scrollY > 250);
    stickyHeader.classList.toggle("unsticked", window.scrollY <= 250);
});
// generate categories 
function generateCategories(categories) {
    const containers = document.querySelectorAll(".hsec2");
    const listContainer = document.querySelector(".categorys ul");
    categories.forEach((category) => {
        containers.forEach((container) => {
            const details = document.createElement("details");
            details.innerHTML = `
                <summary>${category.summary} <i class="fa-solid fa-caret-down"></i></summary>
                <div class="content">
                    <ul>${category.content.map(item => `<li><a href="${category.url}${encodeURIComponent(item)}">${item}</a></li>`).join('')}</ul>
                </div>
            `;
            container.appendChild(details);
        });
        const li = document.createElement("li");
        li.innerHTML = `
            <button>${category.summary} <i class="fa-solid fa-angle-right"></i></button>
            <ul class="sub-menu">
                <div>${category.content.map(item => `<li><a href="${category.url}${encodeURIComponent(item)}">${item}</a></li>`).join('')}</div>
            </ul>
        `;
        listContainer.prepend(li);
    });
}
generateCategories(categories);
// generate aside OrderSummray for all pages
export function renderOrderSummray() {
    let cartSummHTML = "";
    cart.updateCartQuantity();
    if (cart.cartItems.length === 0) {
        cartSummHTML += `
			<div class="empty-cart">
				<h5>No products in the cart.</h5>
				<button><a href="#">Return To Shop</a></button>
			</div>
		`;
    }
    else {
        cart.cartItems.forEach((cartItem) => {
            const productId = cartItem.productId;
            const matchingproduct = getProduct(productId);
            if (matchingproduct) {
                cartSummHTML += `
						<div class="item">
							<img
								src="${matchingproduct.image}"
								alt="" />
							<div class="item-info">
								<h4>${matchingproduct.name}</h4>
								<div class="product-quantity-container">
									<div class="quantity-container">
										<button
											class="quantity-btn"
											onclick="this.nextElementSibling.stepDown()">
											-
										</button>
										<input
											type="number"
											class="quantity-input"
											data-product-id= '${matchingproduct.id}'
											value="${cartItem.quantity}"
											min="1"
											max="100" />
										<button
											class="quantity-btn"
											onclick="this.previousElementSibling.stepUp()">
											+
										</button>
									</div>
								</div>
								<div style = "display:flex">
								<span class = "js-quantity-label-${matchingproduct.id}">
								${cartItem.quantity}×</span><h4 class = "price" data-original-price-usd-cents = "${matchingproduct.priceCents}">${convMoney(matchingproduct.priceCents)} ${getCurrencySymbol()}</h4>
								</div>
							</div>
							<button class="delete" data-product-id= '${matchingproduct.id}' >x</button>
						</div>
			`;
            }
        });
    }
    document.querySelector(".cart-items").innerHTML =
        cartSummHTML;
    // make delete button work 
    document.querySelectorAll(".delete").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            if (productId) {
                cart.removeCart(productId);
            }
            else {
                console.error("Product ID is undefined");
            }
            renderPaymentSummary();
            renderOrderSummray();
        });
    });
    // update product quantity
    document.querySelectorAll(".quantity-input").forEach((link2) => {
        const updateQuantity = () => {
            const productId = link2.dataset.productId;
            let quantity = Number(link2.value);
            if (quantity > 100) {
                quantity = 100;
                link2.value = `100`;
            }
            else if (quantity < 1) {
                quantity = 1;
                link2.value = `1`;
            }
            let matchingItem;
            cart.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            if (matchingItem) {
                matchingItem.quantity = quantity;
                const quantityLabel = (document.querySelector(`.js-quantity-label-${productId}`));
                quantityLabel.textContent = `${quantity}x`;
                cart.updateCartQuantity();
                cart.savetostorage();
            }
        };
        const prevButton = link2.previousElementSibling;
        const nextButton = link2.nextElementSibling;
        // addEventListeners
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                updateQuantity();
                renderOrderSummray();
                renderPaymentSummary();
            });
        }
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                updateQuantity();
                renderOrderSummray();
                renderPaymentSummary();
            });
        }
        link2.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                updateQuantity();
                renderPaymentSummary();
                renderOrderSummray();
            }
        });
    });
    updateAllPrices();
}
renderOrderSummray();
// generate aside renderSummray for all pages
export function renderPaymentSummary() {
    let productPriceCents = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        if (product) {
            productPriceCents += product.priceCents * cartItem.quantity;
        }
    });
    let cartQuantity = 0;
    cart.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    const paymentSummaryHTML = `
		<h4>Subtotal:</h4>
		<span class = "price" data-original-price-usd-cents = "${productPriceCents}">${convMoney(productPriceCents)} ${getCurrencySymbol()}</span>
	`;
    document.querySelector(".cart-price").innerHTML =
        paymentSummaryHTML;
    updateAllPrices();
}
renderPaymentSummary();
// ScrollProgress
const up = document.querySelector(".up");
const upi = document.querySelector(".up i");
let height;
let resizeObserver;
function updateHeight() {
    height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
}
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const angle = Math.min((scrollTop / height) * 360, 360);
    up.style.background = `conic-gradient(white ${angle}deg, transparent 0deg)`;
    upi.classList.toggle("anim", scrollTop + window.innerHeight >= document.documentElement.scrollHeight);
    up.style.transform = scrollTop >= 500 ? "scale(1)" : "scale(0)";
}
function initScrollProgress() {
    updateHeight();
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    resizeObserver = new ResizeObserver(() => {
        updateHeight();
        updateScrollProgress();
    });
    resizeObserver.observe(document.body);
}
initScrollProgress();
// Navigation menu functionality
const nav = document.querySelector("nav");
const openNav = document.querySelectorAll(".nav-button");
const overlay = document.querySelector(".overlay");
const mSearch = document.querySelectorAll(".cart i");
const openAside = document.querySelectorAll(".cart-container");
const aside = document.querySelector("aside");
const closeButton = document.querySelectorAll(".close-button");
function toggleActive(open, side) {
    open.forEach((bar) => {
        bar.addEventListener("click", function () {
            side.classList.add(`${side.tagName.toLowerCase()}-active`);
            overlay.classList.add("active");
            const removeActive = () => {
                side.classList.remove(`${side.tagName.toLowerCase()}-active`);
                overlay.classList.remove("active");
            };
            overlay.addEventListener("click", removeActive);
            closeButton.forEach(button => button.addEventListener("click", removeActive));
        });
    });
}
toggleActive(openAside, aside);
toggleActive(openNav, nav);
// open seaarchbar for mobile screens
mSearch.forEach((sIcon) => {
    sIcon.addEventListener("click", () => {
        const searchFocus = document.querySelector("#header-search2");
        openNav.forEach(open => open.click());
        searchFocus.focus();
    });
});
// manage dropDownButtons for nav
const dropDownButtons = document.querySelectorAll("nav ul button");
const subMenus = document.querySelectorAll(".sub-menu");
dropDownButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        const isAlreadyActive = subMenus[index].classList.contains("show");
        subMenus.forEach((menu, menuIndex) => {
            const isCurrentMenu = menuIndex === index && !isAlreadyActive;
            menu.classList.toggle("show", isCurrentMenu);
            dropDownButtons[menuIndex].classList.toggle("show", isCurrentMenu);
            const icon = dropDownButtons[menuIndex].querySelector("i");
            if (icon)
                icon.classList.toggle("rotate", isCurrentMenu);
        });
    });
});
overlay.addEventListener("click", () => {
    subMenus.forEach((menu, index) => {
        menu.classList.remove("show");
        dropDownButtons[index].classList.remove("show");
        const icon = dropDownButtons[index].querySelector("i");
        if (icon)
            icon.classList.remove("rotate");
    });
});
// open detail on hover maybe not the best choice i should replace details
document.querySelectorAll("details").forEach((details) => {
    const summary = details.querySelector("summary");
    if (summary) {
        details.addEventListener("mouseenter", () => details.setAttribute("open", "true"));
        details.addEventListener("mouseleave", () => details.removeAttribute("open"));
    }
});
// make searchbar work
searchBarCon();
// make taost Notification appear
let toast = null;
let progress = null;
let timer1;
let timer2;
export function generateToast() {
    if (!toast) {
        const toastHTML = `
			<div class="toast">
				<div class="toast-content">
					<i class="fas fa-solid fa-check check"></i>
					<div class="message">
						<span class="text text-1">Success</span>
						<span class="text text-2">Your changes have been saved</span>
					</div>
				</div>
				<i class="fa-solid fa-xmark close"></i>
				<div class="progress"></div>
			</div>
		`;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        toast = document.querySelector(".toast");
        progress = document.querySelector(".progress");
        const closeIcon = document.querySelector(".close");
        closeIcon.addEventListener("click", () => {
            toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
            setTimeout(() => {
                progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
            }, 300);
            clearTimeout(timer1);
            clearTimeout(timer2);
        });
    }
    toast.classList.add("active");
    progress === null || progress === void 0 ? void 0 : progress.classList.add("active");
    clearTimeout(timer1);
    clearTimeout(timer2);
    timer1 = setTimeout(() => {
        toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
    }, 5000);
    timer2 = setTimeout(() => {
        progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
    }, 5300);
}
// handle register and sign in
function initializeHeaderWithAuth() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        initializeAuth();
        setupHeaderEventListeners();
    }
}
function setupHeaderEventListeners() {
    const signInElements = document.querySelectorAll('.sign-in');
    const dropdownMenu1 = document.getElementById('dropdownMenu1');
    signInElements.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const authManager = AuthManager.getInstance();
            if (authManager.isLoggedIn()) {
                if (dropdownMenu1) {
                    dropdownMenu1.style.display === 'flex' ? 'none' : "flex";
                }
            }
            else {
                window.location.href = 'register.html';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initializeHeaderWithAuth);
//# sourceMappingURL=global.js.map