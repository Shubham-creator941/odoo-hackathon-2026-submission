import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  CalendarX,
  DollarSign,
  FileText,
  Bell,
  LogIn,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import QuickActions from '../components/QuickActions'
import { getLeaveBalances, getEmployeeLeaves } from '@/features/leave/services/leave.api'
import { mockEmployeeNotifications } from '@/features/notifications/mock/notifications'
import { mockDocuments } from '@/features/documents/mock/documents'
import { mockUpcomingHolidays } from '../mock/dashboard'
import { ROUTES } from '@/utils/routes'
import { useAuth } from '@/context/AuthContext'

export default function EmployeeDashboardPage() {
  const { user } = useAuth()
  const [remainingLeave, setRemainingLeave] = useState(0)
  const [pendingRequests, setPendingRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [balances, leaves] = await Promise.all([
          getLeaveBalances(),
          getEmployeeLeaves(user?.employeeId),
        ])
        setRemainingLeave(balances.reduce((sum, b) => sum + b.remaining, 0))
        setPendingRequests(leaves.filter((l) => l.status === 'Pending').length)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [user?.employeeId])

  const nextHoliday = mockUpcomingHolidays[0]
  const recentNotifications = mockEmployeeNotifications.slice(0, 3)
  const myDocuments = mockDocuments.filter((d) => d.employeeName === 'Jane Smith').slice(0, 3)

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome back, ${user?.fullName?.split(' ')[0] ?? 'there'}`}
        description="Your personal HR workspace — attendance, leave, payslips, and documents."
      />

      <Card className="bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-indigo-650 dark:text-indigo-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Ready to start your day?
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Employee · {user?.employeeId}
            </p>
          </div>
          <Link to={ROUTES.EMPLOYEE.ATTENDANCE}>
            <Button className="flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Mark Attendance
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Attendance"
          value="Not checked in"
          icon={CalendarCheck}
          description="Tap to check in"
          className="h-full"
        />
        <StatCard
          title="Remaining Leave"
          value={isLoading ? '—' : `${remainingLeave} days`}
          icon={CalendarX}
          description={pendingRequests > 0 ? `${pendingRequests} pending` : 'All clear'}
          className="h-full"
        />
        <StatCard
          title="Next Holiday"
          value={nextHoliday?.name ?? '—'}
          icon={CalendarCheck}
          description={nextHoliday?.date ?? ''}
          className="h-full"
        />
        <StatCard
          title="Upcoming Payslip"
          value="Jul 30"
          icon={DollarSign}
          description="Scheduled disbursement"
          className="h-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Notifications</h3>
            <Link to={ROUTES.EMPLOYEE.NOTIFICATIONS} className="text-xs font-bold text-blue-600 dark:text-blue-400">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border-app">
            {recentNotifications.map((n) => (
              <div key={n.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Bell className="h-4 w-4 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-text-muted mt-0.5 truncate">{n.message}</p>
                  <p className="text-[11px] text-text-muted mt-1">{n.timestamp}</p>
                </div>
                {!n.read && <Badge variant="info">New</Badge>}
              </div>
            ))}
          </div>
        </Card>
        <QuickActions portal="employee" />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Documents</h3>
          <Link to={ROUTES.EMPLOYEE.DOCUMENTS} className="text-xs font-bold text-blue-600 dark:text-blue-400">
            View all
          </Link>
        </div>
        {myDocuments.length === 0 ? (
          <p className="text-sm text-text-muted">No documents on file.</p>
        ) : (
          <div className="space-y-2">
            {myDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border-app"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {doc.documentName}
                  </span>
                </div>
                <Badge variant={doc.status === 'Verified' ? 'success' : 'warning'}>{doc.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
