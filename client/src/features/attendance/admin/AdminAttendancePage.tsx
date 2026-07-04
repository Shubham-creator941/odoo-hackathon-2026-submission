import { useState } from 'react'
import { Search, RefreshCw, Calendar, Users, Clock, AlertTriangle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import StatusBadge from '@/components/ui/StatusBadge'
import Pagination from '@/components/ui/Pagination'

interface AdminAttendanceRecord {
  id: string
  employeeName: string
  employeeId: string
  department: string
  date: string
  checkIn: string
  checkOut: string
  workingHours: string
  status: 'Present' | 'Late' | 'Absent' | 'Half Day'
}

const mockAdminAttendanceLogs: AdminAttendanceRecord[] = [
  {
    id: 'ATT-001',
    employeeName: 'Jane Smith',
    employeeId: 'EMP-2026-0042',
    department: 'Engineering',
    date: '2026-07-03',
    checkIn: '08:58 AM',
    checkOut: '05:30 PM',
    workingHours: '8h 32m',
    status: 'Present',
  },
  {
    id: 'ATT-002',
    employeeName: 'David Johnson',
    employeeId: 'EMP-2026-0015',
    department: 'Marketing',
    date: '2026-07-03',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    workingHours: '8h 30m',
    status: 'Late',
  },
  {
    id: 'ATT-003',
    employeeName: 'Emily Davis',
    employeeId: 'EMP-2026-0008',
    department: 'Human Resources',
    date: '2026-07-03',
    checkIn: '08:55 AM',
    checkOut: '05:15 PM',
    workingHours: '8h 20m',
    status: 'Present',
  },
  {
    id: 'ATT-004',
    employeeName: 'Michael Brown',
    employeeId: 'EMP-2026-0023',
    department: 'Finance',
    date: '2026-07-03',
    checkIn: '—',
    checkOut: '—',
    workingHours: '0h 00m',
    status: 'Absent',
  },
  {
    id: 'ATT-005',
    employeeName: 'Alice Williams',
    employeeId: 'EMP-2026-0031',
    department: 'Engineering',
    date: '2026-07-03',
    checkIn: '09:02 AM',
    checkOut: '01:10 PM',
    workingHours: '4h 08m',
    status: 'Half Day',
  },
  {
    id: 'ATT-006',
    employeeName: 'Jane Smith',
    employeeId: 'EMP-2026-0042',
    department: 'Engineering',
    date: '2026-07-02',
    checkIn: '09:02 AM',
    checkOut: '05:10 PM',
    workingHours: '8h 08m',
    status: 'Present',
  },
  {
    id: 'ATT-007',
    employeeName: 'David Johnson',
    employeeId: 'EMP-2026-0015',
    department: 'Marketing',
    date: '2026-07-02',
    checkIn: '08:45 AM',
    checkOut: '05:00 PM',
    workingHours: '8h 15m',
    status: 'Present',
  },
  {
    id: 'ATT-008',
    employeeName: 'Emily Davis',
    employeeId: 'EMP-2026-0008',
    department: 'Human Resources',
    date: '2026-07-02',
    checkIn: '08:50 AM',
    checkOut: '05:30 PM',
    workingHours: '8h 40m',
    status: 'Present',
  },
]

export default function AdminAttendancePage() {
  const logs = mockAdminAttendanceLogs
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filters
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')

  const handleResetFilters = () => {
    setSearch('')
    setDepartment('')
    setStatus('')
    setDate('')
    setCurrentPage(1)
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      search.trim() === '' ||
      log.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      log.employeeId.toLowerCase().includes(search.toLowerCase())

    const matchesDept = department === '' || log.department === department
    const matchesStatus = status === '' || log.status === status
    const matchesDate = date === '' || log.date === date

    return matchesSearch && matchesDept && matchesStatus && matchesDate
  })

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const activePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedLogs = filteredLogs.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  )

  // Top Cards Calculations (for mock stats based on active day/logs)
  const totalCheckedIn = filteredLogs.filter(l => l.status !== 'Absent').length
  const totalAbsent = filteredLogs.filter(l => l.status === 'Absent').length
  const totalLate = filteredLogs.filter(l => l.status === 'Late').length
  const averageHours = '8.1 hrs'

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Attendance Monitoring"
        description="Verify and check daily check-in histories, timesheets, and attendance logs across all departments."
      />

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Present Today</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalCheckedIn}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-955/30 dark:text-amber-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Late Arrivals</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalLate}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-955/30 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Absent Employees</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalAbsent}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Average Working Hours</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{averageHours}</h4>
          </div>
        </Card>
      </div>

      {/* Filter toolbar */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
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

          <Select
            options={[
              { label: 'All Departments', value: '' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Human Resources', value: 'Human Resources' },
              { label: 'Finance', value: 'Finance' },
            ]}
            value={department}
            onChange={(e) => { setDepartment(e.target.value); setCurrentPage(1); }}
            className="text-xs"
          />

          <Select
            options={[
              { label: 'All Statuses', value: '' },
              { label: 'Present', value: 'Present' },
              { label: 'Late', value: 'Late' },
              { label: 'Absent', value: 'Absent' },
              { label: 'Half Day', value: 'Half Day' },
            ]}
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="text-xs"
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setCurrentPage(1); }}
            className="text-xs h-9"
          />

          <Button variant="outline" onClick={handleResetFilters} className="text-xs font-semibold flex items-center justify-center gap-1.5 w-full">
            <RefreshCw className="h-3.5 w-3.5" /> Reset Filters
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-text-muted">No attendance logs match these parameters.</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-text-muted border-collapse">
              <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Check In</th>
                  <th className="px-6 py-4">Check Out</th>
                  <th className="px-6 py-4 text-center">Working Hours</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-app bg-card-app">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar name={log.employeeName} size="sm" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{log.employeeName}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-text-muted">{log.employeeId}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{log.department}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{log.date}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{log.checkIn}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{log.checkOut}</td>
                    <td className="px-6 py-4 text-xs text-center font-semibold text-text-main">{log.workingHours}</td>
                    <td className="px-6 py-4"><StatusBadge status={log.status} /></td>
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
          totalItems={filteredLogs.length}
          itemsPerPage={itemsPerPage}
        />
      </Card>
    </div>
  )
}
