import type { Employee } from '../types'
import { Mail, Phone } from 'lucide-react'

interface ContactCardProps {
  employee: Employee
}

export default function ContactCard({ employee }: ContactCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Contact Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Email Address</p>
            <a
              href={`mailto:${employee.email}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-500 mt-0.5 block"
            >
              {employee.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Phone Number</p>
            <a
              href={`tel:${employee.phoneNumber}`}
              className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block"
            >
              {employee.phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
