import type { LeaveBalance } from '../types'
import { Calendar, CheckSquare, Coffee, ShieldAlert } from 'lucide-react'

interface LeaveBalanceCardProps {
  balances: LeaveBalance[]
  isLoading?: boolean
}

export default function LeaveBalanceCard({ balances, isLoading }: LeaveBalanceCardProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-28 bg-slate-100 rounded-xl animate-pulse dark:bg-slate-800" />
        ))}
      </div>
    )
  }

  const icons = [Coffee, Calendar, CheckSquare, ShieldAlert]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {balances.map((bal, idx) => {
        const Icon = icons[idx % icons.length]
        return (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {bal.type}
              </span>
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {bal.remaining}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                days left
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
              <span>Allocated: {bal.allocated}</span>
              <span>Used: {bal.used}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
