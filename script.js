function addToCartWithQty(name, price, qtyId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let quantity = parseInt(document.getElementById(qtyId).value);

  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(quantity + " " + name + " added to cart!");
  updateCartCount();
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("total");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalDiv.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * (item.quantity || 1);
    total += itemTotal;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        ${item.name} - ${item.price} PKR<br>
        Quantity: ${item.quantity || 1}<br>
        Total: ${itemTotal} PKR<br>

        <button onclick="increaseQty(${index})">+</button>
        <button onclick="decreaseQty(${index})">-</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalDiv.innerText = "Total: " + total + " PKR";
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity = (cart[index].quantity || 1) + 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if ((cart[index].quantity || 1) > 1) {
    cart[index].quantity -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}
function searchProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    let name = product.querySelector(".product-name").innerText.toLowerCase();

    if (name.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity || 1;
  });

  let cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = totalItems;
  }
}
window.onload = function () {
  updateCartCount();
};
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast(name + " added to cart!");

  updateCartCount();
}
function showToast(message) {
  let toast = document.getElementById("toast");

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
function goBack() {
  window.history.back();
}
// SIGNUP
function signup() {
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Fill all fields!");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ email, password }));

  alert("Signup successful!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No account found!");
    return;
  }

  if (user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Wrong email or password!");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  alert("Logged out!");
  window.location.href = "login.html";
}
window.onload = function () {
  let isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn && !window.location.href.includes("login") && !window.location.href.includes("signup")) {
    window.location.href = "login.html";
  }

  updateCartCount();
};