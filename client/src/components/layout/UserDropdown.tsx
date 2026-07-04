import { useState, useRef, useEffect } from 'react'
import { LogOut, User as UserIcon, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function UserDropdown() {
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '??'

  const roleLabel = user?.role === 'admin' ? 'Admin' : 'Employee'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setShowProfile(false)
    toast.success('Logged out successfully.')
  }

  return (
    <div className="relative font-sans" ref={profileRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-3 focus:outline-none group cursor-pointer"
        aria-label="User Menu"
        aria-expanded={showProfile}
        aria-haspopup="true"
      >
        <div className="hidden text-right md:block">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
            {user?.fullName ?? 'User'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{roleLabel}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center shadow-sm transition-colors">
          {initials}
        </div>
      </button>

      {showProfile && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Signed in as</p>
            <p className="text-xs font-bold text-slate-750 dark:text-slate-200 truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <button
              role="menuitem"
              onClick={() => {
                toast.info('Navigating to profile...')
                setShowProfile(false)
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/40 cursor-pointer"
            >
              <UserIcon className="h-4 w-4 text-slate-400" aria-hidden="true" /> My Profile
            </button>
            <button
              role="menuitem"
              onClick={() => {
                toast.info('Navigating to settings...')
                setShowProfile(false)
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-750 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/40 cursor-pointer"
            >
              <Settings className="h-4 w-4 text-slate-400" aria-hidden="true" /> Settings
            </button>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 py-1 bg-red-50/10">
            <button
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
