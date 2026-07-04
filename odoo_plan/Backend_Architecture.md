Perfect. Now we're entering the **implementation blueprint**. Up to this point we've designed the system; from here onward, every artifact should directly help your team write code.

---

# Step 4: Backend Architecture & Folder Structure (Production Ready)

This is another area where Odoo reviewers often judge code quality. We want a **layered architecture**, not everything inside routes.

## Architecture

```text
                React Frontend
                       │
                  Axios Request
                       │
                Express Routes
                       │
                 Zod Validation
                       │
              Authentication Middleware
                       │
                 Authorization Middleware
                       │
                  Controller Layer
                       │
                   Service Layer
                       │
                Prisma Repository
                       │
                    MySQL Database
```

---

# Backend Folder Structure

```text
server/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│
│   ├── config/
│   │   ├── db.ts
│   │   ├── env.ts
│   │   └── logger.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── employee.controller.ts
│   │   ├── attendance.controller.ts
│   │   ├── leave.controller.ts
│   │   ├── payroll.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── notification.controller.ts
│   │   └── document.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── employee.service.ts
│   │   ├── attendance.service.ts
│   │   ├── leave.service.ts
│   │   ├── payroll.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── notification.service.ts
│   │   └── document.service.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── employee.routes.ts
│   │   ├── attendance.routes.ts
│   │   ├── leave.routes.ts
│   │   ├── payroll.routes.ts
│   │   ├── dashboard.routes.ts
│   │   ├── notification.routes.ts
│   │   ├── document.routes.ts
│   │   └── index.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── notFound.middleware.ts
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── employee.validator.ts
│   │   ├── attendance.validator.ts
│   │   ├── leave.validator.ts
│   │   └── payroll.validator.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   ├── response.ts
│   │   ├── pagination.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   └── express.d.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── tsconfig.json
```

---

# Layer Responsibilities

## Routes

Only define endpoints.

```text
POST /login

↓

authController.login
```

No business logic.

---

## Controllers

Receive request.

Call service.

Return response.

Example

```typescript
login(req, res)

↓

authService.login()

↓

return successResponse()
```

---

## Services

This is where **all business logic lives**.

Example

```text
Check employee exists

↓

Compare password

↓

Generate JWT

↓

Create Activity Log

↓

Return User
```

---

## Prisma

Only database operations.

Example

```typescript
prisma.user.findUnique()
```

Nothing else.

---

# Middleware Order

```text
Incoming Request

↓

JWT Authentication

↓

Role Authorization

↓

Zod Validation

↓

Controller

↓

Service

↓

Prisma

↓

Response
```

---

# Global Error Handling

Every error should return a consistent format.

```json
{
  "success": false,
  "message": "Employee not found",
  "errors": []
}
```

No raw Prisma errors should reach the frontend.

---

# Authentication Flow

```text
Register

↓

Hash Password

↓

Save User

↓

Login

↓

Compare Password

↓

Generate JWT

↓

Store Role

↓

Protected Routes
```

---

# Authorization

Two roles only:

```text
ADMIN

EMPLOYEE
```

Example

```text
Admin

✔ Manage Employees

✔ Approve Leave

✔ Payroll

--------------------

Employee

✔ Attendance

✔ Leave

✔ Profile

✔ View Payroll
```

---

# Environment Variables

```env
PORT=5000

DATABASE_URL=mysql://root:password@localhost:3306/hrms

JWT_SECRET=your-secret-key

JWT_EXPIRES_IN=1d

NODE_ENV=development
```

Never hardcode these values.

---

# API Standards

All endpoints should:

* Validate request with Zod.
* Return the standard response format.
* Use appropriate HTTP status codes.
* Log important actions (login, leave approval, payroll update).

---

# Team Allocation

Based on your team's strengths:

### Hitesh

* Express setup
* Routes
* Middleware
* Authentication
* Error handling

### Parth

* Prisma schema
* Migrations
* Services
* Database queries
* Seed data

### Shubham

* Architecture review
* API contract
* Integration
* Code quality
* Git merges

### Priya

* Frontend integration
* API consumption
* Loading/error states
* UI consistency

---

# Deliverables After This Step

By the end of this phase, your backend should have:

* Clean folder structure.
* Prisma schema.
* MySQL connection.
* Authentication middleware.
* Validation framework.
* Standard response utility.
* Empty controllers, services, and routes ready for implementation.

---

# 🚀 Next Step (Highly Recommended)

Now that the backend architecture is fixed, the next logical step is:

## **Step 5 – Frontend Architecture & Folder Structure**

We'll design a React structure that matches the backend, including:

* Feature-based organization.
* Reusable UI components.
* Layouts (Admin vs Employee).
* Protected routes.
* API service layer.
* Context/Auth management.
* Page structure.
* Component hierarchy.

Once both backend and frontend architectures are finalized, your team can start coding in parallel with minimal integration issues. This is exactly how professional teams reduce bottlenecks during time-constrained projects.
