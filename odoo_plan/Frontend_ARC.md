Excellent. This is exactly where **good architecture saves hours** during an 8-hour hackathon.

Most teams organize React by file type (`components`, `pages`, etc.). That works for small apps, but once the project grows, it becomes hard to maintain.

For this HRMS, I recommend a **Feature + Shared Architecture**. It's scalable, clean, and makes parallel development easy.

---

# Step 5 – Frontend Architecture & Folder Structure

## Tech Stack

```text
React 19
TypeScript
Vite
Tailwind CSS
React Router DOM
Axios
React Hook Form
Zod
Lucide React
Context API
```

---

# Frontend Architecture

```text
Browser

↓

React Router

↓

Layout

↓

Page

↓

Feature Component

↓

API Service

↓

Express API

↓

MySQL
```

---

# Recommended Folder Structure

```text
client/
│
├── public/
│
├── src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Badge.tsx
│   │   ├── Loader.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   └── ui/
│       ├── Avatar.tsx
│       ├── StatusChip.tsx
│       ├── SearchBar.tsx
│       └── ConfirmDialog.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types.ts
│   │
│   ├── dashboard/
│   ├── employee/
│   ├── attendance/
│   ├── leave/
│   ├── payroll/
│   ├── document/
│   └── notification/
│
├── layouts/
│   ├── AdminLayout.tsx
│   ├── EmployeeLayout.tsx
│   └── AuthLayout.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── NotFound.tsx
│   └── Unauthorized.tsx
│
├── routes/
│   ├── AppRoutes.tsx
│   ├── AdminRoutes.tsx
│   └── EmployeeRoutes.tsx
│
├── context/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── services/
│   ├── api.ts
│   ├── axios.ts
│   └── storage.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── usePagination.ts
│   └── useDebounce.ts
│
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   ├── validators.ts
│   └── formatters.ts
│
├── types/
│   ├── api.ts
│   ├── auth.ts
│   └── employee.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Layout Architecture

```text
                App
                 │
          React Router
                 │
      ┌──────────┴──────────┐
      │                     │
 AuthLayout          ProtectedRoute
                            │
               ┌────────────┴────────────┐
               │                         │
        AdminLayout              EmployeeLayout
```

---

# Admin Pages

```text
Dashboard

Employees

Attendance

Leave Requests

Payroll

Documents

Notifications

Profile
```

---

# Employee Pages

```text
Dashboard

My Profile

Attendance

Apply Leave

Leave History

Payroll

Documents

Notifications
```

---

# Shared Components

Build these once and reuse everywhere.

```text
Button

Input

Textarea

Select

Modal

Card

Table

Badge

Avatar

Loader

Pagination

SearchBar

ConfirmDialog
```

These components should never contain business logic.

---

# Feature Structure Example

### Attendance

```text
attendance/

components/
│
├── AttendanceTable.tsx

├── CheckInCard.tsx

├── CheckOutCard.tsx

├── AttendanceCalendar.tsx

pages/

AttendancePage.tsx

services/

attendance.api.ts

hooks/

useAttendance.ts

types.ts
```

Every feature follows the same structure.

---

# Routing Strategy

```text
/

↓

Login

↓

ProtectedRoute

↓

Role Check

↓

AdminLayout
or
EmployeeLayout
```

Example

```text
/admin/dashboard

/admin/employees

/admin/payroll

------------------

/employee/dashboard

/employee/profile

/employee/attendance

/employee/leave
```

---

# Authentication Flow

```text
Login

↓

Receive JWT

↓

Store Token

↓

Fetch Current User

↓

Save User in Context

↓

Redirect Based on Role
```

---

# Context API

Keep Context lightweight.

```text
AuthContext

User

Role

Login

Logout

Loading
```

Do **not** store attendance, payroll, or leave data in Context. Fetch those through feature services.

---

# Axios Setup

Create one Axios instance.

```text
axios.ts

↓

Base URL

↓

Authorization Header

↓

Response Interceptor

↓

Error Interceptor
```

All API calls use this instance.

---

# UI Design System

## Colors

| Purpose    | Tailwind  |
| ---------- | --------- |
| Primary    | blue-600  |
| Success    | green-600 |
| Warning    | amber-500 |
| Danger     | red-600   |
| Background | gray-50   |
| Card       | white     |
| Text       | gray-800  |

Avoid mixing many colors.

---

# Typography

```text
Dashboard Title

↓

Section Title

↓

Card Title

↓

Normal Text

↓

Small Labels
```

Use a consistent hierarchy throughout.

---

# Responsive Breakpoints

```text
Mobile

↓

Tablet

↓

Laptop

↓

Desktop
```

Use Tailwind's default breakpoints.

---

# Loading States

Every page should handle:

* Loading
* Empty
* Error
* Success

Example:

```text
Loading...

↓

Data Available

↓

OR

No Data Found

↓

OR

Something Went Wrong
```

---

# Suggested Development Order

### Priya

* Login
* Dashboard UI
* Shared Components
* Employee Pages
* Responsive Design

### Shubham

* Layouts
* Routing
* Integration
* UI Review
* Navigation
* API Integration Support

---

# Final Frontend Checklist

* Reusable components
* Consistent spacing
* Responsive layouts
* Protected routes
* Centralized Axios
* Feature-based organization
* Loading/error/empty states
* Form validation
* Clean navigation

---

# 🎯 Odoo Bonus Points

To make the frontend stand out without adding unnecessary complexity:

* Use a **single design language** (consistent cards, buttons, badges, spacing).
* Add **search and filter** on employee and leave tables.
* Show **status badges** (`Pending`, `Approved`, `Rejected`, `Present`, `Absent`) with consistent colors.
* Display **toast notifications** for successful or failed actions.
* Use **confirmation dialogs** before destructive actions (e.g., deleting a document).

---

# 🚀 Step 5 Complete

At this stage, your architecture is fully defined:

* ✅ Business Analysis
* ✅ Database Design (MySQL)
* ✅ Prisma Schema
* ✅ Backend Architecture
* ✅ Frontend Architecture

## Next Step (Step 6)

Now we move to what will save the most coding time during the hackathon:

### **Authentication & Authorization Blueprint**

We'll design:

* JWT authentication flow
* Login/register implementation plan
* Role-based access control (Admin vs Employee)
* Protected backend routes
* Protected frontend routes
* Token storage strategy
* Security best practices

This will let Hitesh and Parth implement authentication confidently while Priya and you continue building the UI in parallel.
