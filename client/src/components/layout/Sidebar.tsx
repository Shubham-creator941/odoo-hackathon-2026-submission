import { useState, useEffect } from 'react'
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { ROUTES } from '@/utils/routes'
import { cn } from '@/utils'

interface SidebarProps {
  type: 'admin' | 'employee'
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ type, isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed))
  }, [isCollapsed])

  const adminMenuItems = [
    { name: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
    { name: 'Employees', path: ROUTES.ADMIN.EMPLOYEES, icon: Users },
    { name: 'Attendance', path: ROUTES.ADMIN.ATTENDANCE, icon: CalendarCheck },
    { name: 'Leave', path: ROUTES.ADMIN.LEAVE, icon: CalendarX },
    { name: 'Payroll', path: ROUTES.ADMIN.PAYROLL, icon: DollarSign },
    { name: 'Documents', path: ROUTES.ADMIN.DOCUMENTS, icon: FileText },
    { name: 'Notifications', path: ROUTES.ADMIN.NOTIFICATIONS, icon: Bell },
    { name: 'Profile', path: ROUTES.ADMIN.PROFILE, icon: User },
  ]

  const employeeMenuItems = [
    { name: 'Dashboard', path: ROUTES.EMPLOYEE.DASHBOARD, icon: LayoutDashboard },
    { name: 'Attendance', path: ROUTES.EMPLOYEE.ATTENDANCE, icon: CalendarCheck },
    { name: 'Leave', path: ROUTES.EMPLOYEE.LEAVE, icon: CalendarX },
    { name: 'Payroll', path: ROUTES.EMPLOYEE.PAYROLL, icon: DollarSign },
    { name: 'Documents', path: ROUTES.EMPLOYEE.DOCUMENTS, icon: FileText },
    { name: 'Notifications', path: ROUTES.EMPLOYEE.NOTIFICATIONS, icon: Bell },
    { name: 'Profile', path: ROUTES.EMPLOYEE.PROFILE, icon: User },
  ]

  const menuItems = type === 'admin' ? adminMenuItems : employeeMenuItems

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card-app border-border-app transition-all duration-300 md:static flex-shrink-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border-app">
          <span className={cn("font-bold text-slate-800 dark:text-white transition-all duration-200 truncate", isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto text-lg")}>
            {type === 'admin' ? 'Admin Portal' : 'Employee Portal'}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-850 md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto" aria-label="Main navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              aria-label={item.name}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border-l-4 border-l-indigo-600 dark:border-l-indigo-500"
                    : "text-text-muted hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/40 dark:hover:text-slate-100"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105", isActive ? "text-indigo-650 dark:text-indigo-400" : "text-text-muted")} />
                  <span className={cn("transition-all duration-200 truncate", isCollapsed ? "opacity-0 w-0 select-none pointer-events-none" : "opacity-100 w-auto")}>
                    {item.name}
                  </span>

                  {/* Collapsed Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none dark:bg-slate-850 border dark:border-slate-800">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Collapse Toggle Footer */}
        <div className="hidden md:flex p-4 border-t border-border-app justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-text-muted hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-850 dark:hover:text-slate-200 transition-colors"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  )
}
