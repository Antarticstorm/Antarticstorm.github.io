/* CART – SIDEBAR */
let cart = (JSON.parse(localStorage.getItem("cart") || "[]")).map(item => ({ ...item, qty: item.qty ?? 1 }));

function createCartItemHTML(item, index) {
  const lineTotal = item.price * item.qty;
  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-info">
        <strong>${item.title}</strong><br>
        Php ${lineTotal}
      </div>
      <div class="qty-controls">
        <button class="qty-btn qty-minus" data-index="${index}">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn qty-plus" data-index="${index}">+</button>
      </div>
    </div>
  `;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart.splice(index, 1);
  renderCart();
}

function addToCart(title, price, image) {
  if (localStorage.getItem("isLoggedIn") !== "true") return showLoginPopup();
  const existing = cart.find(i => i.title === title);
  existing ? existing.qty++ : cart.push({ title, price, image, qty: 1 });
  renderCart();
  showAddToCartPopup(title);
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = createCartItemHTML(item, index);
    cartItems.appendChild(li);
  });
  if (cartTotal) cartTotal.textContent = `Php ${total}`;
  if (cartCount) cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showLoginPopup() {
  const popup = document.createElement("div");
  popup.className = "login-popup";
  popup.textContent = "🛑 Please log in to add items to cart.";
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  }, 10);
}

function showAddToCartPopup(title) {
  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.textContent = `🛒 ${title} added to cart!`;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  }, 10);
}

function clearCart() {
  cart = [];
  renderCart();
}

function checkoutCart() {
  if (!cart.length) return;
  alert("Thank you for your purchase!");
  clearCart();
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
}

function openNav() {
  document.getElementById("mySidenav").classList.add("open");
  document.getElementById("openBtn")?.classList.add("hidden");
}

function closeNav() {
  document.getElementById("mySidenav").classList.remove("open");
  document.getElementById("openBtn")?.classList.remove("hidden");
}

document.addEventListener("click", e => {
  const side = document.getElementById("mySidenav");
  const open = document.getElementById("openBtn");
  if (side.classList.contains("open") && !side.contains(e.target) && !open.contains(e.target)) closeNav();
});

window.addEventListener("scroll", () => {
  const topBtn = document.getElementById("myBtn");
  (document.documentElement.scrollTop || document.body.scrollTop) > 50
    ? topBtn.classList.add("show")
    : topBtn.classList.remove("show");
});

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
} 

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
} 

/* Newsletter */
function validateAndSubscribe() {
  const emailInput = document.getElementById("emailInput");
  const toast = document.getElementById("toast");
  const subscribeText = document.getElementById("subscribe-text");
  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  toast.textContent = isValid
    ? "🎉 Subscribed successfully!"
    : "❌ Please enter a valid email.";

  toast.style.backgroundColor = isValid ? "#2ecc71" : "#e74c3c";

  void toast.offsetHeight;

  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0%)";
  toast.style.pointerEvents = "auto";

  if (isValid) {
    emailInput.disabled = true;
    subscribeText.disabled = true;
    subscribeText.textContent = "Subscribed";
  }

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(100%)";
    toast.style.pointerEvents = "none";
  }, 5000);
}

/* SLIDESHOW */
let touchStartX = 0, touchEndX = 0;
let slideIndex = 0, slides = [], dots = [], autoTimer = null;

function showSlide(i) {
  if (!slides.length) return;
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

function plusSlides(n) {
  clearTimeout(autoTimer);
  showSlide(slideIndex += n);
  autoTimer = setTimeout(autoPlay, 5000);
}

function currentSlide(i) {
  clearTimeout(autoTimer);
  showSlide(slideIndex = i);
  autoTimer = setTimeout(autoPlay, 5000);
}

function autoPlay() {
  showSlide(++slideIndex);
  autoTimer = setTimeout(autoPlay, 5000);
}

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
  gymIndex = (i + gymSlides.length) % gymSlides.length;
  gymSlides.forEach(s => s.classList.remove("active"));
  gymSlides[gymIndex].classList.add("active");
}

const nextGymSlide = () => showGymSlide(++gymIndex);
const prevGymSlide = () => showGymSlide(--gymIndex);

/* AUTHENTICATION */

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm  = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      document.getElementById("loginError").textContent = "Passwords do not match!";
      return;
    }

    localStorage.setItem("registeredUsername", username);
    localStorage.setItem("registeredPassword", password);

    alert("Registered successfully!");
    window.location.href = "login.html";
  });
}

// PASSWORD VISIBILITY
[...document.querySelectorAll(".toggle-password")].forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value;

    if (u === localStorage.getItem("registeredUsername") && p === localStorage.getItem("registeredPassword")) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      let err = document.getElementById("loginError");
      if (!err) {
        err = document.createElement("p");
        err.id = "loginError";
        err.style.color = "red";
        loginForm.appendChild(err);
      }
      err.textContent = "Invalid username or password.";
    }
  });
}

// FORGOT PASSWORD
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Password reset link sent!");
    window.location.href = "login.html";
  });
}

// LOGOUT
function logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

/* SHOP – PRODUCT CARDS */
const products = [
  { title: "Lucky Egg", price: 129, image: "Images/shop-img/luckyegg.webp" },
  { title: "Star Piece", price: 159, image: "Images/shop-img/StarPiece.webp" },
  { title: "Pokemon Storage", price: 59, image: "Images/shop-img/PokemonStorage.webp" },
  { title: "Max Revive", price: 69, image: "Images/shop-img/MaxRevive.webp" },
  { title: "Egg Incubator", price: 89, image: "Images/shop-img/EggIncubator.png" },
  { title: "Super Egg Incubator", price: 99, image: "Images/shop-img/EggIncubatorSuper.webp" },
  { title: "Max Mushroom", price: 289, image: "Images/shop-img/MaxMushroom.webp" },
  { title: "Max Particle pack", price: 299, image: "Images/shop-img/MaxParticlePack.webp" },
];

/* DOM READY */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("dotContainer")) {
    initSlides();
    showSlide(slideIndex);
    autoTimer = setTimeout(autoPlay, 5000);
  }

  gymSlides = [...document.querySelectorAll(".gym-slide")];
  if (gymSlides.length) {
    showGymSlide(gymIndex);
    document.getElementById("gymNextBtn")?.addEventListener("click", nextGymSlide);
    document.getElementById("gymPrevBtn")?.addEventListener("click", prevGymSlide);
    const slider = document.querySelector(".gym-slider");
    slider?.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
    slider?.addEventListener("touchend", e => {
      touchEndX = e.changedTouches[0].screenX;
      const d = touchEndX - touchStartX;
      if (d < -50) nextGymSlide();
      if (d > 50) prevGymSlide();
    });
  }

  const list = document.getElementById("product-list");
  if (list) {
    products.forEach(({ title, price, image }) => {
      list.insertAdjacentHTML("beforeend", `
        <div class="product-container">
          <img src="${image}" alt="${title}" class="product-image">
          <div class="product-info"><span class="item-title">${title}</span></div>
          <button class="buy-button" type="button">PHP ${price}</button>
        </div>
      `);
    });
  }

  renderCart();

  document.addEventListener("click", e => {
    const sidenav = document.getElementById("mySidenav");
    const sidenavBtn = document.getElementById("openBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartIcon = document.querySelector(".cart-icon");

    if (sidenav?.classList.contains("open") && !sidenav.contains(e.target) && !sidenavBtn.contains(e.target)) closeNav();
    if (cartSidebar?.classList.contains("open") && !cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) cartSidebar.classList.remove("open");

    if (e.target.classList.contains("buy-button")) {
      const card = e.target.closest(".product-container");
      const title = card.querySelector(".item-title").textContent;
      const price = Number(e.target.textContent.replace(/[^\d]/g, ""));
      const image = card.querySelector(".product-image").src;
      addToCart(title, price, image);
    }

    if (e.target.id === "clearCartBtn") clearCart();
    if (e.target.id === "checkoutBtn") checkoutCart();
    if (e.target.classList.contains("qty-plus")) changeQty(Number(e.target.dataset.index), 1);
    if (e.target.classList.contains("qty-minus")) changeQty(Number(e.target.dataset.index), -1);
  });

  const username = localStorage.getItem("registeredUsername");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginStatusEl = document.getElementById("loginStatus");
  const logoutBtn = document.querySelector(".logout-btn");

  if (loginStatusEl && window.location.pathname.endsWith("index.html")) {
    loginStatusEl.textContent = isLoggedIn && username ? `You are logged in as ${username}` : "You are not signed in";
  }

  if (loginStatusEl && logoutBtn) {
    loginStatusEl.textContent = isLoggedIn ? "You are logged in" : "You are not signed in";
    logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
  }
});
