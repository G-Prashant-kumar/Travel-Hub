document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('https://travel-hub-1.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.msg);
            localStorage.setItem('token', data.token);

            const intendedUrl = localStorage.getItem('intendedUrl');
            if (intendedUrl) {
                localStorage.removeItem('intendedUrl');
                window.location.href = intendedUrl;
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert(data.msg || 'Invalid email or password.');
        }
    } catch (error) {
        // Remove console log to avoid dev console warnings
        alert('Network error. Please try again later.');
    }
});
