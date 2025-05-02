document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    const errorMessage = document.getElementById('error-message');  // Assuming you add a div for error messages

    // Clear previous error messages
    if (errorMessage) {
        errorMessage.innerHTML = '';
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.msg); // Success message
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            // Display error messages dynamically
            if (errorMessage) {
                errorMessage.innerHTML = data.msg || 'An error occurred. Please try again.';
                errorMessage.style.color = 'red';
            }
        }
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.innerHTML = 'An error occurred. Please try again.';
            errorMessage.style.color = 'red';
        }
    }
});
