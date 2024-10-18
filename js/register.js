import { AuthManager } from '../data/authmanager.js';
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const authManager = AuthManager.getInstance();
            if (authManager.register(username, password)) {
                window.location.href = 'index.html';
            }
            else {
            }
        });
    }
});
//# sourceMappingURL=register.js.map