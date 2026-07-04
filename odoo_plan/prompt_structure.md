Perfect. This is actually the phase I'm most excited about because **good prompts are force multipliers**. Under an 8-hour time limit, the quality of your prompts matters almost as much as the quality of your code.

Here's the important principle:

> **We'll create prompts that produce engineering decisions, not just code.**

---

# The Odoo AI Prompt Library (v1.0)

We'll categorize prompts based on the hackathon lifecycle.

```
01. Problem Analysis
02. Architecture
03. Database
04. Backend
05. Frontend
06. Code Review
07. Debugging
08. Git
09. Testing
10. Presentation
11. Final Submission
```

---

# 📁 01. Problem Analysis Prompt (Highest Priority)

This is the **first prompt** you'll use tomorrow.

```text
You are a Senior Solution Architect participating in the Odoo Hackathon.

Analyze the following problem statement.

Return ONLY the following sections:

1. Business Problem
2. Target Users
3. Functional Requirements
4. Non Functional Requirements
5. Hidden Requirements
6. Possible Edge Cases
7. Database Entities
8. Relationships
9. Suggested Tech Architecture
10. Feature Priority
    - Must Have
    - Should Have
    - Nice to Have
11. Risks
12. Odoo Evaluation Opportunities

Problem Statement:

<PASTE HERE>
```

---

# 📁 02. Database Prompt

```text
Act as a PostgreSQL Database Architect.

Design a production-quality relational database.

Return:

- Tables
- Columns
- Data Types
- Primary Keys
- Foreign Keys
- Constraints
- Relationships
- Indexes
- Normalization Notes

Requirements:

<PASTE HERE>

Tech:
PostgreSQL
Prisma ORM
```

---

# 📁 03. Prisma Prompt

```text
Convert the following database into an optimized Prisma schema.

Requirements:

- Proper relations
- Cascading deletes only where appropriate
- Indexes
- Enums
- Nullable fields only when required

Database:

<PASTE HERE>
```

---

# 📁 04. API Design Prompt

```text
Act as a Senior Backend Engineer.

Design REST APIs.

Return:

Method

Endpoint

Request

Validation

Response

Errors

Business Logic

Requirements:

<PASTE HERE>
```

---

# 📁 05. React Prompt

```text
Generate ONLY the React component.

Requirements:

- React + TypeScript
- TailwindCSS
- Responsive
- Clean UI
- Reusable
- No inline styles

Component:

<PASTE HERE>
```

---

# 📁 06. Tailwind UI Prompt

```text
Improve this UI.

Requirements:

Professional

Clean

Odoo style

Proper spacing

Consistent typography

Responsive

Accessibility

Component:

<PASTE HERE>
```

---

# 📁 07. Express Route Prompt

```text
Generate an Express route.

Requirements

Validation

Controller

Service

Error Handling

Professional Folder Structure

Feature:

<PASTE HERE>
```

---

# 📁 08. Validation Prompt

```text
Generate Zod validation schema.

Rules:

Required fields

Length

Regex

Custom Messages

Business Validation

Entity:

<PASTE HERE>
```

---

# 📁 09. Code Review Prompt

This one is gold.

```text
Act as a Senior Code Reviewer at Odoo.

Review the following code.

Evaluate:

Architecture

Naming

Scalability

Security

Performance

Readability

Validation

Possible Bugs

Edge Cases

Return

Critical

Major

Minor

Suggestions

Code:

<PASTE HERE>
```

---

# 📁 10. Debug Prompt

```text
Find the root cause.

Don't rewrite the entire code.

Explain:

Why

Where

How to Fix

Best Practice

Code

<PASTE HERE>

Error

<PASTE HERE>
```

---

# 📁 11. SQL Review Prompt

```text
Review this SQL.

Check

Indexes

Normalization

Performance

Security

Query Optimization

SQL

<PASTE HERE>
```

---

# 📁 12. Git Review Prompt

```text
Review this repository structure.

Evaluate

Folder Structure

Naming

Git Practices

Documentation

Scalability

Suggest Improvements.

Repository Tree

<PASTE HERE>
```

---

# 📁 13. Security Audit Prompt

```text
Review this project.

Check

Authentication

Authorization

Validation

SQL Injection

XSS

CSRF

Secrets

Environment Variables

Security Headers

Return vulnerabilities with severity.
```

---

# 📁 14. README Prompt

```text
Generate a professional README.

Include

Overview

Features

Tech Stack

Architecture

Installation

Database

API

Future Improvements

License
```

---

# 📁 15. Presentation Prompt

```text
Prepare a 5-minute presentation.

Structure

Problem

Solution

Architecture

Database

Backend

Frontend

Challenges

Future Scope

Keep it natural.

All four team members must speak.
```

---

# 📁 16. Final Submission Prompt (Most Important)

This is the last prompt before submitting.

```text
You are an Odoo evaluator.

Review this entire project.

Evaluate

Database

Backend

Frontend

Validation

Architecture

Folder Structure

Git

Scalability

Security

Documentation

Presentation

Score each out of 10.

Tell me whether this project is likely to qualify.

Mention every weakness.

Be brutally honest.
```

---

# 🔥 The "Golden Rule" for AI During the Hackathon

I want your whole team to follow this:

### ❌ Never ask:

> "Generate the whole project."

### ✅ Always ask:

> "Review this database."

> "Improve this React component."

> "Optimize this API."

> "Find bugs."

> "Improve validation."

AI should **improve your engineering**, not replace it.

---

# 🎯 One Final Suggestion (This Will Be Our Biggest Weapon)

I want us to create a **single source of truth** during the hackathon.

Instead of everyone independently asking AI:

* **All architecture and planning decisions come through this chat.**
* Use **Gemini** for frontend implementation and UI refinement.
* Use **Claude** for reviewing larger chunks of code and debugging.
* Use **ChatGPT (this conversation)** for architecture, database, API contracts, integration decisions, prioritization, and final reviews.

That way:

* Everyone works from the same architecture.
* There are no conflicting database schemas.
* APIs stay consistent.
* The frontend and backend evolve together.

---

## My Commitment for Tomorrow

Once the problem statement drops, don't spend 30 minutes figuring out what to ask.

Just paste it here.

I'll immediately switch into **Hackathon Mode** and help you with:

1. Business analysis (5 minutes)
2. Database design
3. API contract
4. Task allocation for all four members
5. Architecture diagram
6. Risk assessment
7. Integration checkpoints
8. Final reviewer checklist

We'll make decisions quickly, keep the team synchronized, and stay focused on what Odoo is actually evaluating. I think that's the highest-leverage way I can support your team during the event. 💪
