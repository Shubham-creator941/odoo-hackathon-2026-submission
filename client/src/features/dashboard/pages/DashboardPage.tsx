import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import DashboardStats from '../components/DashboardStats'
import QuickActions from '../components/QuickActions'
import RecentEmployees from '../components/RecentEmployees'
import AttendanceChart from '../components/AttendanceChart'
import LeaveDistributionChart from '../components/LeaveDistributionChart'
import DepartmentDistributionChart from '../components/DepartmentDistributionChart'
import EmployeeGrowthChart from '../components/EmployeeGrowthChart'
import PayrollChart from '../components/PayrollChart'
import UpcomingHolidays from '../components/UpcomingHolidays'
import TodayBirthdays from '../components/TodayBirthdays'
import RecentActivities from '../components/RecentActivities'
import RecentLeaveRequests from '../components/RecentLeaveRequests'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { toast } from 'sonner'
import {
  getDashboardMetrics,
  getRecentEmployees,
  getRecentLeaves,
  getAttendanceRates,
  getEmployeeGrowth,
  getPayrollSummary,
  getUpcomingHolidays,
  getTodayBirthdays,
  getRecentActivities,
} from '../services/dashboard.api'
import type { SummaryMetric, RecentEmployee, RecentLeave, AttendanceRate } from '../types'

interface GrowthItem {
  month: string
  count: number
}

interface PayrollItem {
  month: string
  amount: number
}

interface HolidayItem {
  date: string
  name: string
  type: string
}

interface BirthdayItem {
  name: string
  department: string
  date: string
  avatar: string
}

interface ActivityItem {
  id: string
  user: string
  action: string
  time: string
  type: string
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<SummaryMetric[]>([])
  const [recentEmployees, setRecentEmployees] = useState<RecentEmployee[]>([])
  const [recentLeaves, setRecentLeaves] = useState<RecentLeave[]>([])
  const [rates, setRates] = useState<AttendanceRate[]>([])
  const [growthData, setGrowthData] = useState<GrowthItem[]>([])
  const [payrollData, setPayrollData] = useState<PayrollItem[]>([])
  const [holidays, setHolidays] = useState<HolidayItem[]>([])
  const [birthdays, setBirthdays] = useState<BirthdayItem[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [m, e, l, r, growth, payroll, hol, bday, act] = await Promise.all([
          getDashboardMetrics(),
          getRecentEmployees(),
          getRecentLeaves(),
          getAttendanceRates(),
          getEmployeeGrowth(),
          getPayrollSummary(),
          getUpcomingHolidays(),
          getTodayBirthdays(),
          getRecentActivities(),
        ])
        setMetrics(m)
        setRecentEmployees(e)
        setRecentLeaves(l)
        setRates(r)
        setGrowthData(growth)
        setPayrollData(payroll)
        setHolidays(hol)
        setBirthdays(bday)
        setActivities(act)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadDashboard()
  }, [])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Enterprise HRMS Dashboard"
        description="Real-time summary of organization metrics, growth projections, activities, and calendars"
      />

      {/* Main Metric Cards */}
      <DashboardStats metrics={metrics} isLoading={isLoading} />

      {/* Row 1: Charts & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart rates={rates} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Row 2: Analytics Projection Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EmployeeGrowthChart data={growthData} isLoading={isLoading} />
        <PayrollChart data={payrollData} isLoading={isLoading} />
      </div>

      {/* Row 3: Organizational Allocations */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LeaveDistributionChart isLoading={isLoading} />
        <DepartmentDistributionChart isLoading={isLoading} />
      </div>

      {/* Row 4: Timeline Activities & Holidays */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RecentActivities activities={activities} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <UpcomingHolidays holidays={holidays} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <TodayBirthdays birthdays={birthdays} isLoading={isLoading} />
        </div>
      </div>

      {/* Row 5: Action Logs Lists */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentEmployees employees={recentEmployees} isLoading={isLoading} />
        <RecentLeaveRequests leaves={recentLeaves} isLoading={isLoading} />
      </div>

      {/* Toast Notification Tester Sandbox */}
      <Card>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Toast Notification Sandbox
        </h3>
        <p className="text-sm text-text-muted mb-4">
          Click any action button below to trigger and test Sonner toast notifications:
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => toast.success('Operation Successful', { description: 'Employee records synced with Odoo ERP.' })}
            variant="success"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Success Toast
          </Button>
          <Button
            onClick={() => toast.error('Connection Lost', { description: 'Could not fetch database records. Retrying...' })}
            variant="danger"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Error Toast
          </Button>
          <Button
            onClick={() => toast.warning('Pending Approvals', { description: 'You have leaves awaiting your response.' })}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
          >
            Warning Toast
          </Button>
          <Button
            onClick={() => toast.info('System Update', { description: 'Maintenance will start tonight at 11:00 PM.' })}
            variant="outline"
            className="font-semibold"
          >
            Info Toast
          </Button>
        </div>
      </Card>
    </div>
  )
}
