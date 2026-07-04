export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYEES: '/admin/employees',
    EMPLOYEES_NEW: '/admin/employees/new',
    EMPLOYEES_DETAILS: (id: string) => `/admin/employees/${id}`,
    EMPLOYEES_EDIT: (id: string) => `/admin/employees/${id}/edit`,
    ATTENDANCE: '/admin/attendance',
    LEAVE: '/admin/leave',
    PAYROLL: '/admin/payroll',
    DOCUMENTS: '/admin/documents',
    NOTIFICATIONS: '/admin/notifications',
    PROFILE: '/admin/profile',
  },
  EMPLOYEE: {
    DASHBOARD: '/employee/dashboard',
    ATTENDANCE: '/employee/attendance',
    LEAVE: '/employee/leave',
    LEAVE_APPLY: '/employee/leave/apply',
    PAYROLL: '/employee/payroll',
    DOCUMENTS: '/employee/documents',
    NOTIFICATIONS: '/employee/notifications',
    PROFILE: '/employee/profile',
  },
} as const
