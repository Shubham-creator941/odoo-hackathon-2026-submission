import { useState } from 'react'
import { DollarSign, Calendar, Users, ClipboardCheck, Search, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import SectionHeader from '@/components/ui/SectionHeader'
import Pagination from '@/components/ui/Pagination'
import { toast } from 'sonner'

interface PayrollRecord {
  id: string
  employeeName: string
  department: string
  basicSalary: number
  allowances: number
  deductions: number
  netPay: number
  status: 'Paid' | 'Scheduled' | 'Pending'
  payDate: string
}

const mockPayroll: PayrollRecord[] = [
  {
    id: '1',
    employeeName: 'Jane Smith',
    department: 'Engineering',
    basicSalary: 8500,
    allowances: 450,
    deductions: 120,
    netPay: 8830,
    status: 'Paid',
    payDate: '2026-06-30',
  },
  {
    id: '2',
    employeeName: 'David Johnson',
    department: 'Marketing',
    basicSalary: 6200,
    allowances: 300,
    deductions: 90,
    netPay: 6410,
    status: 'Paid',
    payDate: '2026-06-30',
  },
  {
    id: '3',
    employeeName: 'Emily Davis',
    department: 'Human Resources',
    basicSalary: 5500,
    allowances: 250,
    deductions: 80,
    netPay: 5670,
    status: 'Paid',
    payDate: '2026-06-30',
  },
  {
    id: '4',
    employeeName: 'Bob Miller',
    department: 'Engineering',
    basicSalary: 9200,
    allowances: 600,
    deductions: 150,
    netPay: 9650,
    status: 'Pending',
    payDate: '2026-07-30',
  },
  {
    id: '5',
    employeeName: 'Alice Williams',
    department: 'Finance',
    basicSalary: 7100,
    allowances: 350,
    deductions: 100,
    netPay: 7350,
    status: 'Scheduled',
    payDate: '2026-07-30',
  },
]

export default function AdminPayrollPage() {
  const [search, setSearch] = useState('')
  const [records, setRecords] = useState<PayrollRecord[]>(mockPayroll)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPayroll = records.reduce((sum, r) => sum + r.netPay, 0)
  const paidCount = records.filter((r) => r.status === 'Paid').length
  const pendingCount = records.filter((r) => r.status === 'Pending').length

  const handleProcessPayroll = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setRecords(records.map(r => r.status === 'Pending' ? { ...r, status: 'Paid', payDate: new Date().toISOString().split('T')[0] } : r))
      toast.success('Payroll Processed Successfully', {
        description: 'Disbursements have been initiated for all pending employees.',
      })
    }, 1500)
  }

  const filteredRecords = records.filter((r) =>
    r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    r.department.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success">Paid</Badge>
      case 'Scheduled':
        return <Badge variant="info">Scheduled</Badge>
      case 'Pending':
        return <Badge variant="warning">Pending Approval</Badge>
      default:
        return <Badge variant="gray">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Payroll Management"
          description="Process compensation, track disbursements history, allowances, and deductions calculations across all employees."
        />
        {pendingCount > 0 && (
          <Button
            onClick={handleProcessPayroll}
            isLoading={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold self-start sm:self-center"
          >
            Process Pending Payroll
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Total Gross Net Pay</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">${totalPayroll.toLocaleString()}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Disbursed (Paid)</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{paidCount} Employees</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-955/30 dark:text-amber-400">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Awaiting Approvals</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount} Records</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-955/30 dark:text-indigo-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Next Pay Schedule</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">July 30th, 2026</h4>
          </div>
        </Card>
      </div>

      {/* Toolbar filter */}
      <Card className="p-4 flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search employee or department..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 text-xs"
          />
        </div>
      </Card>

      {/* Payroll Table */}
      <Card className="p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted border-collapse">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4 text-right">Basic Salary</th>
                <th className="px-6 py-4 text-right">Allowances</th>
                <th className="px-6 py-4 text-right">Deductions</th>
                <th className="px-6 py-4 text-right font-bold">Net Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Pay Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-app bg-card-app">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center">
                    <DollarSign className="h-10 w-10 text-slate-350 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text-muted">No payroll records matches selection criteria.</p>
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                    <td className="px-6 py-4 text-xs font-bold text-slate-800 dark:text-slate-200">{r.employeeName}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{r.department}</td>
                    <td className="px-6 py-4 text-xs text-right text-text-main">${r.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs text-right text-green-600 dark:text-green-400">+${r.allowances}</td>
                    <td className="px-6 py-4 text-xs text-right text-red-500">-${r.deductions}</td>
                    <td className="px-6 py-4 text-xs text-right font-bold text-slate-900 dark:text-white">${r.netPay.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(r.status)}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{r.payDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toast.success(`Downloading payslip for ${r.employeeName}...`)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                        title="Download Payslip"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredRecords.length}
          itemsPerPage={itemsPerPage}
        />
      </Card>
    </div>
  )
}
