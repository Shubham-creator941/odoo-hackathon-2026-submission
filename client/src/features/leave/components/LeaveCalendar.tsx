import { useMemo } from 'react'
import type { LeaveRequest } from '../types'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import { cn } from '@/utils'

interface LeaveCalendarProps {
  leaves: LeaveRequest[]
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function LeaveCalendar({ leaves }: LeaveCalendarProps) {
  const daysInMonth = 31
  const startDayOffset = 3

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }).map((_, idx) => {
      const dayNum = idx + 1
      const dateStr = `2026-07-${dayNum.toString().padStart(2, '0')}`
      const onLeave = leaves.filter(
        (l) =>
          l.status === 'Approved' &&
          dateStr >= l.startDate &&
          dateStr <= l.endDate
      )
      return { dayNum, dateStr, onLeave }
    })
  }, [leaves])

  return (
    <Card>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        Leave Calendar
      </h3>
      <p className="text-xs text-text-muted mb-4">July 2026 — approved leave days</p>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-bold text-text-muted uppercase py-1"
          >
            {name}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14" />
        ))}
        {days.map(({ dayNum, onLeave }) => (
          <div
            key={dayNum}
            className={cn(
              'h-14 rounded-lg border border-border-app p-1.5 text-xs',
              onLeave.length > 0
                ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/40'
                : 'bg-card-app'
            )}
          >
            <span className="font-bold text-text-main">{dayNum}</span>
            {onLeave.length > 0 && (
              <div className="mt-0.5 truncate text-[10px] font-semibold text-indigo-650 dark:text-indigo-400">
                {onLeave.length === 1 ? 'On leave' : `${onLeave.length} on leave`}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {leaves
          .filter((l) => l.status === 'Approved')
          .slice(0, 4)
          .map((l) => (
            <div key={l.id} className="flex items-center gap-2">
              <StatusBadge status={l.status} />
              <span className="text-text-muted">
                {l.leaveType} · {l.startDate} → {l.endDate}
              </span>
            </div>
          ))}
      </div>
    </Card>
  )
}
