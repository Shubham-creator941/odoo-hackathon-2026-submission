import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'

interface GrowthData {
  month: string
  count: number
}

interface EmployeeGrowthChartProps {
  data: GrowthData[]
  isLoading?: boolean
}

export default function EmployeeGrowthChart({ data, isLoading }: EmployeeGrowthChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Employee Headcount Trend
      </h3>

      {isLoading ? (
        <div className="h-[240px] flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl" />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e5e7eb'} />
              <XAxis
                dataKey="month"
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#e5e7eb',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Headcount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
