# HRMS Frontend Features Modules

This directory contains the feature-based modules for the HRMS portal:

1. **auth**: Login/register forms, authentication context, validation schema, API services.
2. **dashboard**: Dashboards for both portals.
   - `pages/AdminDashboardPage.tsx` - HR stats, growth chart, distribution breakdown.
   - `pages/EmployeeDashboardPage.tsx` - Personal checklist, quick links, notifications.
3. **attendance**: Punch-in/out console, logs tables, and company overview.
4. **leave**: Inline request forms, balances counters, approvals workflows, and status tracking.
5. **payroll**: Net payouts monitoring (admin) and individual monthly payslip downloads (employee).
6. **document**: Personal document vault and compliance verify checks.
7. **notification**: Isolated notification alerts for each role.
8. **profile**: System roles, emergency contacts, and professional skills.
