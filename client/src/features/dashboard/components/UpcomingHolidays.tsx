import Card from '@/components/ui/Card'
import { Calendar } from 'lucide-react'

interface Holiday {
  date: string
  name: string
  type: string
}

interface UpcomingHolidaysProps {
  holidays: Holiday[]
  isLoading?: boolean
}

export default function UpcomingHolidays({ holidays, isLoading }: UpcomingHolidaysProps) {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Upcoming Holidays
      </h3>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-12 bg-slate-50 dark:bg-slate-800/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3.5">
          {holidays.map((holiday, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-lg border border-border-app bg-slate-50/30 dark:bg-slate-900/10 hover:shadow-sm transition-all"
            >
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{holiday.name}</p>
                <p className="text-xs text-text-muted mt-0.5 font-medium">{holiday.date} • {holiday.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
