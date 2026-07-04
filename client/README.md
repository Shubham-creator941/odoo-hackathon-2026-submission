# HRMS Portal Client Workspace

This directory contains the frontend user interface for the Odoo-inspired HRMS (Human Resource Management System) application.

## Portals Separation Architecture

The application is structured into two completely independent portals using React, TypeScript, Vite, and Tailwind CSS:

1. **Admin Portal**: Accessible via `/admin`. Contains organizational headcount controls, timesheet monitors, leave approvals, company payrolls processing, compliance documents verification, and administrative settings.
2. **Employee Portal**: Accessible via `/employee`. Contains employee self-service tools, check-in/out consoles, personal leaves application, monthly payslip downloads, documents vault, and emergency coordinates.

## Reusable UI Design Language
All screens build upon a shared component library:
- **Buttons & Badges**: Standardized states and interactive scales.
- **Card layouts & Tables**: Consistent border-radii, spacing, scroll wrappers, and dark mode contrasts.
- **Forms**: Checked and validated client-side with React Hook Form + Zod.
- **Loaders & Skeletons**: Standardized loading placeholders.
