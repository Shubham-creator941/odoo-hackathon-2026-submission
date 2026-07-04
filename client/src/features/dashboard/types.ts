export interface SummaryMetric {
  title: string
  value: string | number
  icon: string
  trendValue: string
  trendType: 'up' | 'down' | 'neutral'
  description: string
}

export interface RecentActivity {
  id: string
  type: 'employee' | 'leave' | 'attendance' | 'payroll'
  title: string
  timestamp: string
  description: string
}

export interface QuickActionItem {
  label: string
  icon: string
  path: string
  color: string
}

export interface RecentEmployee {
  id: string
  fullName: string
  email: string
  department: string
  designation: string
  avatar: string
  joiningDate: string
}

export interface RecentLeave {
  id: string
  employeeName: string
  leaveType: string
  duration: string
  appliedDate: string
  status: string
}

export interface AttendanceRate {
  day: string
  rate: number
}

