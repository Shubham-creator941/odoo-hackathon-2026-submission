import type { AttendanceRecord } from '../types'
import { Calendar, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'

interface AttendanceStatsProps {
  logs: AttendanceRecord[]
  isLoading?: boolean
}

export default function AttendanceStats({ logs, isLoading }: AttendanceStatsProps) {
  const total = logs.length
  const present = logs.filter((l) => l.status === 'Present').length
  const late = logs.filter((l) => l.status === 'Late').length
  const absent = logs.filter((l) => l.status === 'Absent').length
  const halfDay = logs.filter((l) => l.status === 'Half Day').length

  const presentTotal = present + late + halfDay * 0.5
  const rate = total > 0 ? Math.round((presentTotal / total) * 100) : 0

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
      <StatCard title="Attendance Rate" value={`${rate}%`} icon={Calendar} />
      <StatCard title="Present Days" value={present} icon={CheckCircle2} />
      <StatCard title="Late Arrivals" value={late} icon={AlertTriangle} />
      <StatCard title="Absent Days" value={absent} icon={XCircle} />
    </div>
  )
}
