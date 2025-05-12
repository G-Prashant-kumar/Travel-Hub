document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    const errorMessage = document.getElementById('error-message');

    // Clear previous error messages
    if (errorMessage) {
        errorMessage.innerHTML = '';
    }

    try {
        const res = await fetch('https://travel-hub-1.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.msg);
            window.location.href = 'login.html';
        } else {
            if (data.msg === "Email already registered") {
                window.location.href = 'signup.html';
                alert("This email is already registered. Please use a different one.");

            }

            if (errorMessage) {
                errorMessage.innerHTML = data.msg || 'An error occurred. Please try again.';
                errorMessage.style.color = 'red';
            }
        }
    } catch (error) {
        // Only handle network or unexpected errors
        if (errorMessage) {
            errorMessage.innerHTML = 'A network error occurred. Please try again later.';
            errorMessage.style.color = 'red';
        }
    }
});
