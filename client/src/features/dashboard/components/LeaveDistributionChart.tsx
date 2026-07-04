import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'

interface LeaveDistributionChartProps {
  isLoading?: boolean
}

export default function LeaveDistributionChart({ isLoading }: LeaveDistributionChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const data = [
    { name: 'Annual Leave', value: 15 },
    { name: 'Sick Leave', value: 8 },
    { name: 'Casual Leave', value: 6 },
    { name: 'Maternity/Paternity', value: 4 },
  ]

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444']

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Leave Categories Distribution
      </h3>

      {isLoading ? (
        <div className="h-[240px] flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl" />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#e5e7eb',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '8px',
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconSize={10} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
