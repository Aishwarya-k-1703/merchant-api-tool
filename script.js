// ── API Config ──
const BASE_URL = "https://fakestoreapi.com";

// ── Utility: Show/Hide Elements ──
const show = (id) => document.getElementById(id).classList.remove("hidden");
const hide = (id) => document.getElementById(id).classList.add("hidden");

// ── Show Status Banner ──
function showBanner(type, title, detail) {
  const banner = document.getElementById("statusBanner");
  banner.className = `banner ${type}`;
  const icon = type === "success" ? "✅" : "❌";
  banner.innerHTML = `
    <span>${icon}</span>
    <div class="banner-content">
      <div class="banner-title">${title}</div>
      <div class="banner-detail">${detail}</div>
    </div>
  `;
  show("statusBanner");
}

// ── Render Product Cards ──
function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (products.length === 0) {
    show("emptyState");
    return;
  }

  hide("emptyState");

  products.forEach(product => {
    const stars = "★".repeat(Math.round(product.rating.rate)) +
                  "☆".repeat(5 - Math.round(product.rating.rate));

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img class="product-img" src="${product.image}" alt="${product.title}" loading="lazy"/>
      <div class="product-category">${product.category}</div>
      <div class="product-title">${product.title}</div>
      <div class="product-rating">
        <span class="stars">${stars}</span>
        ${product.rating.rate} (${product.rating.count} reviews)
      </div>
      <div class="product-footer">
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <span class="stock-badge">In Stock</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Main Fetch Function ──
async function fetchProducts() {
  const category = document.getElementById("categorySelect").value;

  // Reset UI
  hide("statusBanner");
  hide("statsBar");
  hide("emptyState");
  document.getElementById("productGrid").innerHTML = "";
  show("loader");

  // Build URL
  const url = category === "all"
    ? `${BASE_URL}/products`
    : `${BASE_URL}/products/category/${encodeURIComponent(category)}`;

  try {
    const response = await fetch(url);

    // Handle non-200 HTTP responses
    if (!response.ok) {
      throw {
        type: "HTTP_ERROR",
        status: response.status,
        message: getHttpErrorMessage(response.status)
      };
    }

    const products = await response.json();

    // Handle empty JSON
    if (!Array.isArray(products)) {
      throw { type: "PARSE_ERROR", message: "Unexpected API response format." };
    }

    hide("loader");

    // Update stats bar
    const statsBar = document.getElementById("statsBar");
    statsBar.classList.remove("hidden");
    document.getElementById("statsText").textContent =
      `Showing ${products.length} product${products.length !== 1 ? "s" : ""} ${category !== "all" ? `in "${category}"` : "across all categories"}`;
    document.getElementById("apiStatus").textContent = "● API Connected";
    document.getElementById("apiStatus").className = "api-status";

    showBanner("success",
      "Catalog Loaded Successfully",
      `Retrieved ${products.length} products from the merchant storefront API.`
    );

    renderProducts(products);

  } catch (error) {
    hide("loader");

    // Determine error type and show helpful merchant-facing message
    let title, detail;

    if (error.type === "HTTP_ERROR") {
      title = `API Error ${error.status}`;
      detail = error.message;
    } else if (error.type === "PARSE_ERROR") {
      title = "Invalid API Response";
      detail = "The store API returned data in an unexpected format. Contact your platform provider.";
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      title = "Network Error — Cannot Reach Store API";
      detail = "Check your internet connection. If the problem persists, the API server may be temporarily down.";
    } else if (error.name === "AbortError") {
      title = "Request Timed Out";
      detail = "The API took too long to respond. Please try again in a moment.";
    } else {
      title = "Unexpected Error";
      detail = "Something went wrong. Please refresh the page and try again.";
    }

    showBanner("error", title, detail);

    // Show error in stats bar too
    show("statsBar");
    document.getElementById("statsText").textContent = "No products loaded";
    document.getElementById("apiStatus").textContent = "● API Disconnected";
    document.getElementById("apiStatus").className = "api-status error-status";
  }
}

// ── HTTP Error Messages (merchant-friendly) ──
function getHttpErrorMessage(status) {
  const messages = {
    400: "Bad request sent to the store API. Check your query parameters.",
    401: "Authentication failed. Your API key may be missing or expired. Please reconnect your store.",
    403: "Access denied. Your account may not have permission to view this catalog.",
    404: "The requested product category was not found on this storefront.",
    429: "Too many requests sent. The API rate limit has been reached. Please wait a moment and try again.",
    500: "The store API is experiencing internal issues. This is not a problem on your end — try again shortly.",
    503: "The store API is temporarily unavailable. It may be undergoing maintenance."
  };
  return messages[status] || `The API returned an unexpected status (${status}). Please contact support.`;
}

// ── Simulate Error (for demo / testing) ──
async function simulateError() {
  hide("statusBanner");
  hide("statsBar");
  hide("emptyState");
  document.getElementById("productGrid").innerHTML = "";
  show("loader");

  // Intentionally bad URL to trigger a real fetch error
  const BAD_URL = "https://fakestoreapi.com/products/category/invalid-category-xyz";

  try {
    const response = await fetch(BAD_URL);

    if (!response.ok) {
      throw {
        type: "HTTP_ERROR",
        status: response.status,
        message: getHttpErrorMessage(response.status)
      };
    }

    const data = await response.json();

    // FakeStore returns [] for unknown categories — treat as empty
    hide("loader");
    show("statsBar");
    document.getElementById("statsText").textContent = "0 products returned";
    document.getElementById("apiStatus").textContent = "● API Connected";
    document.getElementById("apiStatus").className = "api-status";

    showBanner("error",
      "Category Not Found on Storefront",
      "The requested product category does not exist in this merchant's catalog. Check the category name and try again."
    );

    show("emptyState");

  } catch (error) {
    hide("loader");
    showBanner("error",
      "API Authentication Error (401)",
      "Your store API key is missing or has expired. Please reconnect your Swym integration from the merchant dashboard."
    );
    show("statsBar");
    document.getElementById("statsText").textContent = "Connection failed";
    document.getElementById("apiStatus").textContent = "● API Disconnected";
    document.getElementById("apiStatus").className = "api-status error-status";
  }
}

// ── Auto-load on page open ──
window.addEventListener("DOMContentLoaded", fetchProducts);
