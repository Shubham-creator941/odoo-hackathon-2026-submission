import { useState } from 'react'
import { DollarSign, Calendar, Users, ClipboardCheck, Search, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import SectionHeader from '@/components/ui/SectionHeader'
import Pagination from '@/components/ui/Pagination'
import { toast } from 'sonner'
import { mockPayrollRecords, type PayrollRecord } from '../mock/payroll'

export default function AdminPayrollPage() {
  const [search, setSearch] = useState('')
  const [records, setRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPayroll = records.reduce((sum, r) => sum + r.netPay, 0)
  const paidCount = records.filter((r) => r.status === 'Paid').length
  const pendingCount = records.filter((r) => r.status === 'Pending').length

  const handleGeneratePayroll = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setRecords(
        records.map((r) =>
          r.status === 'Pending'
            ? { ...r, status: 'Paid' as const, payDate: new Date().toISOString().split('T')[0] }
            : r
        )
      )
      toast.success('Payroll generated successfully', {
        description: 'Disbursements initiated for all pending employees.',
      })
    }, 1500)
  }

  const filteredRecords = records.filter(
    (r) =>
      r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusBadge = (status: PayrollRecord['status']) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success">Paid</Badge>
      case 'Scheduled':
        return <Badge variant="info">Scheduled</Badge>
      case 'Pending':
        return <Badge variant="warning">Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Payroll Management"
          description="Manage payroll batches, salary summaries, and payslip disbursements."
        />
        {pendingCount > 0 && (
          <Button onClick={handleGeneratePayroll} isLoading={isProcessing}>
            Generate Payroll
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Salary Summary</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              ${totalPayroll.toLocaleString()}
            </h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Disbursed</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{paidCount}</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Pending Payroll</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount}</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Next Pay Date</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">July 30, 2026</h4>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search employee or department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 text-xs"
            aria-label="Search payroll records"
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4 text-right">Basic</th>
                <th className="px-6 py-4 text-right">Net Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Pay Date</th>
                <th className="px-6 py-4 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-app">
              {paginatedRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-bold">{r.employeeName}</td>
                  <td className="px-6 py-4 text-xs text-text-muted">{r.department}</td>
                  <td className="px-6 py-4 text-xs text-right">${r.basicSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs text-right font-bold">${r.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4">{getStatusBadge(r.status)}</td>
                  <td className="px-6 py-4 text-xs text-text-muted">{r.payDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toast.success(`Downloading payslip for ${r.employeeName}...`)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label={`Download payslip for ${r.employeeName}`}
                    >
                      <Download className="h-4 w-4" />
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
          totalItems={filteredRecords.length}
          itemsPerPage={itemsPerPage}
        />
      </Card>
    </div>
  )
}
