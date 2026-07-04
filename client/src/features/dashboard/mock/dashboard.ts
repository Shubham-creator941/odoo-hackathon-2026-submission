export const mockDashboardMetrics = [
  {
    title: 'Total Employees',
    value: 124,
    icon: 'Users',
    trendValue: '+8.4%',
    trendType: 'up',
    description: 'vs last month',
  },
  {
    title: 'Present Today',
    value: '112/124',
    icon: 'CalendarCheck',
    trendValue: '90.3%',
    trendType: 'neutral',
    description: 'attendance rate',
  },
  {
    title: 'Pending Leaves',
    value: 6,
    icon: 'CalendarX',
    trendValue: '-15%',
    trendType: 'down',
    description: 'vs last week',
  },
  {
    title: 'Upcoming Payroll',
    value: '$145,200',
    icon: 'DollarSign',
    trendValue: 'Scheduled',
    trendType: 'neutral',
    description: 'on 30th July',
  },
]

export const mockRecentEmployees = [
  {
    id: '1',
    fullName: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Engineering',
    designation: 'Frontend Engineer',
    avatar: 'JS',
    joiningDate: '2026-06-15',
  },
  {
    id: '2',
    fullName: 'David Johnson',
    email: 'david.j@company.com',
    department: 'Marketing',
    designation: 'Campaign Manager',
    avatar: 'DJ',
    joiningDate: '2026-06-20',
  },
  {
    id: '3',
    fullName: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Human Resources',
    designation: 'HR Coordinator',
    avatar: 'ED',
    joiningDate: '2026-07-01',
  },
]

export const mockRecentLeaves = [
  {
    id: '1',
    employeeName: 'Alice Williams',
    leaveType: 'Annual Leave',
    duration: '3 days',
    appliedDate: '2026-07-02',
    status: 'Pending',
  },
  {
    id: '2',
    employeeName: 'Bob Miller',
    leaveType: 'Sick Leave',
    duration: '1 day',
    appliedDate: '2026-07-03',
    status: 'Approved',
  },
  {
    id: '3',
    employeeName: 'Charlie Brown',
    leaveType: 'Maternity/Paternity',
    duration: '10 days',
    appliedDate: '2026-07-01',
    status: 'Rejected',
  },
]

export const mockAttendanceRates = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 94 },
  { day: 'Wed', rate: 89 },
  { day: 'Thu', rate: 95 },
  { day: 'Fri', rate: 91 },
]

export const mockEmployeeGrowth = [
  { month: 'Jan', count: 110 },
  { month: 'Feb', count: 112 },
  { month: 'Mar', count: 115 },
  { month: 'Apr', count: 118 },
  { month: 'May', count: 121 },
  { month: 'Jun', count: 124 },
]

export const mockPayrollSummary = [
  { month: 'Jan', amount: 135000 },
  { month: 'Feb', amount: 138000 },
  { month: 'Mar', amount: 140000 },
  { month: 'Apr', amount: 142000 },
  { month: 'May', amount: 143500 },
  { month: 'Jun', amount: 145200 },
]

export const mockUpcomingHolidays = [
  { date: '2026-07-04', name: 'Independence Day', type: 'Federal' },
  { date: '2026-09-07', name: 'Labor Day', type: 'Public' },
  { date: '2026-11-26', name: 'Thanksgiving', type: 'Public' },
]

export const mockTodayBirthdays = [
  { name: 'Sarah Connor', department: 'Operations', date: 'Today', avatar: 'SC' },
  { name: 'Michael Scott', department: 'Sales', date: 'Tomorrow', avatar: 'MS' },
]

export const mockRecentActivities = [
  { id: '1', user: 'Bob Miller', action: 'checked in', time: '10 mins ago', type: 'attendance' },
  { id: '2', user: 'Jane Smith', action: 'uploaded document', time: '1 hour ago', type: 'document' },
  { id: '3', user: 'Emily Davis', action: 'submitted annual leave request', time: '3 hours ago', type: 'leave' },
]
