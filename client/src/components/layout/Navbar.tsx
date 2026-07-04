import { useState, useRef, useEffect } from 'react'
import { Menu, Sun, Moon, Bell, Search, LogOut, User as UserIcon, Settings, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { toast } from 'sonner'
import { cn } from '@/utils'

interface NavbarProps {
  onToggleSidebar?: () => void
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const notifications = [
    {
      id: '1',
      title: 'Leave Request Approved',
      description: "Bob Miller's leave request has been approved.",
      type: 'success',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30',
    },
    {
      id: '2',
      title: 'Pending Leaves Alert',
      description: 'You have 6 pending leave applications to review.',
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30',
    },
    {
      id: '3',
      title: 'Sync Error',
      description: 'Failed to synchronize payroll statistics.',
      type: 'error',
      icon: XCircle,
      color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30',
    },
    {
      id: '4',
      title: 'System Info',
      description: 'Maintenance is scheduled on Sunday 2:00 AM.',
      type: 'info',
      icon: Info,
      color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30',
    },
  ]

  const triggerToast = (type: string, title: string, desc: string) => {
    if (type === 'success') {
      toast.success(title, { description: desc })
    } else if (type === 'error') {
      toast.error(title, { description: desc })
    } else if (type === 'warning') {
      toast.warning(title, { description: desc })
    } else {
      toast.info(title, { description: desc })
    }
  }

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-card-app border-border-app px-6 shadow-sm transition-colors duration-200">
      {/* Left items */}
      <div className="flex items-center gap-4 flex-1">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Global Search box widget */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search (Ctrl + K)..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 transition-all"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Theme toggle switcher */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 transition-all duration-300 transform active:scale-95"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-500 rotate-0 transition-transform duration-300" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600 rotate-0 transition-transform duration-300" />
          )}
        </button>

        {/* Notifications dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 transition-colors",
              showNotifications && "bg-slate-100 dark:bg-slate-800"
            )}
            aria-label="View Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden z-50">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded dark:bg-blue-950 dark:text-blue-400">4 New</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      triggerToast(item.type, item.title, item.description)
                      setShowNotifications(false)
                    }}
                    className="flex w-full items-start gap-3 p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className={cn("p-2 rounded-lg mt-0.5", item.color)}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 focus:outline-none group"
            aria-label="User Menu"
          >
            <div className="hidden text-right md:block">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center shadow-sm transition-colors">
              JD
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Signed in as</p>
                <p className="text-xs font-bold text-slate-750 dark:text-slate-200 truncate">john.doe@company.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    toast.info('Navigating to profile...');
                    setShowProfile(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/40"
                >
                  <UserIcon className="h-4 w-4 text-slate-400" /> My Profile
                </button>
                <button
                  onClick={() => {
                    toast.info('Navigating to settings...');
                    setShowProfile(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/40"
                >
                  <Settings className="h-4 w-4 text-slate-400" /> Settings
                </button>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 py-1 bg-red-50/10">
                <button
                  onClick={() => {
                    toast.success('Logged out successfully.');
                    setShowProfile(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
