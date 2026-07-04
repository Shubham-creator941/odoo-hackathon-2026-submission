import { useState } from 'react'
import { DollarSign, Calendar, FileText, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import Pagination from '@/components/ui/Pagination'
import { toast } from 'sonner'

interface PayslipRecord {
  id: string
  period: string
  basicSalary: number
  allowances: number
  deductions: number
  netPay: number
  status: 'Paid' | 'Pending'
  payDate: string
}

const mockPersonalPayslips: PayslipRecord[] = [
  {
    id: 'P-001',
    period: 'June 2026',
    basicSalary: 8500,
    allowances: 450,
    deductions: 120,
    netPay: 8830,
    status: 'Paid',
    payDate: '2026-06-30',
  },
  {
    id: 'P-002',
    period: 'May 2026',
    basicSalary: 8500,
    allowances: 450,
    deductions: 120,
    netPay: 8830,
    status: 'Paid',
    payDate: '2026-05-30',
  },
  {
    id: 'P-003',
    period: 'April 2026',
    basicSalary: 8500,
    allowances: 450,
    deductions: 120,
    netPay: 8830,
    status: 'Paid',
    payDate: '2026-04-30',
  },
]

export default function EmployeePayslipPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(mockPersonalPayslips.length / itemsPerPage)
  const paginatedPayslips = mockPersonalPayslips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDownload = (period: string) => {
    toast.success(`Downloading payslip for ${period}...`, {
      description: 'Your payslip PDF is being generated and downloaded.',
    })
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Payslips"
        description="View your compensation breakdown, monthly salary disbursements, and download official payslips."
      />

      {/* Salary Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Basic Monthly Salary</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">$8,500</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Monthly Allowances</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">$450</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-955/30 dark:text-red-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Deductions (Tax & Ins)</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">$120</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-955/30 dark:text-indigo-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Next Disbursement</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">July 30th</h4>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-app flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Payslips History</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted border-collapse">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
              <tr>
                <th className="px-6 py-4">Pay Period</th>
                <th className="px-6 py-4">Disbursement Date</th>
                <th className="px-6 py-4 text-right">Basic Salary</th>
                <th className="px-6 py-4 text-right">Allowances</th>
                <th className="px-6 py-4 text-right">Deductions</th>
                <th className="px-6 py-4 text-right font-bold">Net Pay Received</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-app bg-card-app">
              {paginatedPayslips.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                  <td className="px-6 py-4 text-xs font-bold text-slate-850 dark:text-slate-200">{p.period}</td>
                  <td className="px-6 py-4 text-xs text-text-muted">{p.payDate}</td>
                  <td className="px-6 py-4 text-xs text-right text-text-main">${p.basicSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs text-right text-green-600 dark:text-green-400">+${p.allowances}</td>
                  <td className="px-6 py-4 text-xs text-right text-red-500">-${p.deductions}</td>
                  <td className="px-6 py-4 text-xs text-right font-bold text-slate-900 dark:text-white">${p.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Disbursed</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDownload(p.period)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                      title="Download PDF"
                    >
                      <Download className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={mockPersonalPayslips.length}
          itemsPerPage={itemsPerPage}
        />
      </Card>
    </div>
  )
}
