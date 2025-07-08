// Sidebar toggle

function openNav() {
  const sidenav = document.getElementById("mySidenav");
  sidenav.classList.add("open");
  document.getElementById("openBtn").classList.add("hidden");
}

function closeNav() {
  const sidenav = document.getElementById("mySidenav");
  sidenav.classList.remove("open");
  document.getElementById("openBtn").classList.remove("hidden");
}


// Close the sidebar if clicked outside
document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("mySidenav");
  const openBtn = document.getElementById("openBtn");
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnOpenBtn = openBtn.contains(event.target);
  const isSidebarOpen = sidebar.classList.contains("open");

  if (!isClickInsideSidebar && !isClickOnOpenBtn && isSidebarOpen) {
    closeNav();
  }
});

// Go to top button
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.classList.add("show");
  } else {
    mybutton.classList.remove("show");
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Slideshow

let touchStartX = 0;
let touchEndX = 0;
let slideIndex = 0;
let slides = [];
let dots = [];
let autoSlideTimer = null;

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance < -50) {
    plusSlides(1); // swipe left
  } else if (swipeDistance > 50) {
    plusSlides(-1); // swipe right
  }
}

function initSlides() {
  slides = document.getElementsByClassName("mySlides");
  const dotContainer = document.getElementById("dotContainer");
  dotContainer.innerHTML = "";
  dots = [];

  Array.from(slides).forEach((slide, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => currentSlide(i));
    dotContainer.appendChild(dot);
    dots.push(dot);
  });
}

function showSlide(index) {
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  Array.from(slides).forEach((slide) => (slide.style.display = "none"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function plusSlides(position) {
  clearTimeout(autoSlideTimer);
  slideIndex += position;
  showSlide(slideIndex);
  autoSlideTimer = setTimeout(showSlides, 5000);
}

function currentSlide(index) {
  clearTimeout(autoSlideTimer);
  slideIndex = index;
  showSlide(slideIndex);
  autoSlideTimer = setTimeout(showSlides, 5000);
}

function showSlides() {
  slideIndex++;
  showSlide(slideIndex);
  autoSlideTimer = setTimeout(showSlides, 5000);
}

// Team GO Rocket Slider
let rocketSlides = [];
let rocketIndex = 0;

function showRocketSlide(index) {
  rocketSlides.forEach(slide => slide.classList.remove("active"));
  if (index >= rocketSlides.length) rocketIndex = 0;
  if (index < 0) rocketIndex = rocketSlides.length - 1;
  rocketSlides[rocketIndex].classList.add("active");
}

function nextRocketSlide() {
  rocketIndex++;
  showRocketSlide(rocketIndex);
}

function prevRocketSlide() {
  rocketIndex--;
  showRocketSlide(rocketIndex);
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initSlides();
  showSlides();

  const slideshowContainer = document.querySelector(".slideshow");
  slideshowContainer?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  slideshowContainer?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  const backButton = document.getElementById("backButton");
  backButton?.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.back();
  });

  // Initialize Team GO Rocket slider
  rocketSlides = Array.from(document.querySelectorAll(".rocket-slide"));
  showRocketSlide(rocketIndex);

  document.getElementById("rocketNextBtn")?.addEventListener("click", nextRocketSlide);
  document.getElementById("rocketPrevBtn")?.addEventListener("click", prevRocketSlide);

  // Touch events for Team GO Rocket slider
  const rocketContainer = document.querySelector(".rocket-slider");
  rocketContainer?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  rocketContainer?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance < -50) nextRocketSlide();
    else if (swipeDistance > 50) prevRocketSlide();
  });
});

