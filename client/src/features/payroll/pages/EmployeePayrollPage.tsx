import { useState } from 'react'
import { DollarSign, Download, FileText } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockPayrollRecords } from '../mock/payroll'
import { useAuth } from '@/context/AuthContext'

export default function EmployeePayrollPage() {
  const { user } = useAuth()
  const [records] = useState(
    mockPayrollRecords.filter((r) => r.employeeId === user?.employeeId || r.employeeName === 'Jane Smith')
  )

  const latestPaid = records.find((r) => r.status === 'Paid')
  const upcoming = records.find((r) => r.status === 'Scheduled' || r.status === 'Pending')

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Payslips"
        description="View and download your salary statements and payment history."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Last Payslip</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {latestPaid ? `$${latestPaid.netPay.toLocaleString()}` : '—'}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">{latestPaid?.period ?? 'No records'}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Upcoming Payslip</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {upcoming ? `$${upcoming.netPay.toLocaleString()}` : '—'}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">Due {upcoming?.payDate ?? '—'}</p>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
              <tr>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4 text-right">Gross</th>
                <th className="px-6 py-4 text-right">Deductions</th>
                <th className="px-6 py-4 text-right">Net Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-app">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-bold">{r.period}</td>
                  <td className="px-6 py-4 text-xs text-right">
                    ${(r.basicSalary + r.allowances).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-right text-red-500">-${r.deductions}</td>
                  <td className="px-6 py-4 text-xs text-right font-bold">${r.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={r.status === 'Paid' ? 'success' : r.status === 'Pending' ? 'warning' : 'info'}>
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {r.status === 'Paid' && (
                      <button
                        onClick={() => toast.success(`Downloading ${r.period} payslip...`)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label={`Download ${r.period} payslip`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
