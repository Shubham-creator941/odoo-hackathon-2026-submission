import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { AttendanceRate } from '../types'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'

interface AttendanceChartProps {
  rates: AttendanceRate[]
  isLoading?: boolean
}

export default function AttendanceChart({ rates, isLoading }: AttendanceChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Weekly Attendance Overview
      </h3>

      {isLoading ? (
        <div className="h-[240px] flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl" />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rates} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e5e7eb'} />
              <XAxis
                dataKey="day"
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#1e293b' : '#e5e7eb',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="rate" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} name="Attendance Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
