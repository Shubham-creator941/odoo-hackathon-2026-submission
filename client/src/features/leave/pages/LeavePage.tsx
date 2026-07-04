import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import LeaveSummary from '../components/LeaveSummary'
import LeaveBalanceCard from '../components/LeaveBalanceCard'
import LeaveTable from '../components/LeaveTable'
import SearchBar from '@/components/ui/SearchBar'
import FilterDropdown from '@/components/ui/FilterDropdown'
import Pagination from '@/components/ui/Pagination'
import { getLeaves, getLeaveBalances } from '../services/leave.api'
import type { LeaveRequest, LeaveBalance } from '../types'
import { ROUTES } from '@/utils/routes'

export default function LeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [balances, setBalances] = useState<LeaveBalance[]>([])
  const [search, setSearch] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    async function load() {
      try {
        const [lData, bData] = await Promise.all([getLeaves(), getLeaveBalances()])
        setLeaves(lData)
        setBalances(bData)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const filteredLeaves = (() => {
    let result = [...leaves]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (lv) =>
          lv.leaveType.toLowerCase().includes(q) ||
          lv.reason.toLowerCase().includes(q)
      )
    }

    if (leaveType) {
      result = result.filter((lv) => lv.leaveType === leaveType)
    }

    return result
  })()

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage)
  const activePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedLeaves = filteredLeaves.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  )

  const headerActions = (
    <Link to={ROUTES.ADMIN.LEAVE_APPLY}>
      <Button variant="primary" className="flex items-center gap-2">
        <Plus className="h-4 w-4" /> Request Leave
      </Button>
    </Link>
  )

  const leaveOptions = [
    { label: 'All Leave Types', value: '' },
    { label: 'Annual Leave', value: 'Annual Leave' },
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Casual Leave', value: 'Casual Leave' },
    { label: 'Maternity/Paternity', value: 'Maternity/Paternity' },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Leave Management"
        description="Monitor remaining balances, view request history, and submit new leave applications."
        actions={headerActions}
      />

      <LeaveSummary leaves={leaves} balances={balances} isLoading={isLoading} />

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
        Leave Allowances
      </h2>
      <LeaveBalanceCard balances={balances} isLoading={isLoading} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} placeholder="Search by type or reason..." />
        <FilterDropdown
          label="Leave Type"
          options={leaveOptions}
          value={leaveType}
          onChange={(e) => { setLeaveType(e.target.value); setCurrentPage(1); }}
        />
      </div>

      <LeaveTable leaves={paginatedLeaves} isLoading={isLoading} />

      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
