Excellent. This is **one of the highest-scoring sections** because it demonstrates backend maturity.

For an **8-hour hackathon**, we should build authentication that is:

* ✅ Secure
* ✅ Simple
* ✅ Easy to implement
* ✅ Production-like
* ✅ Easy to explain to Odoo reviewers

We should **avoid** unnecessary complexity like Refresh Tokens, OAuth, OTP, or Redis.

---

# Step 6 – Authentication & Authorization Blueprint

---

# Authentication Architecture

```text
                    USER
                     │
                     ▼
              Login/Register
                     │
                     ▼
              Zod Validation
                     │
                     ▼
             Auth Controller
                     │
                     ▼
              Auth Service
                     │
      ┌──────────────┴──────────────┐
      │                             │
 Hash Password               Verify Password
      │                             │
      ▼                             ▼
     MySQL <──────── Prisma ────────┘
                     │
                     ▼
               Generate JWT
                     │
                     ▼
             Return Token + User
                     │
                     ▼
          React Stores JWT
                     │
                     ▼
        Protected API Requests
```

---

# Authentication Flow

## Registration

```text
User fills form
        │
        ▼
Frontend Validation
        │
        ▼
POST /api/v1/auth/register
        │
        ▼
Backend Validation
        │
        ▼
Check Duplicate Email
        │
        ▼
Hash Password (bcrypt)
        │
        ▼
Create User
        │
        ▼
Create Employee Profile
        │
        ▼
Return Success
```

---

## Login

```text
Email + Password
        │
        ▼
Validate Request
        │
        ▼
Find User
        │
        ▼
Compare Password
        │
        ▼
Generate JWT
        │
        ▼
Return Token
        │
        ▼
Store Token
```

---

# JWT Payload

Keep it small.

```json
{
  "userId": "abc123",
  "role": "ADMIN",
  "employeeCode": "EMP001"
}
```

Never store:

* Password
* Salary
* Phone
* Address
* Department

---

# Token Storage

For the hackathon:

**Use Local Storage**

```text
localStorage

↓

token

↓

Authorization Header
```

Production applications often use HttpOnly cookies, but Local Storage keeps implementation simpler during the hackathon.

---

# Password Security

Use **bcrypt**.

```text
Password

↓

bcrypt.hash()

↓

Database
```

Login

```text
Password

↓

bcrypt.compare()

↓

Success
```

Never store plain-text passwords.

---

# Authorization

Only two roles.

```text
ADMIN

EMPLOYEE
```

---

## Admin Permissions

```text
Manage Employees

Approve Leave

Manage Payroll

View All Attendance

Dashboard Analytics

Manage Documents
```

---

## Employee Permissions

```text
View Dashboard

Edit Own Profile

Attendance

Apply Leave

View Payroll

Upload Documents

View Notifications
```

---

# Middleware Flow

```text
Incoming Request
        │
        ▼
JWT Middleware
        │
        ▼
Role Middleware
        │
        ▼
Validation Middleware
        │
        ▼
Controller
```

---

# JWT Middleware

Responsibilities

* Read Authorization header
* Verify JWT
* Extract payload
* Attach user to request
* Continue

Example

```text
Authorization

Bearer eyJhbGci...
```

Request object after middleware

```typescript
req.user = {
    id,
    role,
    employeeCode
}
```

---

# Role Middleware

Example

```typescript
authorize(["ADMIN"])
```

or

```typescript
authorize(["ADMIN", "EMPLOYEE"])
```

This avoids repeating role checks inside controllers.

---

# Protected Routes

## Public

```text
POST /auth/register

POST /auth/login
```

---

## Employee

```text
GET /profile

PUT /profile

POST /attendance/check-in

POST /attendance/check-out

POST /leave

GET /payroll/me
```

---

## Admin

```text
GET /employees

POST /employees

PUT /employees/:id

DELETE /employees/:id

PATCH /leave/:id/approve

PATCH /leave/:id/reject

PUT /payroll/:id
```

---

# React Authentication Flow

```text
App Loads
      │
      ▼
Token Exists?
      │
 ┌────┴────┐
 │         │
No        Yes
 │         │
 ▼         ▼
Login   Fetch Current User
              │
              ▼
        Store User in Context
              │
              ▼
       Redirect by Role
```

---

# Route Protection

```text
ProtectedRoute

↓

Authenticated?

↓

Role Allowed?

↓

Render Layout

↓

Render Page
```

---

# Context API

Store only authentication state.

```typescript
AuthContext

↓

User

Token

Role

Login()

Logout()

Loading
```

Do **not** store attendance, payroll, or leave requests in Context.

---

# Logout

```text
Remove Token

↓

Clear Context

↓

Redirect Login
```

---

# Standard Error Responses

## Invalid Credentials

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

## Unauthorized

```json
{
    "success": false,
    "message": "Authentication required"
}
```

---

## Forbidden

```json
{
    "success": false,
    "message": "Access denied"
}
```

---

# Input Validation (Zod)

## Register

Validate:

* Employee Code
* Email
* Password
* Confirm Password
* Role

---

## Login

Validate:

* Email
* Password

---

# Security Checklist

* Password hashed with bcrypt
* JWT secret stored in `.env`
* Password never returned in API response
* Protected routes require JWT
* Role middleware for authorization
* Zod validation on every auth endpoint
* Consistent error responses
* Activity log created for login/logout (optional but impressive)

---

# Authentication Folder Structure

```text
src/
│
├── controllers/
│   └── auth.controller.ts
│
├── services/
│   └── auth.service.ts
│
├── routes/
│   └── auth.routes.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── role.middleware.ts
│
├── validators/
│   └── auth.validator.ts
│
├── utils/
│   ├── jwt.ts
│   └── bcrypt.ts
```

---

# Team Implementation Plan

### Hitesh

* JWT authentication
* Middleware
* Protected routes
* Error handling

### Parth

* Prisma queries
* User creation
* Password hashing
* Employee profile creation

### Shubham

* Review auth flow
* API contract validation
* Integration with frontend
* Git reviews

### Priya

* Login/Register UI
* Form validation
* AuthContext
* Protected routes
* Redirects

---

# Odoo Reviewer Talking Point

If a reviewer asks, *"Why did you choose JWT with Local Storage?"*, your answer should be:

> "For the hackathon, we prioritized a secure and maintainable implementation that could be completed within the time limit. We use bcrypt for password hashing, JWT for stateless authentication, and role-based middleware for authorization. In a production deployment, we would migrate token storage to HttpOnly secure cookies to mitigate XSS risks."

That answer demonstrates you understand both the practical constraints of a hackathon and production security considerations.

---

# ✅ Step 6 Complete

At this point, your architecture is essentially complete:

* ✅ Business Analysis
* ✅ Database Design
* ✅ Prisma Schema
* ✅ Backend Architecture
* ✅ Frontend Architecture
* ✅ Authentication & Authorization Blueprint

## 🚀 Step 7 (What I recommend next)

Now we should prepare the **Implementation Roadmap**.

This is not about writing code yet—it's about defining **the exact coding order** for all four team members so that everyone can work in parallel with minimal merge conflicts. This roadmap will break the project into 30–60 minute milestones, assign ownership, identify dependencies, and maximize your chances of finishing a polished, integrated solution within the 8-hour hackathon. This is one of the biggest advantages you can have over teams that simply start coding without a coordinated plan.
