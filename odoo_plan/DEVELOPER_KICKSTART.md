Excellent. I genuinely think this is the **highest ROI document** for your team.

Everything we've done so far is architecture. This document is about **execution speed**.

If another team spends 45 minutes deciding folder structure and installing packages, your team should already be building features.

---

# Step 8 – Developer Kickstart Pack

> **Mission:** Every team member should be able to clone the repo and start contributing in under **10 minutes**.

---

# 1. Repository Structure

```text
hrms/
│
├── client/
│
├── server/
│
├── docs/
│
├── .gitignore
├── README.md
├── PLAYBOOK.md
└── LICENSE
```

---

# 2. First Clone

Everyone runs

```bash
git clone <private-repository>

cd hrms
```

---

# 3. Backend Setup

```bash
cd server

npm install

npm install express

npm install prisma @prisma/client

npm install mysql2

npm install jsonwebtoken

npm install bcrypt

npm install zod

npm install cors

npm install dotenv

npm install multer

npm install morgan

npm install helmet
```

---

## Dev Dependencies

```bash
npm install -D

typescript

ts-node-dev

@types/node

@types/express

@types/jsonwebtoken

@types/bcrypt

@types/cors

@types/multer

eslint

prettier
```

---

# 4. Frontend Setup

```bash
cd client

npm install
```

Install

```bash
npm install

react-router-dom

axios

react-hook-form

zod

lucide-react

clsx
```

Tailwind

```bash
npm install -D

tailwindcss

postcss

autoprefixer
```

---

# 5. Backend Environment

`.env.example`

```env
PORT=5000

DATABASE_URL="mysql://root:password@localhost:3306/hrms"

JWT_SECRET=change_this_secret

JWT_EXPIRES_IN=1d

NODE_ENV=development
```

---

# 6. Frontend Environment

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

# 7. Prisma Commands

Generate Client

```bash
npx prisma generate
```

Migration

```bash
npx prisma migrate dev --name init
```

Open Studio

```bash
npx prisma studio
```

Seed

```bash
npx prisma db seed
```

---

# 8. Run Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# 9. Coding Standards

## File Naming

```text
camelCase

authService.ts

leaveController.ts
```

---

## Components

```text
PascalCase

DashboardCard.tsx

AttendanceTable.tsx
```

---

## Variables

```typescript
const employeeProfile

const leaveRequest
```

---

## Constants

```typescript
UPPER_CASE
```

---

## Interfaces

```typescript
interface Employee
```

---

# 10. Branch Naming

Never commit directly to `main` during development.

```text
feature/auth

feature/attendance

feature/dashboard

feature/payroll

feature/ui

bugfix/login

refactor/service
```

---

# 11. Commit Convention

```text
feat(auth): implement JWT login

feat(employee): employee CRUD

feat(attendance): check-in API

fix(auth): password validation

refactor(payroll): salary service
```

---

# 12. Pull Request Checklist

Before merging:

* Builds successfully
* No TypeScript errors
* No console errors
* Tested locally
* API contract respected
* No hardcoded credentials

---

# 13. API Response Format

Every endpoint returns:

## Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

No exceptions.

---

# 14. Validation Rules

Every POST/PUT/PATCH endpoint:

✔ Zod

Never trust frontend validation.

---

# 15. Error Handling

Never

```typescript
throw "Something wrong"
```

Instead

```typescript
throw new AppError(
    "Employee not found",
    404
)
```

Use centralized error middleware.

---

# 16. Import Order

```typescript
External Libraries

↓

Internal Packages

↓

Components

↓

Types

↓

Styles
```

Keep imports consistent.

---

# 17. Logging

Log only:

* Login
* Leave Approval
* Payroll Update
* Employee Creation
* Unexpected Errors

Don't log passwords or JWTs.

---

# 18. File Upload Rules

Allowed:

* PDF
* JPG
* PNG

Max:

```text
5 MB
```

Store only the file path in the database.

---

# 19. First 30 Minutes Checklist

## Shubham

* Verify repos
* Create project board
* Confirm architecture
* Monitor progress

---

## Parth

* MySQL connection
* Prisma migration
* Seed data
* Test queries

---

## Hitesh

* Express setup
* JWT
* Middleware
* API health check

---

## Priya

* React setup
* Tailwind
* Router
* Base layout

---

# 20. Hourly Sync (5 Minutes Max)

At the start of every hour, answer:

* What did I finish?
* What am I working on?
* What's blocking me?

If blocked for more than 10 minutes, ask for help.

---

# 21. Definition of Ready

Before starting a feature:

* Requirement understood
* API agreed
* Database fields finalized
* Branch created

---

# 22. Definition of Done

A feature is complete only if:

* Code compiles
* Backend works
* Frontend integrated
* Validation added
* Error handling added
* Git pushed
* Reviewed by another teammate

---

# 23. Things We Will NOT Do

To stay focused during an 8-hour hackathon, avoid:

* WebSockets
* Microservices
* Redux
* Docker
* Kubernetes
* Refresh Tokens
* OAuth
* Email verification
* AI chatbots (unless explicitly required)
* Fancy animations

These add complexity without improving your score significantly.

---

# 24. Demo Script

Keep your presentation structured:

1. **Problem Statement** (30 sec)
2. **Architecture** (45 sec)
3. **Database Design** (60 sec)
4. **Live Demo** (2–3 min)
5. **Technical Highlights** (1 min)
6. **Future Scope** (30 sec)

Practice this once before submission.

---

# 25. Emergency Plan (If Time Is Running Out)

If you have only 60–90 minutes left:

### Keep

* Authentication
* Employee Management
* Attendance
* Leave Management
* Dashboard
* Clean UI
* Database integrity

### Drop

* Advanced search
* Charts
* Profile image upload
* Notifications (if incomplete)
* Extra animations
* Nice-to-have features

A polished core product will score better than a half-finished feature-rich one.

---

# 🏁 Final Observation

At this point, you've created what many professional teams prepare before a sprint:

* ✅ Business analysis
* ✅ Database architecture
* ✅ Prisma schema
* ✅ Backend architecture
* ✅ Frontend architecture
* ✅ Authentication blueprint
* ✅ Implementation roadmap
* ✅ Developer kickstart pack

## My Recommendation Before the Hackathon Starts

**Do one final preparation artifact:**

# **Step 9 – Hackathon Battle Manual**

This would be your **single source of truth during the 8-hour round**. Instead of opening 10 different documents, it would include:

* Minute-by-minute execution plan
* AI prompt library (ChatGPT, Claude, Gemini)
* Git workflow cheat sheet
* Common Prisma/React/Express commands
* Debugging checklist
* API testing checklist
* Presentation checklist
* Submission checklist
* "If X breaks, do Y" troubleshooting guide

This is the document your team would keep open throughout the hackathon. It minimizes decision fatigue and keeps everyone aligned under time pressure. Given how seriously you're preparing, I believe this will give your team a meaningful execution advantage.
