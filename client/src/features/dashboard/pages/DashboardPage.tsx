import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import DashboardStats from '../components/DashboardStats'
import QuickActions from '../components/QuickActions'
import RecentEmployees from '../components/RecentEmployees'
import AttendanceChart from '../components/AttendanceChart'
import LeaveDistributionChart from '../components/LeaveDistributionChart'
import DepartmentDistributionChart from '../components/DepartmentDistributionChart'
import RecentLeaveRequests from '../components/RecentLeaveRequests'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { toast } from 'sonner'
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

      {/* Grid containing charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart rates={rates} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LeaveDistributionChart isLoading={isLoading} />
        <DepartmentDistributionChart isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentEmployees employees={recentEmployees} isLoading={isLoading} />
        <RecentLeaveRequests leaves={recentLeaves} isLoading={isLoading} />
      </div>

      {/* Toast Feedback Sandbox Widget */}
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
