// script.js - Handles main page functionality and login check

// Function to handle the newsletter form submission (for index.html)
function handleNewsletterSubmit() {
    const email = document.getElementById('newsletterEmail').value;
    alert('Newsletter Email: ' + email + '\n\n(In a real application, this would be sent to a server for processing)');
    document.getElementById('newsletterForm').reset(); // Clear the form
}

// Function to handle the motivational quote form submission (for index.html)
function handleQuoteSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('quoteForm');
    const formData = new FormData(form);

    // Replace "YOUR_APPS_SCRIPT_WEB_APP_URL" with your actual Apps Script URL
    fetch("https://script.google.com/macros/s/AKfycbwb9MvFBYrW2VEAFlefhOFNkJMvEiTJ3EM5Hv3PyYPOXJ_ikfh-ZjtMtfmJ2D8T7m5l/exec", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert("Thank you! Your request has been received.");
                form.reset();  // Clear the form
            } else {
                alert("Submission failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
}

// Slideshow functionality (for index.html)
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (!slides) return; // Exit if there are no slides

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Login Check - THIS IS CRUCIAL!
// Check if user is logged in
// This should run ONLY in index.html.   The logic is placed here in script.js due to how the html files load
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = "index.html";
    }
};
