import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import AppLayout from '@/layouts/AppLayout'

// Eagerly-loaded pages (small, shown immediately on login)
import Login from '@/features/auth/pages/LoginPage'
import Register from '@/features/auth/pages/RegisterPage'
import Unauthorized from '@/pages/Unauthorized'
import NotFound from '@/pages/NotFound'

// Eagerly-loaded employee pages (lightweight)
import EmployeeListPage from '@/features/employee/pages/EmployeeListPage'
import EmployeeDetailsPage from '@/features/employee/pages/EmployeeDetailsPage'
import EmployeeFormPage from '@/features/employee/pages/EmployeeFormPage'

// Lazy-loaded Admin pages (heavy — charts, large data tables)
const AdminDashboardPage = lazy(() => import('@/features/dashboard/pages/AdminDashboardPage'))
const AdminAttendancePage = lazy(() => import('@/features/attendance/admin/AdminAttendancePage'))
const AdminLeavePage = lazy(() => import('@/features/leave/admin/AdminLeavePage'))
const AdminPayrollPage = lazy(() => import('@/features/payroll/pages/AdminPayrollPage'))
const AdminDocumentsPage = lazy(() => import('@/features/documents/admin/AdminDocumentsPage'))
const AdminNotificationsPage = lazy(() => import('@/features/notifications/admin/AdminNotificationsPage'))
const AdminProfilePage = lazy(() => import('@/features/profile/admin/AdminProfilePage'))

// Lazy-loaded Employee pages
const EmployeeDashboardPage = lazy(() => import('@/features/dashboard/pages/EmployeeDashboardPage'))
const EmployeeAttendancePage = lazy(() => import('@/features/attendance/employee/EmployeeAttendancePage'))
const EmployeeLeavePage = lazy(() => import('@/features/leave/employee/EmployeeLeavePage'))
const ApplyLeavePage = lazy(() => import('@/features/leave/pages/ApplyLeavePage'))
const EmployeePayrollPage = lazy(() => import('@/features/payroll/pages/EmployeePayrollPage'))
const EmployeeDocumentsPage = lazy(() => import('@/features/documents/employee/EmployeeDocumentsPage'))
const EmployeeNotificationsPage = lazy(() => import('@/features/notifications/employee/EmployeeNotificationsPage'))
const EmployeeProfilePage = lazy(() => import('@/features/profile/employee/EmployeeProfilePage'))

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  )
}

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
    element: <AppLayout type="admin" />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense>,
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
        element: <Suspense fallback={<PageLoader />}><AdminAttendancePage /></Suspense>,
      },
      {
        path: 'leave',
        element: <Suspense fallback={<PageLoader />}><AdminLeavePage /></Suspense>,
      },
      {
        path: 'payroll',
        element: <Suspense fallback={<PageLoader />}><AdminPayrollPage /></Suspense>,
      },
      {
        path: 'documents',
        element: <Suspense fallback={<PageLoader />}><AdminDocumentsPage /></Suspense>,
      },
      {
        path: 'notifications',
        element: <Suspense fallback={<PageLoader />}><AdminNotificationsPage /></Suspense>,
      },
      {
        path: 'profile',
        element: <Suspense fallback={<PageLoader />}><AdminProfilePage /></Suspense>,
      },
    ],
  },
  {
    path: 'employee',
    element: <AppLayout type="employee" />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<PageLoader />}><EmployeeDashboardPage /></Suspense>,
      },
      {
        path: 'attendance',
        element: <Suspense fallback={<PageLoader />}><EmployeeAttendancePage /></Suspense>,
      },
      {
        path: 'leave',
        children: [
          {
            path: '',
            element: <Suspense fallback={<PageLoader />}><EmployeeLeavePage /></Suspense>,
          },
          {
            path: 'apply',
            element: <Suspense fallback={<PageLoader />}><ApplyLeavePage /></Suspense>,
          },
        ],
      },
      {
        path: 'payroll',
        element: <Suspense fallback={<PageLoader />}><EmployeePayrollPage /></Suspense>,
      },
      {
        path: 'documents',
        element: <Suspense fallback={<PageLoader />}><EmployeeDocumentsPage /></Suspense>,
      },
      {
        path: 'notifications',
        element: <Suspense fallback={<PageLoader />}><EmployeeNotificationsPage /></Suspense>,
      },
      {
        path: 'profile',
        element: <Suspense fallback={<PageLoader />}><EmployeeProfilePage /></Suspense>,
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
