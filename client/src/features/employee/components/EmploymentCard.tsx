import type { Employee } from '../types'
import { Briefcase, Calendar, ShieldCheck, Hash } from 'lucide-react'

interface EmploymentCardProps {
  employee: Employee
}

export default function EmploymentCard({ employee }: EmploymentCardProps) {
  const details = [
    { label: 'Employee ID', value: employee.employeeId, icon: Hash },
    { label: 'Department', value: employee.department, icon: Briefcase },
    { label: 'Designation', value: employee.designation, icon: Briefcase },
    { label: 'System Role', value: employee.role === 'admin' ? 'Administrator' : 'Employee', icon: ShieldCheck },
    { label: 'Joining Date', value: employee.joiningDate, icon: Calendar },
  ]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Employment Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="p-2 rounded bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{item.label}</p>
              <p className="text-sm font-semibold text-slate-850 dark:text-slate-200 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
