import { Inbox } from 'lucide-react'
import { cn } from '@/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export default function EmptyState({
  title = "No data found",
  description = "There are no records to display matching your criteria.",
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900", className)}>
      <div className="rounded-full bg-slate-50 p-4 text-slate-400 dark:bg-slate-800">
        <Inbox className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm dark:text-slate-400">
        {description}
      </p>
    </div>
  )
}
