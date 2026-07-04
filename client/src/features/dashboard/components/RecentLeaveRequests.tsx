import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'

import type { RecentLeave } from '../types'

interface RecentLeaveRequestsProps {
  leaves: RecentLeave[]
  isLoading?: boolean
}

export default function RecentLeaveRequests({ leaves, isLoading }: RecentLeaveRequestsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Leave Requests
        </h3>
        <Link
          to={ROUTES.ADMIN.LEAVE}
          className="text-xs font-semibold text-blue-600 hover:text-blue-500"
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4 flex-1">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-12 bg-slate-100 rounded-lg animate-pulse dark:bg-slate-800" />
          ))}
        </div>
      ) : leaves.length === 0 ? (
        <EmptyState title="No leaves" description="No recent leave requests found." className="border-0 p-4" />
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
          {leaves.map((lv) => (
            <div key={lv.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {lv.employeeName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {lv.leaveType} &bull; {lv.duration}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {lv.appliedDate}
                </span>
                <StatusBadge status={lv.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
