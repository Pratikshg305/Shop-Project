# FeedShop Stock Management — Project Manual

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Prerequisites](#4-prerequisites)
5. [Installation & Setup](#5-installation--setup)
6. [Running the Application](#6-running-the-application)
7. [Architecture](#7-architecture)
8. [Frontend Details](#8-frontend-details)
9. [Backend Details](#9-backend-details)
10. [API Reference](#10-api-reference)
11. [Database Schema](#11-database-schema)
12. [Configuration](#12-configuration)
13. [Build & Deployment](#13-build--deployment)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Project Overview

**FeedShop Stock Management** is a full-stack web application designed for animal feed shop owners to manage their inventory, track orders, handle supplier relationships, and monitor stock levels in real time.

### Key Features

| Feature               | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| Dashboard             | Overview of products, stock, orders, revenue, and alerts       |
| Product Management    | Add, edit, delete products with pricing, stock, and categories |
| Category Management   | Organize products into 10 pre-defined feed categories          |
| Stock Management      | Stock-in/stock-out tracking with low-stock alerts              |
| Order Management      | Create orders, track status (Pending → Processing → Shipped → Delivered) |
| Supplier Management   | Maintain supplier directory with contact and category info     |
| Search                | Global search across products, suppliers, and orders           |

---

## 2. Technology Stack

### Frontend

| Technology       | Version  | Purpose                          |
| ---------------- | -------- | -------------------------------- |
| React            | 18.2.0   | UI library                       |
| Vite             | 5.0.0    | Build tool & dev server          |
| React Router DOM | 6.20.0   | Client-side routing              |
| React Icons      | 4.12.0   | Icon library (Feather Icons)     |
| CSS (custom)     | —        | Styling (no CSS framework used)  |

### Backend

| Technology       | Version  | Purpose                          |
| ---------------- | -------- | -------------------------------- |
| Python           | 3.12+    | Runtime                          |
| Flask            | 3.0.0    | Web framework                    |
| Flask-SQLAlchemy | 3.1.1    | ORM / database management        |
| Flask-CORS       | 4.0.0    | Cross-origin request handling    |
| SQLite           | Built-in | Database (file-based)            |

---

## 3. Project Structure

```
feed-shop-stock-management/
│
├── index.html                  # HTML entry point (Vite)
├── package.json                # Node.js dependencies & scripts
├── vite.config.js              # Vite configuration (port 3000)
│
├── public/                     # Static assets
│   └── favicon.svg
│
├── src/                        # ── Frontend Source ──
│   ├── main.jsx                # App entry: BrowserRouter + AppProvider
│   ├── index.css               # Global styles, CSS variables, resets
│   ├── App.jsx                 # Layout: Navbar + Sidebar + Routes
│   ├── App.css                 # Layout styles
│   │
│   ├── context/
│   │   └── AppContext.jsx      # Global state (useReducer) + API action functions
│   │
│   ├── services/
│   │   └── api.js              # API service layer (fetch wrappers)
│   │
│   ├── data/
│   │   └── mockData.js         # Original mock data (retained for reference)
│   │
│   ├── components/             # ── Reusable Components ──
│   │   ├── Navbar.jsx/.css     # Top navigation bar with search & notifications
│   │   ├── Sidebar.jsx/.css    # Left sidebar navigation
│   │   ├── StatsCard.jsx/.css  # Dashboard stat card
│   │   ├── ProductCard.jsx/.css# Product display card with actions
│   │   ├── Modal.jsx/.css      # Modal + form components (Product, Stock, Order, Supplier)
│   │   └── Footer.jsx/.css     # Page footer
│   │
│   └── pages/                  # ── Page Components ──
│       ├── Dashboard.jsx/.css
│       ├── Products.jsx/.css
│       ├── Categories.jsx/.css
│       ├── StockManagement.jsx/.css
│       ├── Orders.jsx/.css
│       └── Suppliers.jsx/.css
│
├── backend/                    # ── Backend Source ──
│   ├── run.py                  # Entry point: seeds DB, starts Flask on port 5001
│   ├── requirements.txt        # Python dependencies
│   │
│   ├── app/
│   │   ├── __init__.py         # App factory: Flask, CORS, SQLAlchemy, blueprints
│   │   ├── models.py           # SQLAlchemy models (5 tables)
│   │   ├── seed_data.py        # Initial data seeder
│   │   │
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── products.py     # /api/products CRUD + stock operations
│   │       ├── categories.py   # /api/categories CRUD
│   │       ├── suppliers.py    # /api/suppliers CRUD
│   │       ├── orders.py       # /api/orders CRUD + status updates
│   │       └── dashboard.py    # /api/dashboard/stats
│   │
│   └── instance/
│       └── feedshop.db         # SQLite database file (auto-created)
```

---

## 4. Prerequisites

| Requirement  | Minimum Version | Check Command          |
| ------------ | --------------- | ---------------------- |
| Node.js      | 18.x            | `node --version`       |
| npm          | 9.x             | `npm --version`        |
| Python       | 3.10+           | `python --version`     |
| pip          | 22+             | `pip --version`        |

---

## 5. Installation & Setup

### Step 1: Clone / Navigate to Project

```bash
cd C:\Users\PL722TU\feed-shop-stock-management
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This installs React, Vite, React Router, and React Icons.

### Step 3: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This installs Flask, Flask-CORS, and Flask-SQLAlchemy.

---

## 6. Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
python run.py
```

- Server starts at **http://127.0.0.1:5001**
- On first run, it auto-creates the SQLite database and seeds it with sample data
- Debug mode is enabled (auto-reload on file changes)

### Start Frontend (Terminal 2)

```bash
npm run dev
```

- Dev server starts at **http://localhost:3000**
- Auto-opens in your default browser
- Hot Module Replacement (HMR) enabled

### Access the Application

Open **http://localhost:3000** in your browser. The frontend communicates with the backend API at `http://localhost:5001/api/`.

---

## 7. Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser (User)                 │
│              http://localhost:3000               │
└──────────────────────┬──────────────────────────┘
                       │  React SPA
                       │  (React Router handles pages)
┌──────────────────────▼──────────────────────────┐
│              React Frontend (Vite)              │
│  ┌─────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages  │──│ Context  │──│ API Service   │  │
│  │         │  │(Reducer) │  │ (api.js)      │  │
│  └─────────┘  └──────────┘  └───────┬───────┘  │
└──────────────────────────────────────┼──────────┘
                                       │  HTTP (fetch)
                                       │  JSON
┌──────────────────────────────────────▼──────────┐
│            Flask Backend (Python)               │
│            http://127.0.0.1:5001                │
│  ┌───────────┐  ┌────────────┐  ┌───────────┐  │
│  │  Routes   │──│  Models    │──│  SQLite   │  │
│  │(Blueprints│  │(SQLAlchemy)│  │  Database │  │
│  └───────────┘  └────────────┘  └───────────┘  │
└─────────────────────────────────────────────────┘
```

### Data Flow

1. User interacts with the React UI (pages/components)
2. Components call **action functions** from `AppContext` (e.g., `actions.fetchProducts()`)
3. Action functions call the **API service layer** (`src/services/api.js`)
4. API service sends HTTP requests to the Flask backend
5. Flask routes process the request, interact with the database via SQLAlchemy
6. JSON response flows back to the frontend, updating global state via `useReducer`

---

## 8. Frontend Details

### Routing

| Path           | Component          | Description           |
| -------------- | ------------------ | --------------------- |
| `/`            | Dashboard          | Home / overview page  |
| `/products`    | Products           | Product listing & CRUD|
| `/categories`  | Categories         | Category management   |
| `/stock`       | StockManagement    | Stock in/out tracking |
| `/orders`      | Orders             | Order management      |
| `/suppliers`   | Suppliers          | Supplier directory    |

### State Management

The app uses React's `useReducer` + `useContext` for global state. The `AppContext` provides:

- **`state`** — Global state object (`products`, `categories`, `suppliers`, `orders`, `dashboardStats`, `searchTerm`, `loading`, `error`)
- **`actions`** — Async functions that call the API and dispatch state updates

### Key Action Functions

| Action                    | Description                                |
| ------------------------- | ------------------------------------------ |
| `actions.fetchProducts()` | GET all products from API                  |
| `actions.addProduct(p)`   | POST new product                           |
| `actions.updateProduct(p)`| PUT update existing product                |
| `actions.deleteProduct(id)` | DELETE product                           |
| `actions.updateStock(data)` | PATCH stock in/out                       |
| `actions.fetchCategories()` | GET all categories                       |
| `actions.addCategory(c)`  | POST new category                         |
| `actions.deleteCategory(id)` | DELETE category                         |
| `actions.fetchSuppliers()` | GET all suppliers                         |
| `actions.addSupplier(s)`  | POST new supplier                         |
| `actions.updateSupplier(s)` | PUT update supplier                     |
| `actions.deleteSupplier(id)` | DELETE supplier                         |
| `actions.fetchOrders()`   | GET all orders                             |
| `actions.addOrder(o)`     | POST new order                             |
| `actions.updateOrderStatus(id, status)` | PATCH order status        |
| `actions.fetchDashboardStats()` | GET dashboard statistics             |
| `actions.setSearch(term)` | Set global search filter                   |

### CSS Theming

CSS custom properties are defined in `src/index.css`:

```css
--primary: #2e7d32       /* Green — primary brand color */
--primary-dark: #1b5e20  /* Dark green                  */
--primary-light: #e8f5e9 /* Light green background      */
--accent: #ff6f00        /* Orange — accent/CTAs         */
--sidebar-width: 260px   /* Sidebar width               */
```

---

## 9. Backend Details

### App Factory Pattern

`backend/app/__init__.py` uses Flask's app factory:

1. Creates Flask app instance
2. Configures SQLite database path (`backend/instance/feedshop.db`)
3. Initializes CORS (allows all origins on `/api/*`)
4. Registers 5 route blueprints under `/api/` prefix
5. Creates database tables via `db.create_all()`

### Models

| Model            | Table Name            | Key Fields                                                |
| ---------------- | --------------------- | --------------------------------------------------------- |
| Category         | `category`            | id, name, icon, color, description                        |
| Product          | `product`             | id, name, brand, category, category_id, price, mrp, stock, min_stock, unit, description |
| Supplier         | `supplier`            | id, name, contact, email, phone, address, rating, categories (M2M) |
| Order            | `order`               | id, customer, date, status, total, items (1:N)            |
| OrderItem        | `order_item`          | id, order_id, product_id, product_name, quantity, price   |

### Seed Data

On first run, `seed_data.py` populates:
- **10 categories** (Cattle Feed, Poultry Feed, Fish Feed, Pet Food, Goat & Sheep, Horse, Fodder & Hay, Supplements, Equipment, Organic)
- **28 products** across all categories
- **8 suppliers** with category associations
- **8 orders** with order items (auto-calculates totals)

---

## 10. API Reference

**Base URL:** `http://localhost:5001/api`

### Products

| Method   | Endpoint                          | Description                     | Query Params              |
| -------- | --------------------------------- | ------------------------------- | ------------------------- |
| `GET`    | `/products`                       | List all products               | `category`, `search`      |
| `GET`    | `/products/:id`                   | Get single product              | —                         |
| `POST`   | `/products`                       | Create product                  | —                         |
| `PUT`    | `/products/:id`                   | Update product                  | —                         |
| `DELETE` | `/products/:id`                   | Delete product                  | —                         |
| `PATCH`  | `/products/:id/stock`             | Stock in/out                    | —                         |

**POST/PUT Body (Product):**
```json
{
  "name": "Cattle Feed Premium",
  "brand": "Amul",
  "category": "Cattle Feed",
  "categoryId": 1,
  "price": 1200,
  "mrp": 1400,
  "stock": 100,
  "minStock": 20,
  "unit": "50 Kg",
  "description": "Premium cattle feed"
}
```

**PATCH Stock Body:**
```json
{
  "quantity": 50,
  "type": "in"    // "in" or "out"
}
```

### Categories

| Method   | Endpoint                          | Description                     |
| -------- | --------------------------------- | ------------------------------- |
| `GET`    | `/categories`                     | List all categories             |
| `GET`    | `/categories/:id`                 | Get single category             |
| `POST`   | `/categories`                     | Create category                 |
| `DELETE` | `/categories/:id`                 | Delete category (fails if has products) |

**POST Body (Category):**
```json
{
  "name": "Rabbit Feed",
  "icon": "🐰",
  "color": "#e91e63",
  "description": "Pellets and hay for rabbits"
}
```

### Suppliers

| Method   | Endpoint                          | Description                     | Query Params |
| -------- | --------------------------------- | ------------------------------- | ------------ |
| `GET`    | `/suppliers`                      | List all suppliers              | `search`     |
| `GET`    | `/suppliers/:id`                  | Get single supplier             | —            |
| `POST`   | `/suppliers`                      | Create supplier                 | —            |
| `PUT`    | `/suppliers/:id`                  | Update supplier                 | —            |
| `DELETE` | `/suppliers/:id`                  | Delete supplier                 | —            |

**POST/PUT Body (Supplier):**
```json
{
  "name": "Green Valley Farms",
  "contact": "Raj Kumar",
  "email": "raj@greenvalley.com",
  "phone": "+91 98765 43210",
  "address": "Village Road, Nashik",
  "rating": 4.5,
  "categories": ["Cattle Feed", "Fodder & Hay"]
}
```

### Orders

| Method   | Endpoint                          | Description                     | Query Params          |
| -------- | --------------------------------- | ------------------------------- | --------------------- |
| `GET`    | `/orders`                         | List all orders                 | `status`, `search`    |
| `GET`    | `/orders/:id`                     | Get single order                | —                     |
| `POST`   | `/orders`                         | Create order (auto-deducts stock) | —                   |
| `PATCH`  | `/orders/:id/status`              | Update order status             | —                     |

**POST Body (Order):**
```json
{
  "customer": "Ramesh Dairy Farm",
  "items": [
    { "productId": 1, "quantity": 5 },
    { "productId": 3, "quantity": 10 }
  ]
}
```

**PATCH Status Body:**
```json
{
  "status": "shipped"   // "pending", "processing", "shipped", "delivered"
}
```

### Dashboard

| Method   | Endpoint                          | Description                     |
| -------- | --------------------------------- | ------------------------------- |
| `GET`    | `/dashboard/stats`                | Get dashboard overview stats    |

**Response includes:** `totalProducts`, `totalStock`, `lowStockCount`, `totalOrders`, `pendingOrders`, `revenue`, `wellStocked`, `totalSuppliers`, `completedOrders`, `categoryStats[]`, `lowStockProducts[]`, `recentOrders[]`

---

## 11. Database Schema

```
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│   category   │       │     product       │       │   supplier   │
├──────────────┤       ├───────────────────┤       ├──────────────┤
│ id (PK)      │◄──┐   │ id (PK)           │       │ id (PK)      │
│ name         │   └───│ category_id (FK)  │       │ name         │
│ icon         │       │ name              │       │ contact      │
│ color        │       │ brand             │       │ email        │
│ description  │       │ category          │       │ phone        │
└──────────────┘       │ price             │       │ address      │
                       │ mrp               │       │ rating       │
                       │ stock             │       └──────┬───────┘
                       │ min_stock         │              │
                       │ unit              │              │ M2M
                       │ description       │              │
                       └───────────────────┘    ┌─────────▼─────────┐
                                                │supplier_categories│
┌──────────────┐       ┌───────────────────┐    ├───────────────────┤
│    order     │       │   order_item      │    │ supplier_id (FK)  │
├──────────────┤       ├───────────────────┤    │ category_id (FK)  │
│ id (PK)      │◄──────│ order_id (FK)     │    └───────────────────┘
│ customer     │       │ id (PK)           │
│ date         │       │ product_id        │
│ status       │       │ product_name      │
│ total        │       │ quantity          │
└──────────────┘       │ price             │
                       └───────────────────┘
```

---

## 12. Configuration

### Frontend Configuration (`vite.config.js`)

| Setting       | Value   | Description                    |
| ------------- | ------- | ------------------------------ |
| Port          | 3000    | Dev server port                |
| Open          | true    | Auto-open browser on start     |
| Plugin        | react   | @vitejs/plugin-react           |

### Backend Configuration (`app/__init__.py`)

| Setting                       | Value                                | Description              |
| ----------------------------- | ------------------------------------ | ------------------------ |
| Database URI                  | `sqlite:///backend/instance/feedshop.db` | SQLite file path     |
| SQLALCHEMY_TRACK_MODIFICATIONS| False                                | Performance setting      |
| SECRET_KEY                    | `feedshop-dev-key-change-in-prod`    | Flask secret (override in prod) |
| CORS Origins                  | `*` (all origins on `/api/*`)        | Cross-origin policy      |
| Port                          | 5001                                 | Flask server port        |
| Debug                         | True                                 | Auto-reload enabled      |

### API Base URL (`src/services/api.js`)

```javascript
const API_BASE = 'http://localhost:5001/api';
```

---

## 13. Build & Deployment

### Production Build (Frontend)

```bash
npm run build
```

Creates an optimized build in the `dist/` folder. Serve it with any static file server.

### Preview Production Build

```bash
npm run preview
```

### Production Considerations

1. **Change SECRET_KEY** — Set `SECRET_KEY` environment variable in production
2. **Disable debug mode** — Set `debug=False` in `run.py`
3. **Use a production WSGI server** — Replace `app.run()` with Gunicorn or Waitress:
   ```bash
   pip install waitress
   waitress-serve --port=5001 run:app
   ```
4. **Update CORS origins** — Restrict to your production domain instead of `*`
5. **Switch database** — For production workloads, migrate to PostgreSQL or MySQL
6. **Serve frontend via backend** — Configure Flask to serve the `dist/` folder, or use Nginx

---

## 14. Troubleshooting

| Problem                              | Solution                                                       |
| ------------------------------------ | -------------------------------------------------------------- |
| Port 5000 already in use             | The backend uses port **5001**. Port 5000 may be used by other services. |
| `npm run dev` fails                  | Run `npm install` first. Ensure Node.js 18+ is installed.      |
| Backend 404 on all routes            | Ensure you're hitting port **5001**, not 5000.                  |
| Database errors after model changes  | Delete `backend/instance/feedshop.db` and restart the server.  |
| CORS errors in browser console       | Ensure the backend is running and `API_BASE` in `api.js` matches. |
| Low stock notifications not showing  | Products are fetched on Navbar mount. Refresh the page.        |
| `ModuleNotFoundError: flask`         | Run `pip install -r requirements.txt` in the `backend/` folder.|
| Frontend shows empty data            | Ensure the backend server is running before loading the frontend.|

---

*Last updated: April 3, 2026*
