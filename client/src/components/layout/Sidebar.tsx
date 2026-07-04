import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarX,
  DollarSign,
  FileText,
  Bell,
  User,
  X,
} from 'lucide-react'

interface SidebarProps {
  type: 'admin' | 'employee'
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ type, isOpen, onClose }: SidebarProps) {
  const adminMenuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/admin/employees', icon: Users },
    { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { name: 'Leave', path: '/admin/leave', icon: CalendarX },
    { name: 'Payroll', path: '/admin/payroll', icon: DollarSign },
    { name: 'Documents', path: '/admin/documents', icon: FileText },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ]

  const employeeMenuItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/employee/attendance', icon: CalendarCheck },
    { name: 'Leave', path: '/employee/leave', icon: CalendarX },
    { name: 'Payroll', path: '/employee/payroll', icon: DollarSign },
    { name: 'Documents', path: '/employee/documents', icon: FileText },
    { name: 'Notifications', path: '/employee/notifications', icon: Bell },
    { name: 'Profile', path: '/employee/profile', icon: User },
  ]

  const menuItems = type === 'admin' ? adminMenuItems : employeeMenuItems

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 md:static md:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <span className="text-lg font-bold text-slate-800 dark:text-white">
            {type === 'admin' ? 'Admin Portal' : 'Employee Portal'}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-50'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

