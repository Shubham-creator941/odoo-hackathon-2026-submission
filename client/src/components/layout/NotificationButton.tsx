import { useState, useRef, useEffect } from 'react'
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/utils'

export default function NotificationButton() {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative font-sans" ref={notificationsRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className={cn(
          "relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer",
          showNotifications && "bg-slate-100 dark:bg-slate-800"
        )}
        aria-label="View Notifications"
        aria-expanded={showNotifications}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
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
                className="flex w-full items-start gap-3 p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-850/40 transition-colors cursor-pointer"
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
  )
}
