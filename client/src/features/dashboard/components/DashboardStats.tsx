import { Link } from 'react-router-dom'
import type { SummaryMetric } from '../types'
import { Users, CalendarCheck, CalendarX, DollarSign, type LucideIcon } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'

interface DashboardStatsProps {
  metrics: SummaryMetric[]
  isLoading?: boolean
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  CalendarCheck,
  CalendarX,
  DollarSign,
}

export default function DashboardStats({ metrics, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-32 bg-slate-100 rounded-xl animate-pulse dark:bg-slate-800" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, idx) => {
        const Icon = iconMap[metric.icon] || Users
        const cardContent = (
          <StatCard
            title={metric.title}
            value={metric.value}
            icon={Icon}
            trend={{
              value: metric.trendValue,
              type: metric.trendType,
            }}
            description={metric.description}
            className="h-full"
          />
        )

        return metric.link ? (
          <Link key={idx} to={metric.link} className="block transition-transform hover:scale-101">
            {cardContent}
          </Link>
        ) : (
          <div key={idx}>{cardContent}</div>
        )
      })}
    </div>
  )
}
