import { AlertTriangle, Shield, Server } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

interface SystemAlert {
  id: string
  title: string
  message: string
  severity: 'high' | 'medium' | 'low'
}

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    title: 'Payroll batch pending review',
    message: 'July payroll run requires final approval before disbursement.',
    severity: 'high',
  },
  {
    id: '2',
    title: 'Document expiring soon',
    message: '3 employee contracts expire within 30 days.',
    severity: 'medium',
  },
  {
    id: '3',
    title: 'Attendance anomaly',
    message: '2 employees missed check-in yesterday in Operations.',
    severity: 'low',
  },
]

interface SystemAlertsProps {
  isLoading?: boolean
}

export default function SystemAlerts({ isLoading }: SystemAlertsProps) {
  if (isLoading) {
    return <LoadingSkeleton type="cards" count={1} />
  }

  const severityIcon = {
    high: AlertTriangle,
    medium: Shield,
    low: Server,
  }

  const severityBadge = {
    high: 'danger' as const,
    medium: 'warning' as const,
    low: 'gray' as const,
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        System Alerts
      </h3>
      <div className="space-y-3">
        {mockAlerts.map((alert) => {
          const Icon = severityIcon[alert.severity]
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border-app bg-slate-50/50 dark:bg-slate-900/30"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <Icon className="h-4 w-4 text-text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</p>
                  <Badge variant={severityBadge[alert.severity]}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-text-muted mt-1">{alert.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
