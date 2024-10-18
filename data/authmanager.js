export class AuthManager {
    constructor() { }
    static getInstance() {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }
        return AuthManager.instance;
    }
    isLoggedIn() {
        return localStorage.getItem('username') !== null;
    }
    login(username) {
        localStorage.setItem('username', username);
        this.updateHeader();
    }
    logout() {
        localStorage.removeItem('username');
        this.updateHeader();
    }
    register(username, password) {
        if (!localStorage.getItem(username)) {
            localStorage.setItem(username, password);
            this.login(username);
            return true;
        }
        return false;
    }
    updateHeader() {
        const signInElements = document.querySelectorAll('.sign-in');
        const dropdownMenu1 = document.getElementById('dropdownMenu1');
        const username = localStorage.getItem('username');
        signInElements.forEach((element) => {
            if (username) {
                element.textContent = `Hello, ${username}`;
                element.addEventListener('click', this.toggleDropdownMenu1);
                if (dropdownMenu1) {
                    dropdownMenu1.style.display = 'none';
                }
            }
            else {
                element.textContent = 'Login/Register';
                element.removeEventListener('click', this.toggleDropdownMenu1);
                if (dropdownMenu1) {
                    dropdownMenu1.style.display = 'none';
                }
            }
        });
    }
    toggleDropdownMenu1(event) {
        event.preventDefault();
        const dropdownMenu1 = document.getElementById('dropdownMenu1');
        if (dropdownMenu1) {
            dropdownMenu1.style.display = dropdownMenu1.style.display === 'flex' ? 'none' : 'flex';
        }
    }
}
export function initializeAuth() {
    const authManager = AuthManager.getInstance();
    const signOutButton = document.getElementById('signOut');
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            authManager.logout();
        });
    }
    authManager.updateHeader(); // Make sure the header is updated on page load
}
//# sourceMappingURL=authmanager.js.map