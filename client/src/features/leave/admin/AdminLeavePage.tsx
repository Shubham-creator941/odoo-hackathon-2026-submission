import { useEffect, useState } from 'react'
import {
  Clock,
  CheckSquare,
  XSquare,
  Users,
  Search,
  Check,
  X,
  Eye,
  RefreshCw,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import Avatar from '@/components/ui/Avatar'
import { getLeaves, approveLeave, rejectLeave } from '../services/leave.api'
import type { LeaveRequest } from '../types'

export default function AdminLeavePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter states
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Modal detail states
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [managerComments, setManagerComments] = useState('')

  useEffect(() => {
    let active = true
    async function loadData() {
      setIsLoading(true)
      try {
        const data = await getLeaves()
        if (active) {
          setLeaves([...data])
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }
    loadData()
    return () => {
      active = false
    }
  }, [])

  const handleApprove = async (id: string) => {
    try {
      await approveLeave(id)
      toast.success('Leave Request Approved')
      setLeaves((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: 'Approved' } : l))
      )
      setIsDetailOpen(false)
    } catch {
      toast.error('Failed to approve request')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectLeave(id, managerComments)
      toast.error('Leave Request Rejected')
      setLeaves((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: 'Rejected', remarks: managerComments } : l))
      )
      setIsDetailOpen(false)
      setManagerComments('')
    } catch {
      toast.error('Failed to reject request')
    }
  }

  const handleResetFilters = () => {
    setSearch('')
    setDepartment('')
    setStatus('')
    setLeaveType('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
    toast.info('Filters Reset')
  }

  // Filter Logic
  const filteredLeaves = leaves.filter((lv) => {
    const matchesSearch =
      search.trim() === '' ||
      (lv.employeeName || '').toLowerCase().includes(search.toLowerCase()) ||
      (lv.employeeId || '').toLowerCase().includes(search.toLowerCase())

    const matchesDept = department === '' || lv.department === department
    const matchesStatus = status === '' || lv.status === status
    const matchesType = leaveType === '' || lv.leaveType === leaveType

    let matchesDate = true
    if (startDate) {
      matchesDate = matchesDate && new Date(lv.startDate) >= new Date(startDate)
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(lv.endDate) <= new Date(endDate)
    }

    return matchesSearch && matchesDept && matchesStatus && matchesType && matchesDate
  })

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage)
  const activePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedLeaves = filteredLeaves.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  )

  // Derived summaries
  const pendingCount = leaves.filter((l) => l.status === 'Pending').length
  const approvedCount = leaves.filter((l) => l.status === 'Approved').length
  const rejectedCount = leaves.filter((l) => l.status === 'Rejected').length
  const onLeaveCount = 4 // Static metric

  // Chart data calculations
  const distributionData = [
    { name: 'Annual Leave', value: leaves.filter((l) => l.leaveType === 'Annual Leave').length },
    { name: 'Sick Leave', value: leaves.filter((l) => l.leaveType === 'Sick Leave').length },
    { name: 'Casual Leave', value: leaves.filter((l) => l.leaveType === 'Casual Leave').length },
  ]
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b']

  const monthlyRequestsData = [
    { name: 'Jan', requests: 12 },
    { name: 'Feb', requests: 18 },
    { name: 'Mar', requests: 15 },
    { name: 'Apr', requests: 22 },
    { name: 'May', requests: 25 },
    { name: 'Jun', requests: leaves.length },
  ]

  const approvalRate = leaves.length > 0 
    ? Math.round((leaves.filter(l => l.status === 'Approved').length / leaves.filter(l => l.status !== 'Pending').length || 0) * 100)
    : 100

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Leave Management"
        description="Verify pending leaves requests, approve/reject applications, and monitor team availability logs."
      />

      {/* Top Summary Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-955/30 dark:text-amber-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Pending Requests</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <CheckSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Approved Today</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{approvedCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-955/30 dark:text-red-400">
            <XSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Rejected Today</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{rejectedCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Employees On Leave</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{onLeaveCount}</h4>
          </div>
        </Card>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Leave Distribution</h3>
            <p className="text-xs text-text-muted mb-4">Percentage allocation per leave category</p>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                  {distributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e5e7eb',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: '8px',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} iconSize={10} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Monthly Requests</h3>
            <p className="text-xs text-text-muted mb-4">Total requests logged over time</p>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRequestsData} margin={{ left: -25, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e5e7eb'} />
                <XAxis dataKey="name" fontSize={10} stroke={isDark ? '#94a3b8' : '#475569'} tickLine={false} />
                <YAxis fontSize={10} stroke={isDark ? '#94a3b8' : '#475569'} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e5e7eb',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="requests" fill="#4f46e5" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="md:col-span-1 grid grid-rows-2 gap-4 border-0 p-0 shadow-none bg-transparent">
          <div className="p-5 border border-border-app bg-card-app rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-semibold text-text-muted">Approval Rate</p>
              <h4 className="text-3xl font-extrabold text-green-600 dark:text-green-400 mt-2">{approvalRate}%</h4>
              <p className="text-[10px] text-text-muted mt-1">out of finalized applications</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-green-150 flex items-center justify-center font-bold text-green-600 text-xs">
              OK
            </div>
          </div>

          <div className="p-5 border border-border-app bg-card-app rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-semibold text-text-muted">Avg Resolution Time</p>
              <h4 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">1.2 hrs</h4>
              <p className="text-[10px] text-text-muted mt-1">standard SLA response rate</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-blue-150 flex items-center justify-center font-bold text-blue-600 text-xs">
              SLA
            </div>
          </div>
        </Card>
      </div>

      {/* Filters Toolbar Row */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {/* Employee search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search employee / ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 text-xs"
            />
          </div>

          {/* Department selection */}
          <Select
            options={[
              { label: 'All Departments', value: '' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Human Resources', value: 'Human Resources' },
              { label: 'Finance', value: 'Finance' },
              { label: 'Product Development', value: 'Product Development' },
            ]}
            value={department}
            onChange={(e) => { setDepartment(e.target.value); setCurrentPage(1); }}
            className="text-xs"
          />

          {/* Status selection */}
          <Select
            options={[
              { label: 'All Statuses', value: '' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ]}
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="text-xs"
          />

          {/* Leave Type selection */}
          <Select
            options={[
              { label: 'All Leave Types', value: '' },
              { label: 'Annual Leave', value: 'Annual Leave' },
              { label: 'Sick Leave', value: 'Sick Leave' },
              { label: 'Casual Leave', value: 'Casual Leave' },
              { label: 'Maternity/Paternity', value: 'Maternity/Paternity' },
            ]}
            value={leaveType}
            onChange={(e) => { setLeaveType(e.target.value); setCurrentPage(1); }}
            className="text-xs"
          />

          {/* Reset button */}
          <Button variant="outline" onClick={handleResetFilters} className="text-xs font-semibold flex items-center justify-center gap-1.5 w-full">
            <RefreshCw className="h-3.5 w-3.5" /> Reset Filters
          </Button>
        </div>

        {/* Date Filters */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border-app pt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-muted">From:</span>
            <Input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} className="text-xs h-9" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-muted">To:</span>
            <Input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} className="text-xs h-9" />
          </div>
        </div>
      </Card>

      {/* Main Leave Approval Table */}
      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-6"><LoadingSkeleton type="table" count={5} /></div>
        ) : filteredLeaves.length === 0 ? (
          <div className="py-12"><EmptyState title="No requests found" description="No leaves requests logged matching these parameters." /></div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-text-muted border-collapse">
              <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Leave Type</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">End Date</th>
                  <th className="px-6 py-4 text-center">Duration</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-app bg-card-app">
                {paginatedLeaves.map((lv) => (
                  <tr key={lv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar name={lv.employeeName || 'Unknown'} size="sm" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{lv.employeeName}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-text-muted">{lv.employeeId}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{lv.department}</td>
                    <td className="px-6 py-4 text-xs font-bold text-indigo-650 dark:text-indigo-400">{lv.leaveType}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{lv.startDate}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{lv.endDate}</td>
                    <td className="px-6 py-4 text-xs text-center font-semibold text-text-main">{lv.duration}</td>
                    <td className="px-6 py-4"><StatusBadge status={lv.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(lv)
                            setManagerComments(lv.remarks || '')
                            setIsDetailOpen(true)
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                          title="View Request Details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        {lv.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(lv.id)}
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                              title="Approve"
                            >
                              <Check className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequest(lv)
                                setManagerComments('')
                                setIsDetailOpen(true)
                              }}
                              className="p-1.5 rounded-lg text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20"
                              title="Reject"
                            >
                              <X className="h-4.5 w-4.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredLeaves.length}
          itemsPerPage={itemsPerPage}
        />
      </Card>

      {/* Leave Details / Verification Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Verify Leave Request">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
              <Avatar name={selectedRequest.employeeName || 'Unknown'} />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{selectedRequest.employeeName}</h4>
                <p className="text-xs text-text-muted mt-0.5">{selectedRequest.employeeId} • {selectedRequest.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-border-app py-4 text-xs font-semibold">
              <div>
                <p className="text-slate-400">LEAVE TYPE</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.leaveType}</p>
              </div>
              <div>
                <p className="text-slate-400">DURATION</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.duration}</p>
              </div>
              <div>
                <p className="text-slate-400">FROM DATE</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.startDate}</p>
              </div>
              <div>
                <p className="text-slate-400">TO DATE</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.endDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400">REASON</p>
                <p className="text-slate-850 dark:text-slate-250 mt-1 leading-relaxed">{selectedRequest.reason}</p>
              </div>
              {selectedRequest.status !== 'Pending' && selectedRequest.remarks && (
                <div className="col-span-2">
                  <p className="text-slate-400">MANAGER REMARKS</p>
                  <p className="text-slate-850 dark:text-slate-250 mt-1 leading-relaxed bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-border-app">
                    {selectedRequest.remarks}
                  </p>
                </div>
              )}
            </div>

            {/* Supporting Documents Placeholder */}
            <div className="p-3 border border-border-app bg-slate-50/20 dark:bg-slate-900/10 rounded-lg flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-blue-500" />
                <span>Supporting_Medical_Certificate.pdf</span>
              </div>
              <span className="text-[10px] text-slate-400">Mock Document</span>
            </div>

            {/* Approve / Reject actions for Admin */}
            {selectedRequest.status === 'Pending' ? (
              <div className="space-y-4 pt-3">
                <div>
                  <label className="block text-xs font-bold text-text-main mb-1.5">Remarks / Comments</label>
                  <textarea
                    rows={2}
                    placeholder="Enter approval details or rejection reasons..."
                    value={managerComments}
                    onChange={(e) => setManagerComments(e.target.value)}
                    className="w-full rounded-lg border border-border-app bg-card-app text-text-main px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-border-app">
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedRequest.id)}
                    variant="danger"
                    className="bg-red-650 hover:bg-red-700 text-white font-bold"
                  >
                    Reject Request
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    Approve Request
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end pt-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
