import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import LeaveSummary from '../components/LeaveSummary'
import LeaveBalanceCard from '../components/LeaveBalanceCard'
import LeaveTable from '../components/LeaveTable'
import LeaveCalendar from '../components/LeaveCalendar'
import { getEmployeeLeaves, getLeaveBalances } from '../services/leave.api'
import type { LeaveRequest, LeaveBalance } from '../types'
import { ROUTES } from '@/utils/routes'
import { useAuth } from '@/context/AuthContext'

export default function EmployeeLeavePage() {
  const { user } = useAuth()
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [balances, setBalances] = useState<LeaveBalance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [leaveData, balanceData] = await Promise.all([
          getEmployeeLeaves(user?.employeeId),
          getLeaveBalances(),
        ])
        setLeaves(leaveData)
        setBalances(balanceData)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [user?.employeeId])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="My Leave"
          description="View balances, apply for leave, and track your request history."
        />
        <Link to={ROUTES.EMPLOYEE.LEAVE_APPLY}>
          <Button className="flex items-center gap-2 text-xs font-bold">
            <Plus className="h-4 w-4" /> Apply Leave
          </Button>
        </Link>
      </div>

      <LeaveSummary leaves={leaves} balances={balances} isLoading={isLoading} />
      <LeaveBalanceCard balances={balances} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-border-app">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Leave History</h3>
            <p className="text-xs text-text-muted mt-0.5">All submitted requests and their status</p>
          </div>
          <div className="p-4">
            <LeaveTable leaves={leaves} isLoading={isLoading} />
          </div>
        </Card>
        <LeaveCalendar leaves={leaves} />
      </div>
    </div>
  )
}
