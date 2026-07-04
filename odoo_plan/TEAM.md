# 1. Business Problem

The organization currently manages core HR operations manually or through fragmented systems, leading to inefficiencies, inconsistent employee records, delays in approvals, and limited visibility into attendance, leave, and payroll. The objective is to build a centralized **Human Resource Management System (HRMS)** that digitizes employee lifecycle management while supporting secure authentication, role-based access, attendance tracking, leave workflows, profile management, and payroll visibility. 

---

# 2. Target Users

## Primary Users

### Employee

* Register and log in
* Manage personal profile
* Check attendance
* Apply for leave
* View payroll (read-only)
* Track leave status

### Admin / HR Officer

* Manage employees
* View all attendance
* Approve/reject leave
* Manage payroll
* Edit employee information
* Monitor organization-wide HR activities 

---

# 3. Functional Requirements

## Authentication

* Employee registration
* Secure login
* Email verification
* Password validation
* Role-based authentication

---

## Employee Profile

* View profile
* Edit limited personal fields
* Upload/update profile picture
* View documents
* View salary structure

---

## Admin Profile Management

* Edit all employee details
* Manage employee information

---

## Attendance

* Check-in
* Check-out
* Daily attendance
* Weekly attendance
* Attendance status

  * Present
  * Absent
  * Half Day
  * Leave

---

## Leave Management

* Apply leave
* Calendar selection
* Leave type
* Remarks
* View leave history
* Track approval status

---

## Leave Approval

* HR/Admin views requests
* Approve
* Reject
* Add comments

---

## Payroll

Employee

* View salary

Admin

* Update salary structure
* View payroll
* Manage payroll records

---

## Dashboard

Employee Dashboard

* Profile
* Attendance
* Leave
* Recent activity

Admin Dashboard

* Employee list
* Attendance
* Leave approvals
* Employee switching 

---

# 4. Non Functional Requirements

Although not explicitly listed, the document strongly implies:

### Security

* Secure authentication
* Password policy
* Email verification
* Role-based authorization

### Performance

* Fast dashboard loading
* Immediate leave approval updates

### Reliability

* Accurate attendance
* Payroll consistency

### Scalability

* Support multiple employees
* Modular HR modules

### Maintainability

* Clear separation between Employee and Admin

### Usability

* Interactive dashboard
* Calendar-based leave application
* Clean navigation

### Data Integrity

* Consistent attendance records
* Accurate payroll
* Controlled profile updates

---

# 5. Hidden Requirements

These are **not explicitly written**, but are essential for a production-quality HRMS and likely to impress Odoo.

## Audit Trail

Track:

* Who approved leave
* When approval happened
* Who modified employee details

---

## Employee Status

Need statuses such as

* Active
* Inactive
* Resigned
* On Leave

---

## Leave Balance

Maintain remaining:

* Paid Leave
* Sick Leave
* Unpaid Leave

---

## Attendance Validation

Prevent

* Double Check-In
* Double Check-Out
* Check-Out before Check-In

---

## Payroll Versioning

Keep salary history instead of overwriting records.

---

## File Management

Employee documents

* Resume
* ID Proof
* Certificates

---

## Role Permissions

Future-ready RBAC instead of simple Admin/Employee if time permits.

---

## Dashboard Statistics

Admin should quickly see

* Total Employees
* Present Today
* Employees on Leave
* Pending Leave Requests

---

# 6. Possible Edge Cases

## Authentication

* Duplicate email
* Duplicate employee ID
* Invalid email
* Weak password
* Wrong credentials
* Unverified email

---

## Attendance

* Double check-in
* Check-out without check-in
* Future attendance
* Weekend attendance
* Timezone differences (if relevant)

---

## Leave

* End date before start date
* Leave overlaps existing leave
* Leave exceeds balance
* HR approving an already approved request
* Employee applying during approved leave

---

## Payroll

* Negative salary
* Invalid salary update
* Missing salary structure

---

## Profile

* Invalid phone number
* Unsupported profile picture
* Missing required fields

---

# 7. Database Entities

This is the most important section for Odoo.

## User

* id
* employeeId
* email
* password
* role
* isVerified
* status

---

## EmployeeProfile

* id
* userId
* name
* phone
* address
* designation
* department
* joiningDate
* profileImage

---

## Attendance

* id
* employeeId
* date
* checkIn
* checkOut
* status

---

## LeaveRequest

* id
* employeeId
* leaveType
* startDate
* endDate
* remarks
* status
* adminComment

---

## Payroll

* id
* employeeId
* basicSalary
* allowances
* deductions
* netSalary
* effectiveDate

---

## Document

* id
* employeeId
* documentType
* filePath

---

## ActivityLog *(Recommended)*

* id
* userId
* action
* timestamp

---

## Notification *(Recommended)*

* id
* userId
* title
* message
* isRead

---

# 8. Relationships

```text
User
 │
 └────────── 1 : 1
             │
     EmployeeProfile
             │
             │
     ├───────────────┐
     │               │
     │               │
     ▼               ▼

Attendance      LeaveRequest
     │               │
     └──────┐   ┌────┘
            ▼   ▼

          Payroll

EmployeeProfile
      │
      ▼

Document

User
 │
 ▼

ActivityLog

User
 │
 ▼

Notification
```

Relationship Summary

* User → EmployeeProfile (1:1)
* Employee → Attendance (1:N)
* Employee → LeaveRequest (1:N)
* Employee → Payroll (1:N for salary history; 1:1 if only current salary)
* Employee → Documents (1:N)
* User → ActivityLog (1:N)
* User → Notification (1:N)

---

# 9. Suggested Tech Architecture

## Frontend

* React + TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

---

## Backend

* Express.js
* Node.js
* Zod Validation
* JWT Authentication
* Middleware
* REST APIs

---

## Database

* PostgreSQL
* Prisma ORM

---

## Folder Architecture

```text
client/

server/

docs/

README.md
```

Server

```text
config/

controllers/

middlewares/

routes/

services/

validators/

prisma/

utils/
```

Client

```text
components/

pages/

services/

layouts/

hooks/

types/

context/
```

---

# 10. Feature Priority

## ⭐⭐⭐ Must Have

* Authentication
* Role-based Login
* Employee Dashboard
* Admin Dashboard
* Employee CRUD/Profile
* Attendance
* Check-in/Check-out
* Leave Request
* Leave Approval
* Payroll View
* PostgreSQL Database
* Validation
* Responsive UI

---

## ⭐⭐ Should Have

* Dashboard Statistics
* Search Employee
* Filter Leave Requests
* Attendance Calendar
* Notifications
* Activity Logs
* Pagination

---

## ⭐ Nice To Have

* Employee Document Upload
* Charts
* Dark Mode
* Email Notifications
* Profile Completion Indicator
* Export Attendance (CSV/PDF)

---

# 11. Risks

## Technical

* Poor database normalization
* Incorrect relationships
* Weak validation
* Authentication bugs
* Time spent on unnecessary UI polish

---

## Time

* Overbuilding features
* Delayed integration
* Merge conflicts

---

## Evaluation

* Static/mock data instead of PostgreSQL
* Missing input validation
* Weak Git history
* Monolithic code
* Poor documentation

---

# 12. Odoo Evaluation Opportunities

This problem statement aligns very well with Odoo's strengths. To maximize your score:

### ⭐ Database Design (Highest Priority)

* Normalize tables.
* Use proper foreign keys and constraints.
* Model relationships cleanly.
* Consider salary history and activity logs if time permits.

### ⭐ Backend Architecture

* Separate routes, controllers, services, and validation.
* Use consistent API responses.
* Implement robust role-based authorization.

### ⭐ Input Validation

* Validate all forms with clear error messages.
* Prevent invalid attendance and leave actions.

### ⭐ Git Collaboration

* Ensure all four members contribute meaningful commits.
* Use feature branches and pull requests.

### ⭐ Clean UI

* Consistent design system.
* Responsive layout.
* Loading, empty, and error states.

### ⭐ Business Logic

* Enforce leave approval workflow.
* Restrict profile editing based on role.
* Keep payroll read-only for employees.
* Ensure attendance rules (e.g., no double check-in).

### ⭐ Documentation

* Include a clear README with setup instructions.
* Add an ER diagram and API documentation.
* Document architecture decisions.

## **Architect's Assessment**

This is an excellent problem statement for your team. It emphasizes exactly what Odoo said they value: **database design, backend logic, validation, modular architecture, and business workflows**, rather than flashy features. If you execute the core modules cleanly—with a strong relational schema, RESTful APIs, proper validation, and disciplined Git collaboration—you'll be aligning closely with the evaluation criteria and significantly strengthen your chances of qualifying for the offline round.
