import Card from '@/components/ui/Card'
import { Gift } from 'lucide-react'

interface Birthday {
  name: string
  department: string
  date: string
  avatar: string
}

interface TodayBirthdaysProps {
  birthdays: Birthday[]
  isLoading?: boolean
}

export default function TodayBirthdays({ birthdays, isLoading }: TodayBirthdaysProps) {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Celebrating Birthdays
      </h3>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((n) => (
            <div key={n} className="h-12 bg-slate-50 dark:bg-slate-800/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3.5">
          {birthdays.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-lg border border-border-app bg-slate-50/30 dark:bg-slate-900/10 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-950/30 text-pink-650 dark:text-pink-400 font-bold flex items-center justify-center text-sm">
                {b.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{b.name}</p>
                <p className="text-xs text-text-muted mt-0.5 font-medium">{b.department} • {b.date}</p>
              </div>
              <div className="text-pink-500 p-1.5 bg-pink-50 dark:bg-pink-950/20 rounded-full">
                <Gift className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
