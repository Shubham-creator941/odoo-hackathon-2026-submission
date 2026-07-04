import { useEffect, useState, useMemo } from 'react'
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
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'
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
import Checkbox from '@/components/ui/Checkbox'
import Textarea from '@/components/ui/Textarea'
import {
  getLeaves,
  approveLeave,
  rejectLeave,
  bulkApproveLeaves,
  bulkRejectLeaves,
} from '../services/leave.api'
import type { LeaveRequest } from '../types'

const TODAY = '2026-07-04'

const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Finance',
  'Sales',
  'Marketing',
  'Operations',
]

export default function AdminLeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const itemsPerPage = 8

  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [managerComments, setManagerComments] = useState('')

  async function loadData() {
    setIsLoading(true)
    try {
      const data = await getLeaves()
      setLeaves([...data])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      await approveLeave(id)
      toast.success('Leave request approved')
      setLeaves((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: 'Approved' as const, resolvedDate: TODAY } : l
        )
      )
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      setIsDetailOpen(false)
    } catch {
      toast.error('Failed to approve request')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectLeave(id, managerComments)
      toast.error('Leave request rejected')
      setLeaves((prev) =>
        prev.map((l) =>
          l.id === id
            ? { ...l, status: 'Rejected' as const, remarks: managerComments, resolvedDate: TODAY }
            : l
        )
      )
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      setIsDetailOpen(false)
      setManagerComments('')
    } catch {
      toast.error('Failed to reject request')
    }
  }

  const handleBulkApprove = async () => {
    const ids = [...selectedIds]
    if (ids.length === 0) return
    await bulkApproveLeaves(ids)
    toast.success(`${ids.length} request(s) approved`)
    setLeaves((prev) =>
      prev.map((l) =>
        selectedIds.has(l.id) && l.status === 'Pending'
          ? { ...l, status: 'Approved' as const, resolvedDate: TODAY }
          : l
      )
    )
    setSelectedIds(new Set())
  }

  const handleBulkReject = async () => {
    const ids = [...selectedIds]
    if (ids.length === 0) return
    await bulkRejectLeaves(ids, managerComments || 'Bulk rejected by administrator')
    toast.error(`${ids.length} request(s) rejected`)
    setLeaves((prev) =>
      prev.map((l) =>
        selectedIds.has(l.id) && l.status === 'Pending'
          ? {
              ...l,
              status: 'Rejected' as const,
              remarks: managerComments || 'Bulk rejected by administrator',
              resolvedDate: TODAY,
            }
          : l
      )
    )
    setSelectedIds(new Set())
    setManagerComments('')
  }

  const handleResetFilters = () => {
    setSearch('')
    setDepartment('')
    setStatus('')
    setLeaveType('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
  }

  const filteredLeaves = useMemo(
    () =>
      leaves.filter((lv) => {
        const matchesSearch =
          search.trim() === '' ||
          (lv.employeeName ?? '').toLowerCase().includes(search.toLowerCase()) ||
          (lv.employeeId ?? '').toLowerCase().includes(search.toLowerCase())
        const matchesDept = department === '' || lv.department === department
        const matchesStatus = status === '' || lv.status === status
        const matchesType = leaveType === '' || lv.leaveType === leaveType
        let matchesDate = true
        if (startDate) matchesDate = matchesDate && new Date(lv.startDate) >= new Date(startDate)
        if (endDate) matchesDate = matchesDate && new Date(lv.endDate) <= new Date(endDate)
        return matchesSearch && matchesDept && matchesStatus && matchesType && matchesDate
      }),
    [leaves, search, department, status, leaveType, startDate, endDate]
  )

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage) || 1
  const activePage = Math.min(currentPage, totalPages)
  const paginatedLeaves = filteredLeaves.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  )

  const pendingCount = leaves.filter((l) => l.status === 'Pending').length
  const approvedToday = leaves.filter(
    (l) => l.status === 'Approved' && l.resolvedDate === TODAY
  ).length
  const rejectedToday = leaves.filter(
    (l) => l.status === 'Rejected' && l.resolvedDate === TODAY
  ).length
  const onLeaveToday = leaves.filter(
    (l) =>
      l.status === 'Approved' &&
      TODAY >= l.startDate &&
      TODAY <= l.endDate
  ).length

  const pendingOnPage = paginatedLeaves.filter((l) => l.status === 'Pending')
  const allPendingSelected =
    pendingOnPage.length > 0 && pendingOnPage.every((l) => selectedIds.has(l.id))

  const toggleSelectAll = () => {
    if (allPendingSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(pendingOnPage.map((l) => l.id)))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Leave Approval"
        description="Review pending requests, approve or reject applications, and monitor team availability."
      />

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
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{approvedToday}</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-955/30 dark:text-red-400">
            <XSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Rejected Today</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{rejectedToday}</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Employees On Leave</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{onLeaveToday}</h4>
          </div>
        </Card>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9 text-xs"
              aria-label="Search employees"
            />
          </div>
          <Select
            options={[
              { label: 'All Departments', value: '' },
              ...DEPARTMENTS.map((d) => ({ label: d, value: d })),
            ]}
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value)
              setCurrentPage(1)
            }}
            className="text-xs"
            aria-label="Filter by department"
          />
          <Select
            options={[
              { label: 'All Statuses', value: '' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ]}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="text-xs"
            aria-label="Filter by status"
          />
          <Select
            options={[
              { label: 'All Leave Types', value: '' },
              { label: 'Annual Leave', value: 'Annual Leave' },
              { label: 'Sick Leave', value: 'Sick Leave' },
              { label: 'Casual Leave', value: 'Casual Leave' },
              { label: 'Maternity/Paternity', value: 'Maternity/Paternity' },
            ]}
            value={leaveType}
            onChange={(e) => {
              setLeaveType(e.target.value)
              setCurrentPage(1)
            }}
            className="text-xs"
            aria-label="Filter by leave type"
          />
          <Button variant="outline" onClick={handleResetFilters} className="text-xs font-semibold">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Reset
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 border-t border-border-app pt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-muted">From:</span>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setCurrentPage(1)
              }}
              className="text-xs h-9"
              aria-label="Start date filter"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-muted">To:</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                setCurrentPage(1)
              }}
              className="text-xs h-9"
              aria-label="End date filter"
            />
          </div>
        </div>
      </Card>

      {selectedIds.size > 0 && (
        <Card className="p-4 flex flex-wrap items-center justify-between gap-3 bg-indigo-50/50 dark:bg-indigo-950/20">
          <span className="text-sm font-semibold text-text-main">
            {selectedIds.size} request(s) selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700 text-white">
              Bulk Approve
            </Button>
            <Button size="sm" variant="danger" onClick={handleBulkReject}>
              Bulk Reject
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <LoadingSkeleton type="table" count={5} />
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="py-12">
            <EmptyState title="No requests found" description="No leave requests match your filters." />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-text-muted border-collapse">
              <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
                <tr>
                  <th className="px-4 py-4 w-10">
                    <Checkbox
                      checked={allPendingSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all pending requests"
                    />
                  </th>
                  <th className="px-4 py-4">Employee</th>
                  <th className="px-4 py-4">Department</th>
                  <th className="px-4 py-4">Leave Type</th>
                  <th className="px-4 py-4">Start</th>
                  <th className="px-4 py-4">End</th>
                  <th className="px-4 py-4">Reason</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-app bg-card-app">
                {paginatedLeaves.map((lv) => (
                  <tr key={lv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="px-4 py-4">
                      {lv.status === 'Pending' && (
                        <Checkbox
                          checked={selectedIds.has(lv.id)}
                          onChange={() => toggleSelect(lv.id)}
                          aria-label={`Select ${lv.employeeName}`}
                        />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={lv.employeeName ?? 'Unknown'} size="sm" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{lv.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs">{lv.department}</td>
                    <td className="px-4 py-4 text-xs font-bold text-indigo-650 dark:text-indigo-400">{lv.leaveType}</td>
                    <td className="px-4 py-4 text-xs">{lv.startDate}</td>
                    <td className="px-4 py-4 text-xs">{lv.endDate}</td>
                    <td className="px-4 py-4 text-xs max-w-[180px] truncate" title={lv.reason}>
                      {lv.reason}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={lv.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedRequest(lv)
                            setManagerComments(lv.remarks ?? '')
                            setIsDetailOpen(true)
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="View details"
                          aria-label="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {lv.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(lv.id)}
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                              title="Approve"
                              aria-label="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequest(lv)
                                setManagerComments('')
                                setIsDetailOpen(true)
                              }}
                              className="p-1.5 rounded-lg text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20"
                              title="Reject"
                              aria-label="Reject"
                            >
                              <X className="h-4 w-4" />
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

      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Leave Request Details">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
              <Avatar name={selectedRequest.employeeName ?? 'Unknown'} />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{selectedRequest.employeeName}</h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {selectedRequest.employeeId} · {selectedRequest.department}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-border-app py-4 text-xs font-semibold">
              <div>
                <p className="text-slate-400">MANAGER</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.manager ?? '—'}</p>
              </div>
              <div>
                <p className="text-slate-400">LEAVE TYPE</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.leaveType}</p>
              </div>
              <div>
                <p className="text-slate-400">FROM</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.startDate}</p>
              </div>
              <div>
                <p className="text-slate-400">TO</p>
                <p className="text-slate-850 dark:text-slate-200 mt-1">{selectedRequest.endDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400">REASON</p>
                <p className="text-slate-850 dark:text-slate-250 mt-1 leading-relaxed">{selectedRequest.reason}</p>
              </div>
            </div>

            {(selectedRequest.supportingDocuments?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-text-muted">Supporting Documents</p>
                {selectedRequest.supportingDocuments?.map((doc) => (
                  <div
                    key={doc}
                    className="p-3 border border-border-app rounded-lg flex items-center justify-between text-xs font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>{doc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedRequest.status === 'Pending' ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-text-main mb-1.5">Remarks</label>
                  <Textarea
                    rows={2}
                    placeholder="Approval notes or rejection reason..."
                    value={managerComments}
                    onChange={(e) => setManagerComments(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-border-app">
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={() => handleReject(selectedRequest.id)}>
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Approve
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
