document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const cetNumber = document.getElementById('cetNumber').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Reset error message
    errorMessage.textContent = '';

    try {
        const response = await fetch('http://localhost:1234/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cet_number: cetNumber,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '/dashboard'; // Redirect to dashboard on successful login
        } else {
            errorMessage.textContent = 'Invalid credentials'; // Display error message
        }
    } catch (err) {
        errorMessage.textContent = 'Unable to connect to the server. Please try again later.';
    }
});
