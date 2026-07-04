# 🏢 Next-Gen HRMS (Human Resource Management System)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-blueviolet.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![Prisma](https://img.shields.io/badge/Prisma-ORM-black.svg)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightblue.svg)

> **Odoo Hackathon 2026 Submission**  
> A blazing-fast, robust, and modern Human Resource Management System built to streamline employee management, payroll, leave tracking, and attendance.

## 📖 Overview

The Next-Gen HRMS is a full-stack web application designed to eliminate administrative overhead for HR departments. It offers a clean, intuitive, and highly responsive user interface for both administrators and employees, backed by a powerful Node.js API and a fully typed relational database.

## ✨ Features

- **Secure Authentication:** Role-based access control (RBAC) with JWT tokens and bcrypt password hashing. Includes a unique 6-digit email verification flow.
- **Employee Dashboard:** Personalized portals where employees can view their attendance, pending leaves, and upcoming payrolls.
- **Leave Management:** End-to-end leave request system (Annual, Sick, Casual) with approval workflows.
- **Attendance Tracking:** Automated check-in/check-out logs calculating total working hours.
- **Payroll System:** Transparent tracking of basic salary, allowances, deductions, and net pay per pay period.
- **Document Vault:** Secure storage tracking for contracts, tax forms, and compliance documents with expiry tracking.
- **Real-Time Notifications:** System-wide announcements and targeted priority alerts.

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 (Bootstrapped with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (via PostCSS/Autoprefixer)
- **State Management:** React Context API
- **Routing:** React Router DOM v6
- **Networking:** Axios with global interceptors
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Database Engine:** SQLite (Pre-seeded for instant evaluation)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt (Password Hashing)

## 🏗 Architecture

The project follows a decoupled client-server architecture:

```text
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Shared reusable UI components
│   │   ├── context/        # Auth Context & Global State
│   │   ├── features/       # Feature-driven architecture (auth, dashboard)
│   │   ├── layouts/        # Page wrappers (Admin, Employee)
│   │   ├── pages/          # Route entry points
│   │   └── services/       # Axios API clients
│
└── server/                 # Express Backend
    ├── controllers/        # Request handlers & business logic
    ├── prisma/             # Database schema and SQLite file
    ├── routes/             # API endpoint definitions
    ├── services/           # Database interactions (Prisma queries)
    └── seed.js             # Initial database population script
```

## 🚀 Installation & Setup

Because this project uses SQLite, **no external database installation is required**. The database is included and pre-seeded so you can evaluate the project instantly.

### 1. Clone the Repository
```bash
git clone https://github.com/Shubham-creator941/odoo-hackathon-2026-submission.git
cd odoo-hackathon-2026-submission
```

### 2. Start the Backend Server
```bash
cd server
npm install
npm start
```
*The backend will run on `http://localhost:5005`*

### 3. Start the Frontend Application
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`*

### 4. Test Credentials
Use the following pre-seeded accounts to explore the portals:
- **Admin:** `admin@example.com` / `password123`
- **Employee:** `jane.smith@example.com` / `password123`

## 🗄 Database

The application utilizes **SQLite** paired with **Prisma ORM**. The schema consists of six core relational models:
1. `User`: Core authentication and profile data.
2. `Attendance`: Time-tracking logs linked to Users.
3. `Leave`: Time-off requests and manager approvals.
4. `Payroll`: Financial records per pay period.
5. `Document`: Important employee files and expiry dates.
6. `Notification`: System alerts.

*(To view the raw schema, inspect `server/prisma/schema.prisma`)*

## 🔌 API Documentation

All endpoints are prefixed with `/api` and run on port `5005`.

### Authentication Endpoints
- `POST /api/users/register` - Create a new user account.
- `POST /api/users/verify` - Verify account via 6-digit code.
- `POST /api/users/login` - Authenticate and receive JWT token.

### Data Endpoints (GET)
- `/api/data/employees` - List all employees.
- `/api/data/employees/:email` - Get a specific employee's profile.
- `/api/data/attendance/:userId` - Get attendance records.
- `/api/data/leaves/:userId` - Get leave history.
- `/api/data/payroll/:userId` - Get payroll slips.
- `/api/data/documents/:userId` - Get uploaded documents.
- `/api/data/notifications/:userId` - Get user notifications.

## 🔮 Future Improvements

While this MVP is robust, our roadmap for the future includes:
- **Odoo ERP Integration:** Bi-directional syncing with Odoo's native HR modules.
- **Dockerization:** Containerizing the client and server for scalable deployments.
- **Cloud Database:** Migrating from SQLite to PostgreSQL hosted on AWS/GCP for production scale.
- **File Uploads:** Implementing AWS S3 or Cloudinary for actual document physical storage.
- **AI Analytics:** Integrating predictive AI to forecast employee churn and automate payroll tax calculations.

## 📜 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute this software as per the terms of the license.

---
*Built with ❤️ for the Odoo Hackathon 2026*
