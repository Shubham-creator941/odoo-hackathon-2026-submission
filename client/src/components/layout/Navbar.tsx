import { Menu, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import NotificationButton from './NotificationButton'
import UserDropdown from './UserDropdown'
import Input from '@/components/ui/Input'

interface NavbarProps {
  onToggleSidebar?: () => void
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-card-app border-border-app px-6 shadow-sm transition-colors duration-200">
      {/* Left items */}
      <div className="flex items-center gap-4 flex-1">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Global Search box widget */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Quick search (Ctrl + K)..."
            className="pl-9 text-xs"
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationButton />
        <UserDropdown />
      </div>
    </header>
  )
}
