import Card from '@/components/ui/Card'
import { CalendarCheck, FileText, CalendarX, Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  user: string
  action: string
  time: string
  type: string
}

interface RecentActivitiesProps {
  activities: ActivityItem[]
  isLoading?: boolean
}

export default function RecentActivities({ activities, isLoading }: RecentActivitiesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return CalendarCheck
      case 'document':
        return FileText
      case 'leave':
        return CalendarX
      default:
        return Activity
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20'
      case 'document':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20'
      case 'leave':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20'
      default:
        return 'text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-800/40'
    }
  }

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Recent Activity Timeline
      </h3>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-14 bg-slate-50 dark:bg-slate-800/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="relative pl-6 border-l border-border-app space-y-6">
          {activities.map((item) => {
            const IconComponent = getIcon(item.type)
            return (
              <div key={item.id} className="relative">
                {/* Timeline node dot */}
                <div className={`absolute -left-[35px] top-1 p-1 rounded-full border border-border-app bg-white dark:bg-slate-900 ${getColor(item.type)}`}>
                  <IconComponent className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-slate-900 dark:text-white">{item.user}</span>{' '}
                    {item.action}
                  </p>
                  <p className="text-xs text-text-muted mt-1 font-medium">{item.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
