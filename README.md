# 🛒 Merchant Storefront API Integration Tool

A browser-based tool that connects to a merchant's product catalog via REST API, displays live inventory in a clean UI, and handles all common API failure modes with plain-language guidance for non-technical merchants.

Built as part of a Customer Experience Engineer portfolio — demonstrating real-world API integration, error diagnostics, and merchant-facing UX design.

---

## 🔗 Live Demo

> Open `index.html` in any browser — no installation required.

---

## 📸 Screenshots

### Successful Catalog Load
![Catalog loaded successfully with product cards displayed in a grid]

### API Error Handling
![Red error banner showing plain-language guidance when API fails]

---

## 🚀 Features

- **Live API Integration** — Connects to a product catalog REST API and fetches real-time inventory data
- **Category Filtering** — Browse by Electronics, Jewelery, Men's Clothing, Women's Clothing, or all categories at once
- **Product Cards** — Displays product image, title, category, star rating, review count, and price
- **Plain-Language Error Handling** — Every API failure mode returns a message a non-technical merchant can understand and act on
- **API Failure Simulator** — Built-in "Test API Failure" button to demonstrate error states live in demos
- **Zero Dependencies** — Pure HTML, CSS, and JavaScript. No frameworks, no build tools, no installs

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Responsive grid layout, animations, theming |
| Vanilla JavaScript | API calls, DOM manipulation, error handling |
| REST API (FakeStore API) | Mock merchant product catalog data source |
| Fetch API | Async HTTP requests with error handling |
| Chrome DevTools | Used to debug CORS issues and async edge cases |

---

## 📁 Project Structure

```
merchant-api-tool/
│
├── index.html       # Page structure — search bar, product grid, banners, footer
├── style.css        # All styling — teal theme, card layout, responsive grid
└── script.js        # All logic — API calls, error handling, card rendering
```

---

## ⚙️ How to Run

**Option 1 — Direct Browser**
1. Download or clone this repository
2. Open `index.html` in any browser (Chrome recommended)
3. Products load automatically on page open

**Option 2 — VS Code Live Server**
1. Open the project folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**

No Node.js, no npm, no setup needed.

---

## 🔌 API Reference

This project uses the **[FakeStore API](https://fakestoreapi.com)** as a mock merchant catalog.

| Endpoint | Description |
|---|---|
| `GET /products` | Fetch all products |
| `GET /products/category/{name}` | Fetch products by category |

In a real merchant integration, this would connect to a Shopify, BigCommerce, or custom storefront API using the merchant's API key.

---

## 🧪 Error Handling — All Cases Covered

A core feature of this tool is merchant-friendly error handling. Every failure returns a message that tells the merchant **what went wrong** and **what to do next**.

| Error Type | Merchant-Facing Message |
|---|---|
| 401 Unauthorized | "Authentication failed. Your API key may be missing or expired. Please reconnect your store." |
| 403 Forbidden | "Access denied. Your account may not have permission to view this catalog." |
| 404 Not Found | "The requested product category was not found on this storefront." |
| 429 Rate Limited | "Too many requests. The API rate limit has been reached. Please wait a moment and try again." |
| 500 Server Error | "The store API is experiencing internal issues. This is not a problem on your end — try again shortly." |
| Network Failure | "Check your internet connection. If the problem persists, the API server may be temporarily down." |
| Parse Error | "The store API returned data in an unexpected format. Contact your platform provider." |

### Testing Error States
Click the **⚠️ Test API Failure** button on the page to see error handling in action without breaking anything.

---

## 💡 Why This Project

Customer Experience Engineers at e-commerce SaaS platforms spend a significant part of their day:
- Diagnosing why a merchant's API integration isn't working
- Translating technical root causes into language non-technical merchants understand
- Guiding merchants through reconnecting their store or fixing configuration issues

This tool simulates exactly that workflow:
1. Merchant connects their store API
2. Tool fetches and displays their catalog
3. If something breaks — auth failure, timeout, bad response — the merchant sees a clear, actionable message instead of a raw error code

---

## 🔮 Future Improvements

- [ ] Support for real Shopify / BigCommerce API authentication
- [ ] Product search and sort functionality
- [ ] Export catalog as CSV
- [ ] API response time monitoring
- [ ] Multi-store switching support

---

## 👩‍💻 Author

**Aishwarya K**
- GitHub: [@Aishwarya-k-1703](https://github.com/Aishwarya-k-1703)
- LinkedIn: [aishwaryak1703](https://linkedin.com/in/aishwaryak1703)
- Email: aishwaryak1703@gmail.com

---

## 📄 License

MIT License — free to use and modify.
