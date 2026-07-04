You're absolutely right. 👍

That was **my mistake in sequencing**.

The correct execution order should be:

```
✅ Step 1
Business Analysis

↓

✅ Step 2
Production Database Design (Completed)

↓

✅ Step 3  ← NOW
Prisma Schema

↓

Step 4
REST API Design

↓

Step 5
Backend Folder Structure

↓

Step 6
Frontend Folder Structure

↓

Step 7
Authentication

↓

Step 8
Implementation
```

The **Prisma Schema must come before API Design**, because the APIs are built around the Prisma models.

So let's build what I would actually use in the hackathon.

---

# Production Prisma Schema (MySQL + Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

//
// ENUMS
//

enum UserRole {
  ADMIN
  EMPLOYEE
}

enum UserStatus {
  ACTIVE
  INACTIVE
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  HALF_DAY
  LEAVE
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
}

//
// USERS
//

model User {
  id             String   @id @default(cuid())
  employeeCode   String   @unique
  email          String   @unique
  passwordHash   String
  role           UserRole
  isVerified     Boolean  @default(false)
  status         UserStatus @default(ACTIVE)

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  profile         EmployeeProfile?
  notifications   Notification[]
  activityLogs    ActivityLog[]

  @@index([email])
  @@index([employeeCode])
}

//
// MASTER TABLES
//

model Department {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?

  employees   EmployeeProfile[]
  designations Designation[]

  createdAt DateTime @default(now())
}

model Designation {
  id            String   @id @default(cuid())
  title         String

  departmentId  String
  department    Department @relation(fields: [departmentId], references: [id])

  employees EmployeeProfile[]

  createdAt DateTime @default(now())

  @@index([departmentId])
}

model LeaveType {
  id          String   @id @default(cuid())
  name        String   @unique
  maxDays     Int
  isPaid      Boolean

  leaveRequests LeaveRequest[]
}

//
// EMPLOYEE PROFILE
//

model EmployeeProfile {

  id              String @id @default(cuid())

  userId          String @unique
  user            User @relation(fields: [userId], references: [id])

  firstName       String
  lastName        String

  phone           String? @unique
  address         String?

  departmentId    String
  department      Department @relation(fields: [departmentId], references: [id])

  designationId   String
  designation     Designation @relation(fields: [designationId], references: [id])

  joiningDate     DateTime

  profileImage    String?

  attendances     Attendance[]
  leaveRequests   LeaveRequest[]
  payrolls        Payroll[]
  documents       Document[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([departmentId])
  @@index([designationId])
}

//
// ATTENDANCE
//

model Attendance {

  id              String @id @default(cuid())

  employeeId      String

  employee        EmployeeProfile
                  @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  attendanceDate  DateTime

  checkIn         DateTime?

  checkOut        DateTime?

  workingHours    Decimal?
                  @db.Decimal(5,2)

  status          AttendanceStatus

  createdAt DateTime @default(now())

  @@unique([employeeId, attendanceDate])

  @@index([attendanceDate])

  @@index([employeeId])
}

//
// LEAVE REQUEST
//

model LeaveRequest {

  id              String @id @default(cuid())

  employeeId      String

  employee EmployeeProfile
            @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  leaveTypeId String

  leaveType LeaveType
            @relation(fields: [leaveTypeId], references: [id])

  startDate DateTime

  endDate DateTime

  totalDays Int

  remarks String?

  status LeaveStatus
         @default(PENDING)

  adminComment String?

  approvedAt DateTime?

  createdAt DateTime @default(now())

  @@index([employeeId])

  @@index([status])

}

//
// PAYROLL
//

model Payroll {

  id String @id @default(cuid())

  employeeId String

  employee EmployeeProfile
            @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  basicSalary Decimal @db.Decimal(10,2)

  allowances Decimal @default(0)
              @db.Decimal(10,2)

  deductions Decimal @default(0)
              @db.Decimal(10,2)

  netSalary Decimal
            @db.Decimal(10,2)

  effectiveDate DateTime

  createdAt DateTime @default(now())

  @@index([employeeId])

}

//
// DOCUMENTS
//

model Document {

  id String @id @default(cuid())

  employeeId String

  employee EmployeeProfile
            @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  documentType String

  filePath String

  uploadedAt DateTime @default(now())

  @@index([employeeId])

}

//
// NOTIFICATIONS
//

model Notification {

  id String @id @default(cuid())

  userId String

  user User
       @relation(fields: [userId], references: [id], onDelete: Cascade)

  title String

  message String

  isRead Boolean @default(false)

  createdAt DateTime @default(now())

  @@index([userId])

}

//
// ACTIVITY LOG
//

model ActivityLog {

  id String @id @default(cuid())

  userId String

  user User
       @relation(fields: [userId], references: [id], onDelete: Cascade)

  action String

  module String

  createdAt DateTime @default(now())

  @@index([userId])

}
```

---

# 🔍 One Important Improvement

If I were reviewing this as an Odoo interviewer, I'd make **one refinement**.

### Avoid cascading deletes on core HR data.

Right now, models like `Attendance`, `LeaveRequest`, `Payroll`, and `Document` use:

```prisma
onDelete: Cascade
```

In a real HRMS, deleting an employee should **not** automatically erase attendance records, leave history, payroll, or documents. Those records are often needed for audits and legal compliance.

For the hackathon, I recommend:

* Keep `Cascade` only for:

  * `Notification`
  * `ActivityLog` (optional)

* Use `Restrict` (the default behavior) for:

  * `Attendance`
  * `LeaveRequest`
  * `Payroll`
  * `Document`

This lets you explain to the judges:

> "We intentionally preserve historical HR records to maintain auditability and data integrity, which is standard practice in enterprise HR systems."

That kind of explanation demonstrates architectural thinking and aligns well with Odoo's emphasis on real-world software design.

**After finalizing this Prisma schema, we should move to Step 4: REST API Design**, where we'll build endpoints directly on top of these models.
