export function searchBarCon(searchPageUrl = 'shop.html') {
    const searchButtons = document.querySelectorAll('.search-button');
    const searchInputs = document.querySelectorAll('.search-bar1');
    function performSearch() {
        let searchTerm = '';
        searchInputs.forEach((input) => {
            if (input.value.trim()) {
                searchTerm = input.value.trim();
                return;
            }
        });
        if (searchTerm) {
            const url = new URL(searchPageUrl, window.location.origin);
            url.searchParams.set('search', searchTerm);
            window.location.href = url.toString();
        }
    }
    function handleSearchClick(event) {
        event.preventDefault();
        performSearch();
    }
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    }
    searchButtons.forEach((button) => {
        button.addEventListener('click', handleSearchClick);
    });
    searchInputs.forEach((input) => {
        input.addEventListener('keydown', handleKeyPress);
    });
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get('search');
    if (initialSearchTerm) {
        searchInputs.forEach((input) => {
            input.value = initialSearchTerm;
        });
    }
}
//# sourceMappingURL=search.js.map