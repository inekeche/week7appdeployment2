# 📦 Project Inventory Management System

A **full-featured Inventory & Stock Management System** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) to manage items, suppliers, purchase and sales orders, and inventory reports.  

This project supports **full-stack deployment** on **Render** with **CI/CD automation** via GitHub Actions.

---

## 🚀 Features

- **Inventory Management**
  - Add, edit, delete, and view items.
  - Track current stock and low-stock alerts.
  
- **Supplier & Order Management**
  - Add suppliers and manage purchase/sales orders.
  - Update order statuses and track pending/fulfilled orders.
  
- **Reports & Analytics**
  - View current stock reports.
  - Export reports to **PDF/CSV**.
  - Sales vs Purchase charts.

- **Authentication & Authorization**
  - User login and role-based access (Admin/User).

- **CI/CD Automation**
  - GitHub Actions for testing, linting, and building.
  - Auto-deployment to **Render (Staging & Production)**.
  - Rollback-ready using Render Deploy Hooks.

---

## 🗂️ Project Structure

project-inventory-management/
│
├── backend/ # Node.js + Express + MongoDB API
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/ # React.js (TailwindCSS / Material UI optional)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── .github/workflows/ # GitHub Actions CI/CD workflows
│ ├── ci.yml
│ └── cd.yml
│
├── README.md
└── package.json


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/project-inventory-management.git
cd project-inventory-management
2️⃣ Backend Setup

cd backend
npm install
cp .env.example .env  # Add your MongoDB URI, JWT secret, etc.
npm run dev           # Start backend on http://localhost:5000
3️⃣ Frontend Setup

cd ../frontend
npm install
npm start             # Start React frontend on http://localhost:3000
4️⃣ Run Full Stack with Concurrently (Optional)
In the project root, install concurrently:


npm install concurrently
Add this to the root package.json:


"scripts": {
  "start": "concurrently \"npm run dev --prefix backend\" \"npm start --prefix frontend\""
}
Then run:


npm start
🔄 CI/CD Pipeline Setup
This project is configured with GitHub Actions for automated:

Linting & Testing (via ci.yml)

Staging & Production Deployments (via cd.yml)

Rollback-ready using Render Deploy Hooks

GitHub Secrets Needed
Secret Name	Value
RENDER_DEPLOY_HOOK_PROD	Production Deploy Hook URL from Render
RENDER_DEPLOY_HOOK_STAGING	Staging Deploy Hook URL from Render

🌐 Deployment
Platform: Render
Backend: Node.js service with MongoDB Atlas

Frontend: Static React site

Auto-deploy: Connected to GitHub main/staging branches

Branch → Environment Mapping:

staging → Staging Render Service

main → Production Render Service

Rollback:

Use Render Dashboard → Deploys Tab → Rollback to revert to a previous build.

🛠️ Tech Stack
Frontend: React, Axios, TailwindCSS / Material UI

Backend: Node.js, Express.js, JWT Auth

Database: MongoDB Atlas

Deployment: Render (Staging + Production)

CI/CD: GitHub Actions

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Felix Ineke

GitHub: @inekeche
