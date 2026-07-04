import type { LeaveRequest, LeaveBalance } from '../types'
import { Clock, CheckSquare, XSquare, Plus } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'

interface LeaveSummaryProps {
  leaves: LeaveRequest[]
  balances: LeaveBalance[]
  isLoading?: boolean
}

export default function LeaveSummary({ leaves, balances, isLoading }: LeaveSummaryProps) {
  const pending = leaves.filter((l) => l.status === 'Pending').length
  const approved = leaves.filter((l) => l.status === 'Approved').length
  const rejected = leaves.filter((l) => l.status === 'Rejected').length
  const totalRemaining = balances.reduce((sum, item) => sum + item.remaining, 0)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-28 bg-slate-100 rounded-xl animate-pulse dark:bg-slate-800" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard title="Remaining Balance" value={`${totalRemaining} Days`} icon={Plus} />
      <StatCard title="Pending Requests" value={pending} icon={Clock} />
      <StatCard title="Approved Requests" value={approved} icon={CheckSquare} />
      <StatCard title="Rejected Requests" value={rejected} icon={XSquare} />
    </div>
  )
}
