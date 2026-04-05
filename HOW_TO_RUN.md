# FeedShop Stock Management — How to Run

## Prerequisites

| Tool    | Minimum Version | Check Command      |
| ------- | --------------- | ------------------ |
| Node.js | 18.x            | `node --version`   |
| npm     | 9.x             | `npm --version`    |
| Python  | 3.10+           | `python --version` |
| pip     | 22+             | `pip --version`    |

---

## Step 1: Open the Project Folder

```bash
cd C:\Users\ADMIN\OneDrive\Desktop\CC mini project\Shop-project
```

---

## Step 2: Install Frontend Dependencies

```bash
npm install
```

---

## Step 3: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## Step 4: Start the Backend Server (Terminal 1)

```bash
cd backend
python run.py
```

Wait until you see:

```
Seeding database...
Database seeded successfully!
 * Running on http://127.0.0.1:5001
```

> The database is auto-created and seeded with sample data on the first run.

---

## Step 5: Start the Frontend Server (Terminal 2)

Open a **new terminal** and run:

```bash
cd C:\Users\ADMIN\OneDrive\Desktop\CC mini project\Shop-project
npm run dev
```

Wait until you see:

```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## Step 6: Open the Application

Open your browser and go to:

```
http://localhost:3000
```

---

## Summary

| Component | Command                | URL                         |
| --------- | ---------------------- | --------------------------- |
| Backend   | `python run.py`        | http://127.0.0.1:5001       |
| Frontend  | `npm run dev`          | http://localhost:3000        |

> **Always start the backend first, then the frontend.**

Username: Shreeram_Traders
Password: Teju@123
