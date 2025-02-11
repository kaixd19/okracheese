async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const answer = document.getElementById('verification-answer').value;
    const errorMessage = document.getElementById('login-error');

    // Send data to Google Sheets via Apps Script
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwb9MvFBYrW2VEAFlefhOFNkJMvEiTJ3EM5Hv3PyYPOXJ_ikfh-ZjtMtfmJ2D8T7m5l/exec', { // Replace with your Web App URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, answer: answer })
        });

        const result = await response.json();

        if (result.result === "success") {
            // Handle successful submission (e.g., redirect)
            window.location.href = "index.html";
        } else {
            errorMessage.textContent = 'Submission failed: ' + result.error;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred: ' + error;
    }
}
