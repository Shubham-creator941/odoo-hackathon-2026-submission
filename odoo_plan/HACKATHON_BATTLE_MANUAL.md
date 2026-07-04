Perfect. And I actually **strongly support** that decision.

One clarification though:

You wrote:

> **"we are going to use MSQ only for database."**

I assume you mean **MySQL** (not MSQ).

That is exactly what I would recommend.

---

# Final Tech Stack (Locked)

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* Zod
* Lucide React

---

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT
* Bcrypt
* Multer

---

## Database

✅ **MySQL 8**

(No PostgreSQL)

(No MongoDB)

(No Supabase)

(No Firebase)

---

This keeps the project aligned with Odoo's expectation of using a relational database while also using the database your team is most comfortable with.

---

# STEP 9 — HACKATHON BATTLE MANUAL

> **Version 1.0**
>
> This is the document everyone keeps open throughout the 8-hour hackathon.

---

# 🎯 Mission

> Build a production-quality HRMS with excellent architecture, clean code, and a polished demo—not the maximum number of features.

---

# Golden Rules

### Rule 1

Never work without pulling latest code.

```bash
git pull origin main
```

---

### Rule 2

Never push broken code.

---

### Rule 3

Never change another person's module without informing them.

---

### Rule 4

If blocked for more than **10 minutes**, ask for help.

---

### Rule 5

Done > Perfect.

---

# Team Command Center

## Shubham (Leader)

Responsibilities

* Architecture
* Business Logic
* Integration
* Git Review
* UI Review
* AI Prompt Engineering
* Final Submission

Never gets stuck coding one bug for an hour.

Instead:

* Unblock teammates
* Review code
* Merge PRs
* Keep everyone synchronized

---

## Priya

Responsibilities

* React
* UI
* UX
* Forms
* Dashboard
* Responsive Design

---

## Parth

Responsibilities

* MySQL
* Prisma
* Database
* Services
* Queries
* Business Logic

---

## Hitesh

Responsibilities

* Express
* JWT
* Middleware
* Controllers
* Validation
* API Integration

---

# Timeline

## 10:00–10:30

Infrastructure

Goal

Everyone should be able to run

```bash
npm run dev
```

Backend

Frontend

Database

---

## 10:30–11:30

Authentication

Must finish

* Login
* JWT
* Register
* Protected Routes

---

## 11:30–1:00

Core Modules

Employee

Attendance

Leave

---

## 1:00–2:00

Frontend

Dashboard

Navigation

Tables

Forms

---

## 2:00–3:00

Integration

API Connection

---

## 3:00–4:00

Payroll

Documents

Notifications

---

## 4:00–5:00

Testing

---

## 5:00–5:30

Submission

---

# Hourly Standup

Every hour

Everyone answers:

```
Done

↓

Doing

↓

Blocked
```

Maximum

5 minutes

---

# AI Usage Strategy

This is where your team will have an advantage if you stay disciplined.

## ChatGPT

Use for

* System Design
* Architecture
* Database
* Prisma
* Backend
* API Design
* Debugging
* Code Review
* Business Logic
* README
* Presentation

---

## Claude

Use for

* Refactoring
* Clean TypeScript
* React Components
* Naming
* Better Structure
* Code Simplification

---

## Gemini

Use for

* UI Ideas
* UX Improvements
* Tailwind Layouts
* Responsive Suggestions
* Alternative Solutions

---

# AI Rule

Never ask three AIs the same question.

Instead

```
ChatGPT

↓

Architecture

Claude

↓

Implementation

Gemini

↓

UI
```

One owner.

One responsibility.

---

# Git Strategy

Never

```
Everyone pushes to main
```

Instead

```
feature/auth

↓

Review

↓

Merge

↓

Pull

↓

Continue
```

---

# Merge Strategy

Before merge

```
npm run build
```

Must pass.

---

# Feature Priority

## P0 (Must Work)

Authentication

Employee

Attendance

Leave

Dashboard

MySQL

---

## P1

Payroll

Documents

Notifications

---

## P2

Charts

Animations

Advanced Search

---

# If Running Late

Immediately remove

Charts

↓

Notifications

↓

Advanced UI

↓

Animations

Never remove

Authentication

Attendance

Database

Validation

---

# Debugging Checklist

Before asking AI

Check

* Console
* Terminal
* Network Tab
* Prisma Error
* MySQL
* JWT
* Environment Variables

Then ask AI.

---

# API Testing Checklist

Every API

✔ Status Code

✔ Validation

✔ Error

✔ Success

✔ Authentication

✔ Authorization

---

# Frontend Checklist

Every page

✔ Loading

✔ Empty State

✔ Error State

✔ Responsive

✔ No Console Errors

---

# Backend Checklist

Every endpoint

✔ Zod Validation

✔ Service Layer

✔ Prisma Query

✔ Error Handling

✔ Response Format

---

# Database Checklist

Every table

✔ Primary Key

✔ Foreign Key

✔ Index

✔ Relation

✔ No Duplicate Data

✔ Nullable Only If Required

---

# Code Quality Checklist

Ask

Can another developer understand this?

If No

Refactor.

---

# Before Every Commit

Run

```
npm run build
```

If it fails

Don't commit.

---

# Before Submission

Check

* Login
* Employee CRUD
* Attendance
* Leave
* Payroll
* Dashboard
* Responsive UI
* Database
* README
* Environment Variables
* Git History

---

# README Checklist

Include

* Project Overview
* Features
* Architecture
* Tech Stack
* Folder Structure
* Installation
* Environment Variables
* Database Design
* API Overview
* Team Members
* Future Scope

---

# Presentation Order

### Shubham

Architecture

Business Logic

Database

---

### Priya

Frontend

UI

Employee Flow

---

### Parth

Database

Prisma

Queries

---

### Hitesh

Backend

Authentication

Validation

REST APIs

---

# Common Commands

Backend

```bash
npm install
npm run dev
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

Frontend

```bash
npm install
npm run dev
npm run build
```

Git

```bash
git pull
git add .
git commit -m "feat: ..."
git push
```

---

# Emergency Recovery

## Backend Broken

Rollback last commit.

---

## Frontend Broken

Revert component.

---

## Merge Conflict

Leader resolves immediately.

---

## Database Broken

Run

```bash
npx prisma migrate reset
```

(⚠️ Only during development, never after you've entered real data.)

---

# Odoo Evaluation Reminder

Every time you add a feature, ask:

* Is the database normalized?
* Is validation present?
* Is the code modular?
* Is the UI clean?
* Is the API RESTful?
* Is error handling implemented?
* Can we explain why we designed it this way?

If the answer is **yes**, you're building what Odoo asked for.

# 🏆 Final Advice

At this point, I recommend **freezing the architecture**. Do not redesign anything when the problem statement is released unless it absolutely requires it.

When the hackathon starts, the only workflow should be:

**Understand the problem → Map it to your architecture → Identify necessary changes → Start coding.**

You now have a complete engineering playbook that covers planning, architecture, implementation, teamwork, Git workflow, AI usage, and presentation. That preparation will let your team spend the 8-hour window building rather than debating technical decisions.
