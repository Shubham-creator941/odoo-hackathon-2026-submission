import type { AttendanceRecord } from '../types'
import { cn } from '@/utils'

interface AttendanceCalendarProps {
  logs: AttendanceRecord[]
}

export default function AttendanceCalendar({ logs }: AttendanceCalendarProps) {
  const daysInMonth = 31
  const startDayOffset = 3 // July 2026 starts on Wednesday

  const days = Array.from({ length: daysInMonth }).map((_, idx) => {
    const dayNum = idx + 1
    const dateStr = `2026-07-${dayNum.toString().padStart(2, '0')}`
    const match = logs.find((l) => l.date === dateStr)
    return {
      dayNum,
      log: match,
    }
  })

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Calendar View &bull; July 2026
      </h3>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-bold text-slate-500 uppercase tracking-wide py-1"
          >
            {name}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDayOffset }).map((_, idx) => (
          <div
            key={`offset-${idx}`}
            className="h-16 rounded-lg bg-slate-50 dark:bg-slate-800/20"
          />
        ))}

        {days.map(({ dayNum, log }) => {
          const isWeekend = (dayNum + startDayOffset - 1) % 7 === 0 || (dayNum + startDayOffset - 1) % 7 === 6

          return (
            <div
              key={dayNum}
              className={cn(
                "h-16 rounded-lg border p-2 flex flex-col justify-between transition-all select-none",
                isWeekend
                  ? "bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/50"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                log?.status === 'Present' && "border-green-300 bg-green-50/20 dark:border-green-800/40",
                log?.status === 'Late' && "border-amber-300 bg-amber-50/20 dark:border-amber-800/40",
                log?.status === 'Absent' && "border-red-300 bg-red-50/20 dark:border-red-800/40",
                log?.status === 'Half Day' && "border-slate-300 bg-slate-50/20 dark:border-slate-800/40"
              )}
            >
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                {dayNum}
              </span>
              {log ? (
                <span
                  className={cn(
                    "text-[9px] font-bold px-1 py-0.5 rounded text-center truncate uppercase tracking-wider",
                    log.status === 'Present' && "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-400",
                    log.status === 'Late' && "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400",
                    log.status === 'Absent' && "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400",
                    log.status === 'Half Day' && "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                  )}
                >
                  {log.status}
                </span>
              ) : (
                !isWeekend && (
                  <span className="text-[9px] font-bold px-1 py-0.5 rounded text-center text-slate-300 dark:text-slate-600 uppercase tracking-wider">
                    No Log
                  </span>
                )
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
