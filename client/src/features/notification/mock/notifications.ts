export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  category: 'System' | 'Leave' | 'Attendance' | 'Payroll' | 'Documents'
  priority: 'High' | 'Medium' | 'Low'
  read: boolean
}

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Payroll Finalization Complete',
    message: 'The monthly payroll expenses for June 2026 have been finalized and scheduled for disbursement.',
    timestamp: 'Today, 09:30 AM',
    category: 'Payroll',
    priority: 'High',
    read: false,
  },
  {
    id: '2',
    title: 'New Leave Request Submitted',
    message: 'Alice Johnson has applied for 3 days of Annual Leave. Approval is required.',
    timestamp: 'Today, 08:15 AM',
    category: 'Leave',
    priority: 'Medium',
    read: false,
  },
  {
    id: '3',
    title: 'Database Disk Usage Warning',
    message: 'System disk space is at 88% capacity. Consider scaling log storage limits.',
    timestamp: 'Yesterday, 04:22 PM',
    category: 'System',
    priority: 'High',
    read: false,
  },
  {
    id: '4',
    title: 'Missing Check-in Notification',
    message: 'Bob Miller missed checking in on Friday, 3rd July. Action may be required.',
    timestamp: 'Yesterday, 10:00 AM',
    category: 'Attendance',
    priority: 'Low',
    read: true,
  },
  {
    id: '5',
    title: 'Welcome Aboard!',
    message: 'Emily Davis joined the HR Coordinator role today. Please welcome her!',
    timestamp: '3 days ago',
    category: 'System',
    priority: 'Low',
    read: true,
  },
  {
    id: '6',
    title: 'W-4 Tax Form Uploaded',
    message: 'Jane Smith uploaded W-4 Form Tax Info document for verification.',
    timestamp: 'Today, 11:00 AM',
    category: 'Documents',
    priority: 'Low',
    read: false,
  },
]
