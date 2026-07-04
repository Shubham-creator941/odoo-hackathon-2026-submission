import { Menu, Sun, Moon, Bell } from 'lucide-react'
import { useTheme } from 'next-themes'

interface NavbarProps {
  onToggleSidebar?: () => void
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
            HRMS
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="View Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  )
}

