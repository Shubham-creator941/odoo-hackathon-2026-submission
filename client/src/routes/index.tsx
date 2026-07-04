import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import EmployeeLayout from '@/layouts/EmployeeLayout'

// Pages
import Login from '@/features/auth/pages/LoginPage'
import Register from '@/features/auth/pages/RegisterPage'
import Dashboard from '@/pages/Dashboard'
import Employees from '@/pages/Employees'
import Attendance from '@/pages/Attendance'
import Leave from '@/pages/Leave'
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
        element: <Dashboard />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'leave',
        element: <Leave />,
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
        element: <Dashboard />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'leave',
        element: <Leave />,
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

