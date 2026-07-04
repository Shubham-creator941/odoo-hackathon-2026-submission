import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'

interface PayrollData {
  month: string
  amount: number
}

interface PayrollChartProps {
  data: PayrollData[]
  isLoading?: boolean
}

export default function PayrollChart({ data, isLoading }: PayrollChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Payroll Expenses History
      </h3>

      {isLoading ? (
        <div className="h-[240px] flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl" />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#e5e7eb',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '8px',
                }}
                formatter={(val) => [`$${Number(val || 0).toLocaleString()}`, 'Expenses']}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
