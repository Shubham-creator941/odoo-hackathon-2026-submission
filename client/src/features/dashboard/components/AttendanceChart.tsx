import type { AttendanceRate } from '../types'

interface AttendanceChartProps {
  rates: AttendanceRate[]
  isLoading?: boolean
}

export default function AttendanceChart({ rates, isLoading }: AttendanceChartProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Weekly Attendance Overview
      </h3>

      {isLoading ? (
        <div className="h-48 flex items-end justify-between gap-2 animate-pulse">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="bg-slate-200 w-8 rounded-t dark:bg-slate-800" style={{ height: `${20 * (idx + 1)}px` }} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-48">
          <div className="flex-1 flex items-end justify-between gap-4 mt-2">
            {rates.map((item) => (
              <div key={item.day} className="flex flex-col items-center flex-1 group">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-32 relative overflow-hidden flex items-end justify-center">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 rounded-t-lg w-full transition-all duration-500"
                    style={{ height: `${item.rate}%` }}
                  />
                  <span className="absolute bottom-2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.rate}%
                  </span>
                </div>
                <span className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
