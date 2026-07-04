import type { Employee } from '../types'
import { Users, UserCheck, UserX, FolderOpen } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'

interface EmployeeStatsProps {
  employees: Employee[]
  isLoading?: boolean
}

export default function EmployeeStats({ employees, isLoading }: EmployeeStatsProps) {
  const total = employees.length
  const active = employees.filter((e) => e.status === 'Active').length
  const inactive = total - active
  const departments = new Set(employees.map((e) => e.department)).size

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
      <StatCard title="Total Directory" value={total} icon={Users} />
      <StatCard title="Active Status" value={active} icon={UserCheck} />
      <StatCard title="Inactive Status" value={inactive} icon={UserX} />
      <StatCard title="Departments" value={departments} icon={FolderOpen} />
    </div>
  )
}
