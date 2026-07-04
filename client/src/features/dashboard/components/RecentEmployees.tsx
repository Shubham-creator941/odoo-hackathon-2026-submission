import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'
import EmptyState from '@/components/ui/EmptyState'

import type { RecentEmployee } from '../types'

interface RecentEmployeesProps {
  employees: RecentEmployee[]
  isLoading?: boolean
}

export default function RecentEmployees({ employees, isLoading }: RecentEmployeesProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Hires
        </h3>
        <Link
          to={ROUTES.ADMIN.EMPLOYEES}
          className="text-xs font-semibold text-blue-600 hover:text-blue-500"
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4 flex-1">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3 dark:bg-slate-800" />
                <div className="h-3 bg-slate-200 rounded w-1/2 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : employees.length === 0 ? (
        <EmptyState title="No recent hires" description="No new hires added recently." className="border-0 p-4" />
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
          {employees.map((emp) => (
            <div key={emp.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {emp.avatar || emp.fullName.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {emp.fullName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {emp.designation} &bull; {emp.department}
                </p>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                {emp.joiningDate}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
