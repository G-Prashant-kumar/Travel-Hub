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
        alert(data.msg);

        if (res.ok) {
            localStorage.setItem('token', data.token);

            const intendedUrl = localStorage.getItem('intendedUrl');
            if (intendedUrl) {
                localStorage.removeItem('intendedUrl');
                window.location.href = intendedUrl;
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
