document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            // Handle login logic here, e.g., send data to server
            console.log('Login:', { email, password });
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            // Handle signup logic here, e.g., send data to server
            console.log('Signup:', { name, email, password });
        });
    }
});
