# Architecture

## Project

Employee HRMS

Built for:

Odoo x Adamas University Hackathon 2026

---

# Objective

Build a production-oriented Human Resource Management System demonstrating:

- Clean Architecture
- Modular Development
- Business-Oriented Design
- Maintainable Code
- Strong Database Design
- Reusable Components

This project prioritizes engineering quality over feature quantity.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Zod
- Lucide React

## Backend

- Node.js
- Express.js
- mysql2
- JWT
- bcrypt
- Multer
- Zod

## Database

MySQL 8

---

# High-Level Architecture

Frontend (React)
        │
        ▼
Axios HTTP Client
        │
        ▼
Express REST API
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
MySQL (mysql2)
        │
        ▼
MySQL Database

---

# Project Structure

client/

server/

docs/

README.md

---

# Frontend Architecture

Pages

↓

Layouts

↓

Reusable Components

↓

Hooks

↓

Services

↓

API

Business logic should never live inside UI components.

---

# Backend Architecture

Routes

↓

Controllers

↓

Services

↓

Database Layer

Controllers handle requests.

Services contain business logic.

Database layer executes SQL queries.

---

# Design Principles

- Component Reuse
- Separation of Concerns
- Consistent UX
- Simple State Management
- Predictable Folder Structure

---

# Engineering Rules

- No duplicated business logic
- No duplicated components
- No inline styles
- No unnecessary dependencies
- Strict TypeScript
- Responsive by default

---

# Guiding Principle

Build software that feels maintainable, not rushed.
