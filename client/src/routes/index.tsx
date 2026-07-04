import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import EmployeeLayout from '@/layouts/EmployeeLayout'

// Pages
import Login from '@/features/auth/pages/LoginPage'
import Register from '@/features/auth/pages/RegisterPage'

// Admin Pages
import AdminDashboardPage from '@/features/dashboard/pages/AdminDashboardPage'
import EmployeeListPage from '@/features/employee/pages/EmployeeListPage'
import EmployeeDetailsPage from '@/features/employee/pages/EmployeeDetailsPage'
import EmployeeFormPage from '@/features/employee/pages/EmployeeFormPage'
import AdminAttendancePage from '@/features/attendance/admin/AdminAttendancePage'
import AdminLeavePage from '@/features/leave/admin/AdminLeavePage'
import AdminPayrollPage from '@/features/payroll/admin/AdminPayrollPage'
import AdminDocumentsPage from '@/features/documents/admin/AdminDocumentsPage'
import AdminNotificationsPage from '@/features/notifications/admin/AdminNotificationsPage'
import AdminProfilePage from '@/features/profile/admin/AdminProfilePage'

// Employee Pages
import EmployeeDashboardPage from '@/features/dashboard/pages/EmployeeDashboardPage'
import EmployeeAttendancePage from '@/features/attendance/employee/EmployeeAttendancePage'
import EmployeeLeavePage from '@/features/leave/employee/EmployeeLeavePage'
import EmployeePayslipPage from '@/features/payroll/employee/EmployeePayslipPage'
import EmployeeDocumentsPage from '@/features/documents/employee/EmployeeDocumentsPage'
import EmployeeNotificationsPage from '@/features/notifications/employee/EmployeeNotificationsPage'
import EmployeeProfilePage from '@/features/profile/employee/EmployeeProfilePage'

import Unauthorized from '@/pages/Unauthorized'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            element: <EmployeeListPage />,
          },
          {
            path: 'new',
            element: <EmployeeFormPage />,
          },
          {
            path: ':id',
            element: <EmployeeDetailsPage />,
          },
          {
            path: ':id/edit',
            element: <EmployeeFormPage />,
          },
        ],
      },
      {
        path: 'attendance',
        element: <AdminAttendancePage />,
      },
      {
        path: 'leave',
        element: <AdminLeavePage />,
      },
      {
        path: 'payroll',
        element: <AdminPayrollPage />,
      },
      {
        path: 'documents',
        element: <AdminDocumentsPage />,
      },
      {
        path: 'notifications',
        element: <AdminNotificationsPage />,
      },
      {
        path: 'profile',
        element: <AdminProfilePage />,
      },
    ],
  },
  {
    path: 'employee',
    element: <EmployeeLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <EmployeeDashboardPage />,
      },
      {
        path: 'attendance',
        element: <EmployeeAttendancePage />,
      },
      {
        path: 'leave',
        children: [
          {
            path: '',
            element: <EmployeeLeavePage />,
          },
          {
            path: 'apply',
            element: <EmployeeLeavePage />,
          },
        ],
      },
      {
        path: 'payroll',
        element: <EmployeePayslipPage />,
      },
      {
        path: 'documents',
        element: <EmployeeDocumentsPage />,
      },
      {
        path: 'notifications',
        element: <EmployeeNotificationsPage />,
      },
      {
        path: 'profile',
        element: <EmployeeProfilePage />,
      },
    ],
  },
  {
    path: 'unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])


