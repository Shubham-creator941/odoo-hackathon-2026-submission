# Odoo Hackathon 2026 Submission

This repository contains the monorepo structure for our Odoo Hackathon 2026 project.

## Folder Structure

```
.
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validators/
├── docs/
│   └── README.md
└── README.md
```

## Setup

_Placeholder: Setup instructions will be added as implementation begins._

## Tech Stack & Responsibilities

- **Frontend**: React + Vite + TypeScript (located in `client/`)
- **Backend**: Node.js + Express + Prisma (located in `server/`, handled separately)

## Team Responsibilities

- **Frontend Developers**: Responsible for implementing user interfaces, state management, routing, and consuming APIs within the `client/` folder.
- **Backend Developers**: Responsible for implementing API endpoints, middlewares, controllers, services, validators, database schemas, and integration testing within the `server/` folder.
