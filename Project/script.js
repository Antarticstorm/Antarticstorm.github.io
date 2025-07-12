// Sidebar toggle

function openNav() {
  document.getElementById("mySidenav").classList.add("open");
  document.getElementById("openBtn")?.classList.add("hidden");
}
function closeNav() {
  document.getElementById("mySidenav").classList.remove("open");
  document.getElementById("openBtn")?.classList.remove("hidden");
}
document.addEventListener("click", e => {
  const side  = document.getElementById("mySidenav");
  const open  = document.getElementById("openBtn");
  if (side.classList.contains("open")
      && !side.contains(e.target)
      && !open.contains(e.target)) closeNav();
});

const topBtn = document.getElementById("myBtn");
window.addEventListener("scroll", () =>
  (document.documentElement.scrollTop || document.body.scrollTop) > 50
    ? topBtn.classList.add("show")
    : topBtn.classList.remove("show")
);
function topFunction() { window.scrollTo({ top: 0, behavior: "smooth" }); }

/* SLIDESHOW (generic) */
let touchStartX = 0, touchEndX = 0;
let slideIndex = 0, slides = [], dots = [], autoTimer = null;

function showSlide(i) {
  if (!slides.length) return;
  if (i >= slides.length) slideIndex = 0;
  if (i < 0)             slideIndex = slides.length - 1;
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d  => d .classList.remove("active"));
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}
function plusSlides(n) { clearTimeout(autoTimer); slideIndex += n; showSlide(slideIndex); autoTimer = setTimeout(autoPlay, 5000); }
function currentSlide(i){ clearTimeout(autoTimer); slideIndex = i; showSlide(slideIndex); autoTimer = setTimeout(autoPlay, 5000); }
function autoPlay()     { slideIndex++; showSlide(slideIndex); autoTimer = setTimeout(autoPlay, 5000); }
function initSlides() {
  slides = [...document.getElementsByClassName("mySlides")];
  dots.length = 0;
  const dotBox = document.getElementById("dotContainer");
  dotBox.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot";
    d.onclick = () => currentSlide(i);
    dotBox.appendChild(d);
    dots.push(d);
  });
}

/* GYM‑LEADER SLIDER */
let gymSlides = [], gymIndex = 0;
function showGymSlide(i) {
  if (!gymSlides.length) return;
  if (i >= gymSlides.length) gymIndex = 0;
  if (i < 0)                gymIndex = gymSlides.length - 1;
  gymSlides.forEach(s => s.classList.remove("active"));
  gymSlides[gymIndex].classList.add("active");
}
function nextGymSlide() { gymIndex++; showGymSlide(gymIndex); }
function prevGymSlide() { gymIndex--; showGymSlide(gymIndex); }

/* NEWSLETTER */
function validateAndSubscribe() {
  const emailInput = document.getElementById("emailInput");
  const email      = emailInput.value.trim();
  const btn        = document.getElementById("subscribe-text");
  const re         = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!re.test(email)) { alert("Please enter a valid email."); emailInput.focus(); return; }
  btn.textContent = "Subscribed"; btn.disabled = true; btn.style.cursor = "default"; emailInput.disabled = true;
  showToast("🎉 You’re now subscribed!");
}
function showToast(msg="Subscribed successfully!") {
  const toast = document.getElementById("toast");
  toast.textContent = msg; toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 6000);
}

/* AUTH (register / login / forgot) */
document.getElementById("registerForm")?.addEventListener("submit", e => {
  e.preventDefault();
  localStorage.setItem("registeredUsername", document.getElementById("regUsername").value);
  localStorage.setItem("registeredPassword", document.getElementById("regPassword").value);
  alert("Registered successfully!"); window.location.href = "login.html";
});
function togglePassword() {
  const pw = document.getElementById("password");
  pw.type = pw.type === "password" ? "text" : "password";
}
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === localStorage.getItem("registeredUsername") &&
      p === localStorage.getItem("registeredPassword")) {
    window.location.href = "index.html";
  } else {
    let err = document.getElementById("loginError");
    if (!err) { err = document.createElement("p"); err.id = "loginError"; err.style.color = "red"; e.target.appendChild(err); }
    err.textContent = "Invalid username or password.";
  }
});
document.getElementById("forgotForm")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Password reset link sent!"); window.location.href = "login.html";
});

/* SHOP – PRODUCT CARDS  */
const products = [
  { title:"Moisten Sale",     price:"Php 500", image:"Images/Logo.png" },
  { title:"Great Ball Pack",  price:"Php 350", image:"Images/Logo.png" },
  { title:"Ultra Box",        price:"Php 900", image:"Images/Logo.png" },
  { title:"Lucky Egg Bundle", price:"Php 400", image:"Images/Logo.png" },
  { title:"Incense Set",      price:"Php 600", image:"Images/Logo.png" },
  { title:"Rocket Radar",     price:"Php 200", image:"Images/Logo.png" },
  { title:"Egg Incubator",    price:"Php 700", image:"Images/Logo.png" },
  { title:"Raid Pass",        price:"Php 150", image:"Images/Logo.png" },
  { title:"Lure Module",      price:"Php 450", image:"Images/Logo.png" }
];

/* DOM READY – INITIALISE EVERYTHING */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Slideshow (if present) */
  if (document.getElementById("dotContainer")) {
    initSlides();
    showSlide(slideIndex);
    autoTimer = setTimeout(autoPlay, 5000);
  }

  /* 2. Gym‑slider (only if slides exist) */
  gymSlides = [...document.querySelectorAll(".gym-slide")];
  if (gymSlides.length) {
    showGymSlide(gymIndex);
    document.getElementById("gymNextBtn")?.addEventListener("click", nextGymSlide);
    document.getElementById("gymPrevBtn")?.addEventListener("click", prevGymSlide);
    document.querySelector(".gym-slider")?.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
    document.querySelector(".gym-slider")?.addEventListener("touchend",   e => {
      touchEndX = e.changedTouches[0].screenX;
      const d = touchEndX - touchStartX;
      if (d < -50) nextGymSlide();
      if (d >  50) prevGymSlide();
    });
  }

  /* 3. Shop products */
  const list = document.getElementById("product-list");
  if (list) {
    products.forEach(({title, price, image}) =>
      list.insertAdjacentHTML("beforeend", `
        <div class="product-container">
          <img src="${image}" alt="${title}" class="product-image">
          <div class="product-info"><span class="item-title">${title}</span></div>
          <div class="button-wrapper"><button class="buy-button" type="button">${price}</button></div>
        </div>
      `)
    );
  }
});
