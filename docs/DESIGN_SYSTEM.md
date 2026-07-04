# Design System

This document defines reusable visual tokens and component standards.

---

# Design Philosophy

Professional.

Minimal.

Functional.

Readable.

Consistency over creativity.

---

# Typography

Page Title

Large

Bold

Section Heading

Medium

Semi-Bold

Body

Regular

Caption

Small

---

# Spacing

Use a consistent spacing scale throughout the application.

Avoid arbitrary spacing values.

---

# Border Radius

Use one consistent radius for:

- Buttons
- Inputs
- Cards
- Tables
- Modals

---

# Cards

Cards should contain:

- Title
- Optional Description
- Content
- Actions (if needed)

Use identical padding and shadow.

---

# Forms

Reusable Components

- Input
- Textarea
- Select
- Date Picker
- Checkbox
- Radio
- Button

---

# Tables

Reusable Table Component

Supports:

- Search
- Filters
- Sorting (optional)
- Pagination
- Empty State

---

# Icons

Use Lucide React only.

Maintain consistent icon sizing.

---

# Navigation

Sidebar

- Same icon size
- Same spacing
- Active state
- Hover state

Navbar

- Notifications
- Theme Toggle
- Profile

---

# Color Usage

Primary

Application actions.

Success

Completed operations.

Warning

Pending actions.

Danger

Delete / Errors.

Neutral

Backgrounds and borders.

---

# Interaction States

Buttons

- Default
- Hover
- Active
- Disabled

Inputs

- Default
- Focus
- Error

Tables

- Hover Row
- Selected Row

Cards

- Hover (subtle only)

---

# Component Reuse Policy

Never create a new component if a reusable one already exists.

Always extend existing components before introducing new ones.

---

# Quality Checklist

Before merging:

- Consistent spacing
- Consistent typography
- Responsive
- Accessible
- Reusable
- No duplicated UI
- No visual regressions
