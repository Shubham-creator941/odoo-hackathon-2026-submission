import { cn } from '@/utils'

interface LoadingSkeletonProps {
  type?: 'table' | 'cards' | 'details'
  count?: number
  className?: string
}

export default function LoadingSkeleton({
  type = 'table',
  count = 5,
  className,
}: LoadingSkeletonProps) {
  return (
    <div className={cn("w-full space-y-4 animate-pulse", className)}>
      {type === 'table' && (
        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="h-12 bg-slate-50 border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700" />
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className="h-16 flex items-center px-6 gap-4">
                <div className="h-4 bg-slate-200 rounded w-1/4 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-1/6 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-1/5 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-1/12 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'cards' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-200 rounded w-1/2 dark:bg-slate-800" />
                <div className="h-8 w-8 bg-slate-200 rounded dark:bg-slate-800" />
              </div>
              <div className="mt-4 h-8 bg-slate-200 rounded w-1/3 dark:bg-slate-800" />
              <div className="mt-2 h-3 bg-slate-200 rounded w-2/3 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      )}

      {type === 'details' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-5 bg-slate-200 rounded w-1/2 dark:bg-slate-800" />
            <div className="mt-2 h-3 bg-slate-200 rounded w-1/3 dark:bg-slate-800" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="h-5 bg-slate-200 rounded w-1/4 dark:bg-slate-800" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4 bg-slate-200 rounded w-2/3 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-1/2 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-3/4 dark:bg-slate-800" />
                <div className="h-4 bg-slate-200 rounded w-2/3 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
