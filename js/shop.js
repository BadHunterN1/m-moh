import { products, getProduct } from '../data/product.js';
import { convMoney } from '../data/money.js';
import { cart } from '../data/cart.js';
import { getCurrencySymbol, updateAllPrices, initializeCurrency } from "../data/currency.js";
import { renderOrderSummray, renderPaymentSummary } from './global.js';
class ProductListing {
    constructor(productsPerPage = 12) {
        this.productsPerPage = productsPerPage;
        this.allProducts = products;
        this.filteredProducts = [];
        this.overlay = this.getOrCreateOverlay();
        this.currentPage = 1;
        this.totalPages = 1;
        this.displayedProducts = [];
        this.sortOrder = 'latest';
        this.searchTerm = '';
        this.initializeState();
        this.render(true);
        this.setupEventListeners();
    }
    initializeState() {
        const urlParams = new URLSearchParams(window.location.search);
        this.sortOrder = urlParams.get('sort') || 'latest';
        this.searchTerm = urlParams.get('search') || '';
        this.filterAndSortProducts();
        this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        this.currentPage = this.getValidPageNumber(urlParams.get('page'));
        this.updateSortSelect();
    }
    filterAndSortProducts() {
        this.filteredProducts = this.searchTerm
            ? this.allProducts.filter((product) => {
                const searchTermLower = this.searchTerm.toLowerCase();
                const nameMatches = product.name.toLowerCase().includes(searchTermLower);
                const keywordsMatch = product.keywords.some((keyword) => keyword.toLowerCase().includes(searchTermLower));
                return nameMatches || keywordsMatch;
            })
            : [...this.allProducts];
        const sortFunctions = {
            latest: (a, b) => parseInt(b.id) - parseInt(a.id),
            asc: (a, b) => a.priceCents - b.priceCents,
            desc: (a, b) => b.priceCents - a.priceCents
        };
        this.filteredProducts.sort(sortFunctions[this.sortOrder]);
    }
    render(isInitialLoad = false) {
        this.filterAndSortProducts();
        this.updateDisplayedProducts();
        this.renderProducts(isInitialLoad);
        this.renderPagination();
    }
    updateDisplayedProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.productsPerPage);
    }
    renderProducts(isInitialLoad = false) {
        const productsContainer = document.querySelector('.products.products-container');
        const noFound = document.querySelector('.no');
        if (!productsContainer)
            return;
        if (!isInitialLoad) {
            this.fadeOutProducts(productsContainer);
        }
        setTimeout(() => {
            if (this.filteredProducts.length > 0) {
                productsContainer.innerHTML = this.displayedProducts.map(this.createProductHTML).join('');
            }
            else {
                noFound.innerHTML = '<p class="no-found"><i class="fa-solid fa-exclamation"></i> No products were found matching your selection.</p>';
            }
            updateAllPrices();
            setTimeout(() => this.fadeInProducts(productsContainer), 50);
        }, isInitialLoad ? 0 : 300);
    }
    createProductHTML(product) {
        return `
            <div class="card fade-in">
                <div class="img-con">
                    <div class="buttons">
                        <button class="view-button" data-product-id="${product.id}" data-pop="Quick view">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button class="add-to-cart" data-product-id="${product.id}" data-pop="Add to Cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                    <a href="product-details.html?productId=${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                <a href="product-details.html?productId=${product.id}">
                    <h4>${product.name}</h4>
                </a>
                <p>${product.description}</p>
                <div class="price" data-original-price-usd-cents="${product.priceCents}">
                    ${convMoney(product.priceCents)} ${getCurrencySymbol()}
                </div>
            </div>
        `;
    }
    fadeOutProducts(container) {
        const products = container.querySelectorAll('.card');
        products.forEach(product => product.classList.add('fade-out'));
    }
    fadeInProducts(container) {
        const products = container.querySelectorAll('.card');
        products.forEach(product => product.classList.remove('fade-in'));
    }
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination)
            return;
        pagination.innerHTML = Array.from({ length: this.totalPages }, (_, i) => i + 1)
            .map(page => `
                <button ${page === this.currentPage ? 'disabled' : ''}>
                    ${page}
                </button>
            `).join('');
    }
    setupEventListeners() {
        var _a, _b, _c;
        (_a = document.getElementById('sort-select')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.handleSortChange.bind(this));
        (_b = document.getElementById('pagination')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handlePaginationClick.bind(this));
        (_c = document.querySelector('.products-container')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.handleProductAction.bind(this));
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }
    handleSortChange(event) {
        const select = event.target;
        this.changeSort(select.value);
    }
    handlePaginationClick(event) {
        const button = event.target.closest('button');
        if (button) {
            this.changePage(parseInt(button.textContent || '1'));
        }
    }
    handleProductAction(event) {
        const target = event.target;
        const viewButton = target.closest('.view-button');
        const addToCartButton = target.closest('.add-to-cart');
        if (viewButton)
            this.handleQuickView(viewButton);
        else if (addToCartButton)
            this.handleAddToCart(addToCartButton);
    }
    handleQuickView(button) {
        const productId = button.dataset.productId;
        if (!productId)
            return;
        const product = getProduct(productId);
        if (!product)
            return;
        const quickViewDiv = document.createElement('div');
        quickViewDiv.classList.add('quick-view');
        quickViewDiv.innerHTML = this.createQuickViewHTML(product);
        document.body.appendChild(quickViewDiv);
        this.overlay.classList.add('active');
        this.setupQuickViewListeners(quickViewDiv);
        updateAllPrices();
    }
    createQuickViewHTML(product) {
        return `
            <button class="close">x</button>
            <div class="view-product">
                <img src="${product.image}" alt="${product.name}" />
                <div class="view-info">
                    <a href="product-details.html?productId=${product.id}">${product.name}</a>
                    <div class="price" data-original-price-usd-cents="${product.priceCents}">
                        ${convMoney(product.priceCents)} ${getCurrencySymbol()}
                    </div>
                    <h5><strong>Notes:</strong></h5>
                    <ul>
                        <li>Sale items are not eligible for returns, exchanges, or refunds.</li>
                    </ul>
                    <div class="input">
                        <div class="product-quantity-container">
                            <div class="quantity-container">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" class="quantity-input" value="1" min="1" max="100" />
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <button class="add-to-cart" data-product-id='${product.id}'>ADD TO CART</button>
                    </div>
                    <p><strong>Categories:</strong> ${product.type}</p>
                    <p>
                        <strong>Share:</strong> 
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-x-twitter"></i>
                        <i class="fa-brands fa-linkedin-in"></i>
                        <i class="fa-brands fa-whatsapp"></i>
                        <i class="fa-brands fa-telegram"></i>
                    </p>
                </div>
            </div>
        `;
    }
    setupQuickViewListeners(quickViewDiv) {
        var _a, _b, _c, _d;
        const closeQuickView = () => {
            quickViewDiv.style.opacity = "0";
            this.overlay.style.opacity = "0";
            setTimeout(() => {
                this.overlay.classList.remove('active');
                quickViewDiv.remove();
            }, 200);
        };
        (_a = quickViewDiv.querySelector('.close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeQuickView);
        this.overlay.addEventListener('click', closeQuickView);
        const quantityInput = quickViewDiv.querySelector('.quantity-input');
        (_b = quickViewDiv.querySelector('.minus')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.updateQuantity(quantityInput, -1));
        (_c = quickViewDiv.querySelector('.plus')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.updateQuantity(quantityInput, 1));
        (_d = quickViewDiv.querySelector('.add-to-cart')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => this.handleQuickViewAddToCart(e.currentTarget, quantityInput));
    }
    updateQuantity(input, change) {
        input.value = Math.max(1, Math.min(100, Number(input.value) + change)).toString();
    }
    handleQuickViewAddToCart(button, quantityInput) {
        const productId = button.dataset.productId;
        if (!productId)
            return;
        const quantity = Math.max(1, Math.min(100, Number(quantityInput.value)));
        this.addProductToCart(productId, quantity);
        this.updateAddToCartButton(button);
    }
    handleAddToCart(button) {
        const productId = button.dataset.productId;
        if (!productId)
            return;
        this.addProductToCart(productId, 1);
        this.updateAddToCartIcon(button);
    }
    addProductToCart(productId, quantity) {
        cart.addToCart(productId, quantity);
        cart.updateCartQuantity();
        renderOrderSummray();
        renderPaymentSummary();
    }
    updateAddToCartButton(button) {
        button.textContent = 'Added';
        setTimeout(() => button.textContent = 'Add to Cart', 2000);
    }
    updateAddToCartIcon(button) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-check';
            setTimeout(() => icon.className = 'fa-solid fa-cart-shopping', 2000);
        }
    }
    changePage(page) {
        this.currentPage = page;
        this.updateUrl();
        this.render();
    }
    changeSort(order) {
        this.sortOrder = order;
        this.currentPage = 1;
        this.updateUrl();
        this.render();
    }
    updateUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.currentPage.toString());
        url.searchParams.set('sort', this.sortOrder);
        url.searchParams.set('search', this.searchTerm);
        window.history.pushState({ page: this.currentPage, sort: this.sortOrder }, '', url.toString());
    }
    handlePopState() {
        this.initializeState();
        this.render();
    }
    getOrCreateOverlay() {
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }
    getValidPageNumber(pageParam) {
        const page = parseInt(pageParam || '1');
        return isNaN(page) ? 1 : Math.max(1, Math.min(page, this.totalPages));
    }
    updateSortSelect() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect)
            sortSelect.value = this.sortOrder;
    }
}
initializeCurrency();
new ProductListing();
//# sourceMappingURL=shop.js.map