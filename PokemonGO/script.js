function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("openBtn").classList.add("hidden");
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("openBtn").classList.remove("hidden");
  document.body.style.backgroundColor = "white";
}

document.addEventListener('click', function(event) {
  const sidebar = document.getElementById("mySidenav");
  const openBtn = document.getElementById("openBtn");

  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnOpenBtn = openBtn.contains(event.target);
  const isSidebarOpen = sidebar.style.width !== "0" && sidebar.style.width !== "";

  if (!isClickInsideSidebar && !isClickOnOpenBtn && isSidebarOpen) {
    closeNav();
  }
});

// slideshow
let slideIndex = 0;

// Declare variables for slides and dots
let slides, dots;

// Function to navigate to the next or previous slide
function plusSlides(position) {
    // Update the slide index based on the position
    slideIndex += position;

    // Handle edge cases for exceeding slide boundaries
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide
    slides[slideIndex].style.display = "block";

    // Add the "active" class to the corresponding dot
    dots[slideIndex].className += " active";
}

// Function to navigate to a specific slide
function currentSlide(index) {
    // Handle edge cases for exceeding slide boundaries
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the selected slide
    slides[index].style.display = "block";

    // Add the "active" class to the corresponding dot
    dots[index].className += " active";
}

// Function to initialize and control the slideshow
function showSlides() {
    // Get all elements with the class "mySlides" and "dot"
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");

    // Hide all slides initially
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment the slide index
    slideIndex++;

    // Handle edge case for exceeding slide boundaries
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Remove the "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide
    slides[slideIndex].style.display = "block";

    // Add the "active" class to the corresponding dot
    dots[slideIndex].className += " active";

    // Set a timeout to call showSlides every 6 seconds for automatic slideshow
    setTimeout(showSlides, 6000);
}
// Call the showSlides function to start the slideshow
showSlides();

document.getElementById("backButton").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});
