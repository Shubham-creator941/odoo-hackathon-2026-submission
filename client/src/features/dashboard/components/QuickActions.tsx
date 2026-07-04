import { Link } from 'react-router-dom'
import { UserPlus, CalendarPlus, Clock, CreditCard } from 'lucide-react'
import { ROUTES } from '@/utils/routes'

export default function QuickActions() {
  const actions = [
    {
      label: 'Add Employee',
      icon: UserPlus,
      path: ROUTES.ADMIN.EMPLOYEES_NEW,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
    },
    {
      label: 'Apply Leave',
      icon: CalendarPlus,
      path: ROUTES.ADMIN.LEAVE_APPLY,
      color: 'bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400',
    },
    {
      label: 'Attendance',
      icon: Clock,
      path: ROUTES.ADMIN.ATTENDANCE,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
    },
    {
      label: 'Leave Dashboard',
      icon: CreditCard,
      path: ROUTES.ADMIN.LEAVE,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
    },
  ]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((act, idx) => (
          <Link
            key={idx}
            to={act.path}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all dark:border-slate-800 dark:hover:bg-slate-800/50"
          >
            <div className={`p-3 rounded-lg mb-2 ${act.color}`}>
              <act.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">
              {act.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
