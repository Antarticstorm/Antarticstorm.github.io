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

    let touchStartX = 0;
    let touchEndX = 0;
    let slideIndex = 0;
    let slides, dots;
    let autoSlideTimer;

        function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        plusSlides(1); // swipe left
      }
      if (touchEndX > touchStartX + 50) {
        plusSlides(-1); // swipe right
      }
    }

      function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        plusSlides(1); // next slide
      }
      if (touchEndX > touchStartX + 50) {
        plusSlides(-1); // previous slide
      }
    }

    // inside DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
      initSlides();
      showSlides();

      const slideshowContainer = document.querySelector(".slideshow") || document;
      slideshowContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      slideshowContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
    });


    function initSlides() {
      slides = document.getElementsByClassName("mySlides");
      
      const dotContainer = document.getElementById("dotContainer");
      dotContainer.innerHTML = ""; // clear any existing
      dots = [];

      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.addEventListener("click", () => currentSlide(i));
        dotContainer.appendChild(dot);
        dots.push(dot);
      }
    }


    function plusSlides(position) {
      clearTimeout(autoSlideTimer); // stop current timer
      slideIndex += position;
      showSlide(slideIndex);
      autoSlideTimer = setTimeout(showSlides, 6000); // restart
    }

    function currentSlide(index) {
      clearTimeout(autoSlideTimer); // stop current timer
      slideIndex = index;
      showSlide(slideIndex);
      autoSlideTimer = setTimeout(showSlides, 6000); // restart
    }

    function showSlide(index) {
      if (!slides || slides.length === 0) return;

      if (index >= slides.length) slideIndex = 0;
      if (index < 0) slideIndex = slides.length - 1;

      // Hide all
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " active";
    }

    function showSlides() {
      slideIndex++;
      showSlide(slideIndex);
      autoSlideTimer = setTimeout(showSlides, 6000);
    }

    // initialize
    window.addEventListener("DOMContentLoaded", () => {
      initSlides();
      showSlides();
    });

    document.getElementById("backButton").addEventListener("click", function(event) {
      event.preventDefault();
      window.history.back();
    });