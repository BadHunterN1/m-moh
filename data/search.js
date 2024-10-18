export function searchBarCon(searchPageUrl = 'shop.html') {
    const searchButtons = document.querySelectorAll('.search-button');
    const searchInputs = document.querySelectorAll('.search-bar1');
    let lastInteractedInput = null;
    function performSearch() {
        let searchTerm = lastInteractedInput ? lastInteractedInput.value.trim() : '';
        if (!searchTerm) {
            // Fallback to the first non-empty input if no interaction was recorded
            for (const input of searchInputs) {
                if (input.value.trim()) {
                    searchTerm = input.value.trim();
                    break;
                }
            }
        }
        if (searchTerm) {
            const url = new URL(searchPageUrl, window.location.origin);
            url.searchParams.set('search', encodeURIComponent(searchTerm));
            window.location.href = url.toString();
        }
    }
    function handleSearchClick(event) {
        event.preventDefault();
        // Update lastInteractedInput when a search button is clicked
        const button = event.currentTarget;
        const associatedInput = button.previousElementSibling;
        if (associatedInput && associatedInput.classList.contains('search-bar1')) {
            lastInteractedInput = associatedInput;
        }
        performSearch();
    }
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            lastInteractedInput = event.target;
            performSearch();
        }
    }
    function handleInputFocus(event) {
        lastInteractedInput = event.target;
    }
    searchButtons.forEach((button) => {
        button.addEventListener('click', handleSearchClick);
    });
    searchInputs.forEach((input) => {
        input.addEventListener('keydown', handleKeyPress);
        input.addEventListener('focus', handleInputFocus);
    });
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get('search');
    if (initialSearchTerm) {
        searchInputs.forEach((input) => {
            input.value = decodeURIComponent(initialSearchTerm);
        });
    }
}
//# sourceMappingURL=search.js.map