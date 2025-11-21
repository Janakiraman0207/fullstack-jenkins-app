const API_BASE = "http://localhost:5000";

const productsGrid = document.getElementById("products-grid");
const loadingEl = document.getElementById("loading");
const cartCountEl = document.getElementById("cart-count");
const cartListEl = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const yearEl = document.getElementById("year");

// Footer year
yearEl.textContent = new Date().getFullYear();

let cart = [];

// Render Cart
function renderCart() {
  cartListEl.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    const lineTotal = item.qty * item.price;
    total += lineTotal;
    count += item.qty;

    li.innerHTML = `
      <div>
        <p class="cart-name">${item.name}</p>
        <p class="cart-qty">${item.qty} × ₹${item.price.toLocaleString("en-IN")}</p>
      </div>
      <span class="cart-line">₹${lineTotal.toLocaleString("en-IN")}</span>
    `;

    cartListEl.appendChild(li);
  });

  cartCountEl.textContent = count;
  cartTotalEl.textContent = "₹" + total.toLocaleString("en-IN");
}

// Add to cart
function addToCart(product) {
  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

// Load Products
async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    const data = await res.json();

    loadingEl.style.display = "none";

    data.forEach((product) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" class="card-image" />
          ${
            product.badge
              ? `<span class="badge">${product.badge}</span>`
              : ""
          }
        </div>
        <div class="card-body">
          <h3>${product.name}</h3>
          <p class="card-copy">${product.shortDescription}</p>
          <div class="card-meta">
            <span class="price">₹${product.price.toLocaleString("en-IN")}</span>
            <span class="rating">★ ${product.rating}</span>
          </div>

          <div class="card-footer">
            <span class="stock ${
              product.inStock ? "in-stock" : "out-stock"
            }">
              ${product.inStock ? "In stock" : "Out of stock"}
            </span>
            <button class="mini-btn" ${
              product.inStock ? "" : "disabled"
            }>Add to cart</button>
          </div>
        </div>
      `;

      const btn = card.querySelector(".mini-btn");
      btn.addEventListener("click", () => {
        if (product.inStock) addToCart(product);
      });

      productsGrid.appendChild(card);
    });
  } catch (err) {
    loadingEl.textContent = "Failed to load products.";
    console.error(err);
  }
}

loadProducts();
