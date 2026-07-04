import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import EmployeeLayout from '@/layouts/EmployeeLayout'

// Pages
import Login from '@/features/auth/pages/LoginPage'
import Register from '@/features/auth/pages/RegisterPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import EmployeeListPage from '@/features/employee/pages/EmployeeListPage'
import EmployeeDetailsPage from '@/features/employee/pages/EmployeeDetailsPage'
import EmployeeFormPage from '@/features/employee/pages/EmployeeFormPage'
import AttendancePage from '@/features/attendance/pages/AttendancePage'
import LeavePage from '@/features/leave/pages/LeavePage'
import ApplyLeavePage from '@/features/leave/pages/ApplyLeavePage'

import Payroll from '@/pages/Payroll'
import Documents from '@/pages/Documents'
import Notifications from '@/pages/Notifications'
import Profile from '@/pages/Profile'
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
        element: <DashboardPage />,
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
        element: <AttendancePage />,
      },
      {
        path: 'leave',
        children: [
          {
            path: '',
            element: <LeavePage />,
          },
          {
            path: 'apply',
            element: <ApplyLeavePage />,
          },
        ],
      },
      {
        path: 'payroll',
        element: <Payroll />,
      },
      {
        path: 'documents',
        element: <Documents />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <Profile />,
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
        element: <DashboardPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'leave',
        children: [
          {
            path: '',
            element: <LeavePage />,
          },
          {
            path: 'apply',
            element: <ApplyLeavePage />,
          },
        ],
      },
      {
        path: 'payroll',
        element: <Payroll />,
      },
      {
        path: 'documents',
        element: <Documents />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <Profile />,
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

