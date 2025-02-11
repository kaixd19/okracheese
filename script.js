// script.js - Handles main page functionality and login check

// Function to handle the newsletter form submission (for index.html)
function handleNewsletterSubmit() {
    const email = document.getElementById('newsletterEmail').value;
    alert('Newsletter Email: ' + email + '\n\n(In a real application, this would be sent to a server for processing)');
    document.getElementById('newsletterForm').reset(); // Clear the form
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
