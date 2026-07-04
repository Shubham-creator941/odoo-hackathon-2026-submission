import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import DashboardStats from '../components/DashboardStats'
import QuickActions from '../components/QuickActions'
import RecentEmployees from '../components/RecentEmployees'
import AttendanceChart from '../components/AttendanceChart'
import RecentLeaveRequests from '../components/RecentLeaveRequests'
import { getDashboardMetrics, getRecentEmployees, getRecentLeaves, getAttendanceRates } from '../services/dashboard.api'

import type { SummaryMetric, RecentEmployee, RecentLeave, AttendanceRate } from '../types'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<SummaryMetric[]>([])
  const [recentEmployees, setRecentEmployees] = useState<RecentEmployee[]>([])
  const [recentLeaves, setRecentLeaves] = useState<RecentLeave[]>([])
  const [rates, setRates] = useState<AttendanceRate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [m, e, l, r] = await Promise.all([
          getDashboardMetrics(),
          getRecentEmployees(),
          getRecentLeaves(),
          getAttendanceRates(),
        ])
        setMetrics(m)
        setRecentEmployees(e)
        setRecentLeaves(l)
        setRates(r)
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
        title="HRMS Dashboard"
        description="Real-time summary of your organization's metrics and daily activities"
      />

      <DashboardStats metrics={metrics} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart rates={rates} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentEmployees employees={recentEmployees} isLoading={isLoading} />
        <RecentLeaveRequests leaves={recentLeaves} isLoading={isLoading} />
      </div>
    </div>
  )
}
