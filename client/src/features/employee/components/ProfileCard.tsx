import type { Employee } from '../types'
import StatusBadge from '@/components/ui/StatusBadge'

interface ProfileCardProps {
  employee: Employee
}

export default function ProfileCard({ employee }: ProfileCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-3xl text-slate-700 dark:text-slate-200 mb-4">
        {employee.avatar || employee.fullName.slice(0, 2).toUpperCase()}
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {employee.fullName}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {employee.designation}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
        {employee.department}
      </p>
      <div className="mt-4">
        <StatusBadge status={employee.status} />
      </div>
    </div>
  )
}
