import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import DashboardStats from '../components/DashboardStats'
import QuickActions from '../components/QuickActions'
import RecentEmployees from '../components/RecentEmployees'
import AttendanceChart from '../components/AttendanceChart'
import UpcomingHolidays from '../components/UpcomingHolidays'
import TodayBirthdays from '../components/TodayBirthdays'
import RecentActivities from '../components/RecentActivities'
import RecentLeaveRequests from '../components/RecentLeaveRequests'
import SystemAlerts from '../components/SystemAlerts'
import {
  getDashboardMetrics,
  getRecentEmployees,
  getRecentLeaves,
  getAttendanceRates,
  getUpcomingHolidays,
  getTodayBirthdays,
  getRecentActivities,
} from '../services/dashboard.api'
import type { SummaryMetric, RecentEmployee, RecentLeave, AttendanceRate } from '../types'

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

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<SummaryMetric[]>([])
  const [recentEmployees, setRecentEmployees] = useState<RecentEmployee[]>([])
  const [recentLeaves, setRecentLeaves] = useState<RecentLeave[]>([])
  const [rates, setRates] = useState<AttendanceRate[]>([])
  const [holidays, setHolidays] = useState<HolidayItem[]>([])
  const [birthdays, setBirthdays] = useState<BirthdayItem[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [m, e, l, r, hol, bday, act] = await Promise.all([
          getDashboardMetrics(),
          getRecentEmployees(),
          getRecentLeaves(),
          getAttendanceRates(),
          getUpcomingHolidays(),
          getTodayBirthdays(),
          getRecentActivities(),
        ])
        setMetrics(m)
        setRecentEmployees(e)
        setRecentLeaves(l)
        setRates(r)
        setHolidays(hol)
        setBirthdays(bday)
        setActivities(act)
      } finally {
        setIsLoading(false)
      }
    }
    loadDashboard()
  }, [])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Admin Dashboard"
        description="Organization overview — approvals, attendance, payroll, and team activity at a glance."
      />

      <DashboardStats metrics={metrics} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart rates={rates} isLoading={isLoading} />
        </div>
        <QuickActions portal="admin" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentActivities activities={activities} isLoading={isLoading} />
        <UpcomingHolidays holidays={holidays} isLoading={isLoading} />
        <TodayBirthdays birthdays={birthdays} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentLeaveRequests leaves={recentLeaves} isLoading={isLoading} />
        <SystemAlerts isLoading={isLoading} />
      </div>

      <RecentEmployees employees={recentEmployees} isLoading={isLoading} />
    </div>
  )
}
