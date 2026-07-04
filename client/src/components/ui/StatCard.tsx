import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    type: 'up' | 'down' | 'neutral'
  }
  description?: string
  className?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
}: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>
        {(trend || description) && (
          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold px-1.5 py-0.5 rounded",
                  trend.type === 'up' && "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400",
                  trend.type === 'down' && "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
                  trend.type === 'neutral' && "bg-slate-50 text-slate-700 dark:bg-slate-850 dark:text-slate-400"
                )}
              >
                {trend.value}
              </span>
            )}
            {description && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
