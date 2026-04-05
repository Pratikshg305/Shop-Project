# FeedShop Stock Management — Website User Manual

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Navigation Overview](#2-navigation-overview)
3. [Dashboard](#3-dashboard)
4. [Products](#4-products)
5. [Categories](#5-categories)
6. [Stock Management](#6-stock-management)
7. [Orders](#7-orders)
8. [Suppliers](#8-suppliers)
9. [Search](#9-search)
10. [Notifications](#10-notifications)

---

## 1. Getting Started

### Starting the Application

1. **Start the backend server** — Open a terminal in the `backend` folder and run:
   ```
   python run.py
   ```
   Wait until you see: `Running on http://127.0.0.1:5001`

2. **Start the frontend** — Open another terminal in the project root and run:
   ```
   npm run dev
   ```
   The application opens automatically at **http://localhost:3000**

> **Important:** Always start the backend first, then the frontend.

### First-Time Setup

No additional setup is required. The application automatically creates a database and fills it with sample data (28 products, 10 categories, 8 suppliers, 8 orders) on the first run.

---

## 2. Navigation Overview

The application has two navigation areas:

### Top Navbar
- **FeedShop Logo** — Click to return to the Dashboard
- **Search Bar** — Search across products, categories, and suppliers
- **Bell Icon (🔔)** — View low-stock alerts
- **Admin Avatar** — Displays the current user

### Left Sidebar

| Menu Item          | Icon | Description                          |
| ------------------ | ---- | ------------------------------------ |
| Dashboard          | 📊   | Overview of your entire shop         |
| Products           | 📦   | View and manage all products         |
| Categories         | 📁   | View and manage product categories   |
| Stock Management   | 🏪   | Track stock in/out movements         |
| Orders             | 🛒   | Manage customer orders               |
| Suppliers          | 🤝   | Manage supplier information          |

On mobile devices, tap the **☰ menu button** in the top-left to toggle the sidebar.

---

## 3. Dashboard

The Dashboard is the home page that gives you a complete overview of your shop.

### Stats Cards (Top Row)

| Card             | What it shows                                  |
| ---------------- | ---------------------------------------------- |
| Total Products   | Number of distinct products in your inventory  |
| Total Stock      | Combined stock units across all products       |
| Low Stock Alerts | Products at or below minimum stock level       |
| Total Orders     | Number of orders (with pending count)          |

### Feature Strip

A green strip showing key features: ✅ 100% Original Products, 📦 Real-time Stock Tracking, 📊 Smart Inventory Alerts, 🔒 Secure Management.

### Shop by Categories

- Displays all **10 categories** in a grid
- Each card shows the category **emoji icon**, **name**, **product count**, and **total stock**
- **Click any category card** to navigate to the Products page filtered by that category

### Low Stock Alerts Section

- Shows up to **6 products** that are out of stock or below minimum levels
- Each alert shows:
  - Product name and brand
  - Category
  - Current stock vs. minimum stock with a progress bar
  - Red color for out-of-stock, orange for low stock
- Click **"Manage"** to go to the Stock Management page

### Recent Orders

- Shows the **5 most recent orders**
- Displays customer name, date, item count, total amount, and status badge
- **Status colors:**
  - 🟡 Yellow = Pending
  - 🔵 Blue = Processing
  - 🟣 Purple = Shipped
  - 🟢 Green = Delivered

### Bottom Stats Row

| Stat              | Description                                      |
| ----------------- | ------------------------------------------------ |
| Total Revenue     | Sum of all delivered orders (₹)                  |
| Active Suppliers  | Number of suppliers in the system                |
| Well-Stocked      | Products with stock above minimum level          |
| Completed Orders  | Orders with "Delivered" status                   |

---

## 4. Products

### Viewing Products

- Products are displayed in a **card grid layout**
- Each product card shows:
  - Category emoji icon
  - Product name and brand
  - Discount percentage badge (calculated from MRP vs. selling price)
  - Selling price (₹) and MRP (strikethrough)
  - Pack size/unit
  - Stock level with color indicator:
    - 🟢 Green = In stock (above minimum)
    - 🟡 Orange = Low stock (at or below minimum)
    - 🔴 Red = Out of stock (0 units)

### Filtering Products

- Use the **category dropdown** at the top to filter by category
- Use the **search bar** in the navbar to search by name, brand, or category

### Adding a New Product

1. Click the **"+ Add Product"** button (top-right)
2. Fill in the form:
   - **Product Name** (required) — e.g., "Premium Cattle Feed"
   - **Brand** (required) — e.g., "Amul"
   - **Category** (required) — Select from dropdown
   - **Selling Price** (required) — Your selling price in ₹
   - **MRP** (required) — Maximum retail price in ₹
   - **Current Stock** (required) — Current quantity in inventory
   - **Minimum Stock** (required) — Alert threshold quantity
   - **Unit/Pack Size** (required) — e.g., "50 Kg", "25 Kg", "1 L"
   - **Description** — Optional product description
3. Click **"Add Product"** to save

### Editing a Product

1. Click the **pencil (✏️) icon** on any product card
2. The edit form opens pre-filled with the product's current data
3. Modify the fields you want to change
4. Click **"Update Product"** to save

### Deleting a Product

1. Click the **trash (🗑️) icon** on any product card
2. A confirmation dialog appears: *"Are you sure you want to delete this product?"*
3. Click **OK** to confirm deletion

### Quick Stock Update

1. Click the **stock (📦) icon** on any product card
2. Enter the quantity to add or remove
3. Select **"Stock In"** (add) or **"Stock Out"** (remove)
4. Click **"Update Stock"**

---

## 5. Categories

### Viewing Categories

- Categories are displayed in a **grid layout**
- Each category card shows:
  - Emoji icon and color accent
  - Category name
  - Number of products in the category
  - Total stock across all products in the category
  - Click on the category to view its products

### Adding a New Category

1. Click the **"+ Add Category"** button
2. Fill in the form:
   - **Category Name** (required) — e.g., "Rabbit Feed"
   - **Icon** (required) — An emoji like 🐰
   - **Color** (required) — A hex color code like #e91e63
   - **Description** — Short description of the category
3. Click **"Add Category"** to save

### Deleting a Category

1. Click the **delete (🗑️) icon** on the category card
2. Confirm the deletion
3. **Note:** You cannot delete a category that still has products. Remove or reassign the products first.

### Pre-loaded Categories

| Icon | Category          | Description                           |
| ---- | ----------------- | ------------------------------------- |
| 🐄   | Cattle Feed       | Complete nutrition for dairy & beef   |
| 🐔   | Poultry Feed      | Layer, broiler & chick starter feeds  |
| 🐟   | Fish Feed         | Floating & sinking fish feed pellets  |
| 🐕   | Pet Food          | Dog, cat & small animal food          |
| 🐐   | Goat & Sheep Feed | Goat feed, sheep feed & minerals      |
| 🐴   | Horse Feed        | Horse feed, oats & supplements        |
| 🌾   | Fodder & Hay      | Dry & green fodder, silage, hay bales |
| 💊   | Feed Supplements  | Vitamins, minerals & growth boosters  |
| ⚙️   | Feed Equipment    | Feed mixers, grinders & storage       |
| 🌿   | Organic Feed      | Certified organic & natural feeds     |

---

## 6. Stock Management

### Overview

The Stock Management page provides a focused view on inventory levels across all products.

### Stock Table

The page displays a **table** with columns:

| Column        | Description                              |
| ------------- | ---------------------------------------- |
| Product       | Product name and brand                   |
| Category      | Product category                         |
| Current Stock | Current inventory level                  |
| Min. Stock    | Minimum threshold for alerts             |
| Unit          | Pack size / measurement unit             |
| Status        | Visual indicator (In Stock / Low / Out)  |
| Actions       | Stock In / Stock Out buttons             |

### Updating Stock

1. Find the product in the table
2. Click **"Stock In"** to add stock or **"Stock Out"** to remove stock
3. In the modal:
   - Enter the **quantity** to add or remove
   - The operation type (In/Out) is pre-selected based on your button click
4. Click **"Update Stock"**
5. The stock level updates immediately

### Stock Status Indicators

| Status    | Color  | Condition                    |
| --------- | ------ | ---------------------------- |
| In Stock  | 🟢 Green | Stock > minimum stock level |
| Low Stock | 🟡 Orange | 0 < Stock ≤ minimum stock  |
| Out of Stock | 🔴 Red | Stock = 0                 |

### Stock Alert Behavior

When a product's stock falls to or below the minimum stock level:
- It appears in the **Low Stock Alerts** section on the Dashboard
- The **notification bell** in the navbar shows a badge count
- The product card on the Products page shows an orange/red stock indicator

---

## 7. Orders

### Viewing Orders

- Orders are displayed in a **card list layout**
- Each order card shows:
  - Order ID (e.g., #ORD-001)
  - Customer name
  - Order date
  - List of items with quantities and prices
  - Order total (₹)
  - Status badge

### Order Status Flow

Orders progress through 4 stages:

```
Pending → Processing → Shipped → Delivered
  🟡         🔵          🟣         🟢
```

### Filtering Orders

- Use the **status dropdown** to filter by: All, Pending, Processing, Shipped, Delivered
- Use the **search bar** to search by customer name

### Creating a New Order

1. Click **"+ New Order"** button
2. Fill in the form:
   - **Customer Name** (required) — e.g., "Green Valley Dairy Farm"
   - **Add Items:**
     - Select a **product** from the dropdown
     - Enter **quantity**
     - Click **"Add Item"** to add to the order
     - Repeat for additional items
   - Review the **items list** showing product name, quantity, unit price, and subtotal
   - View the **Order Total** at the bottom
3. Click **"Create Order"** to save

> **Note:** When an order is created, the product stock is automatically reduced by the ordered quantity.

### Updating Order Status

1. Find the order in the list
2. Click the **status action button** on the order card:
   - Pending orders show a **"Process"** button
   - Processing orders show a **"Ship"** button
   - Shipped orders show a **"Deliver"** button
   - Delivered orders show no action button (final state)
3. The status updates immediately

---

## 8. Suppliers

### Viewing Suppliers

- Suppliers are displayed in a **card grid layout**
- Each supplier card shows:
  - Supplier name
  - Contact person name
  - Phone number (📞)
  - Email address (✉️)
  - Address (📍)
  - Star rating (⭐)
  - Category tags (the feed categories they supply)

### Adding a New Supplier

1. Click **"+ Add Supplier"** button
2. Fill in the form:
   - **Company Name** (required) — e.g., "Green Valley Feeds Pvt. Ltd."
   - **Contact Person** (required) — e.g., "Rajesh Sharma"
   - **Email** (required) — e.g., "rajesh@greenvalley.com"
   - **Phone** (required) — e.g., "+91 98765 43210"
   - **Address** (required) — Full postal address
   - **Rating** (required) — Number from 1 to 5 (decimals allowed, e.g., 4.5)
   - **Categories** (required) — Select the feed categories this supplier handles
3. Click **"Add Supplier"** to save

### Editing a Supplier

1. Click the **edit (✏️) icon** on the supplier card
2. Modify the fields
3. Click **"Update Supplier"** to save

### Deleting a Supplier

1. Click the **delete (🗑️) icon** on the supplier card
2. Confirm the deletion in the dialog

### Pre-loaded Suppliers

| Supplier            | Categories                   | Rating |
| ------------------- | ---------------------------- | ------ |
| Godrej Agrovet      | Cattle Feed, Poultry Feed    | 4.5    |
| Cargill India       | Cattle Feed, Fish Feed       | 4.3    |
| SKM Animal Feeds    | Cattle Feed, Poultry Feed    | 4.0    |
| CP Aquaculture      | Fish Feed                    | 4.7    |
| Himalaya Animal     | Pet Food, Feed Supplements   | 4.6    |
| Purina India        | Pet Food, Horse Feed         | 4.4    |
| IB Group            | Poultry Feed, Goat & Sheep   | 4.2    |
| Pioneer Seeds       | Fodder & Hay, Organic Feed   | 4.1    |

---

## 9. Search

### How to Search

1. Click the **search bar** in the top navbar
2. Type your search query
3. Results are filtered **in real time** on the current page:
   - On **Products** page → filters by product name, brand, or category
   - On **Suppliers** page → filters by supplier name, contact, or categories
   - On **Orders** page → filters by customer name
4. Click the **✕ button** inside the search bar to clear the search

### Search Tips

- The search is **case-insensitive** ("cattle" matches "Cattle Feed")
- The search term persists across pages — clear it when switching sections
- On the Products page, you can combine search with the **category filter dropdown**

---

## 10. Notifications

### Low Stock Alert Bell

The **bell icon (🔔)** in the top-right corner of the navbar shows notifications for low-stock items.

### How It Works

1. A **red badge** with a number appears on the bell when products are at or below their minimum stock level
2. Click the **bell icon** to open the notification dropdown
3. Each notification shows:
   - Product name
   - Current stock level vs. minimum stock
   - Stock unit
4. Click the bell again to close the dropdown

### When There Are No Alerts

If all products are above their minimum stock level, clicking the bell shows:
*"All stock levels are healthy!"*

---

## Quick Reference Card

| Task                        | Steps                                              |
| --------------------------- | -------------------------------------------------- |
| Add a product               | Products → + Add Product → Fill form → Save        |
| Edit a product              | Products → ✏️ icon on card → Edit → Update         |
| Delete a product            | Products → 🗑️ icon on card → Confirm              |
| Add stock                   | Stock Management → Stock In button → Enter qty     |
| Remove stock                | Stock Management → Stock Out button → Enter qty    |
| Create an order             | Orders → + New Order → Add items → Create          |
| Update order status         | Orders → Process/Ship/Deliver button               |
| Add a supplier              | Suppliers → + Add Supplier → Fill form → Save      |
| Check low stock             | Click 🔔 bell icon, or see Dashboard alerts        |
| Search for a product        | Type in the search bar at the top                  |
| Filter by category          | Products page → Category dropdown                  |
| Filter orders by status     | Orders page → Status dropdown                      |

---

*Last updated: April 3, 2026*
