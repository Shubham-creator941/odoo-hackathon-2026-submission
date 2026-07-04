import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'

interface DepartmentDistributionChartProps {
  isLoading?: boolean
}

export default function DepartmentDistributionChart({ isLoading }: DepartmentDistributionChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const data = [
    { name: 'Engineering', count: 48 },
    { name: 'Marketing', count: 24 },
    { name: 'Human Resources', count: 12 },
    { name: 'Finance', count: 18 },
    { name: 'Operations', count: 22 },
  ]

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Department Headcount
      </h3>

      {isLoading ? (
        <div className="h-[240px] flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl" />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e5e7eb'} horizontal={false} />
              <XAxis
                type="number"
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#e5e7eb',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16} name="Headcount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
