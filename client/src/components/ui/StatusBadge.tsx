import { cn } from '@/utils'

export type StatusType =
  | 'active'
  | 'inactive'
  | 'present'
  | 'absent'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'late'
  | 'half day'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const cleanStatus = status.toLowerCase().trim() as StatusType

  const styles: Record<StatusType, string> = {
    active: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/30",
    present: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/30",
    approved: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/30",
    inactive: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
    'half day': "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
    absent: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30",
    rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30",
    late: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30",
  }

  const style = styles[cleanStatus] || "bg-slate-50 text-slate-700 border-slate-200"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        style,
        className
      )}
    >
      {status}
    </span>
  )
}
