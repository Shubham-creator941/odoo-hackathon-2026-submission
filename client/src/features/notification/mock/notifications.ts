export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  category: 'System' | 'Leave' | 'Attendance' | 'Payroll' | 'Documents' | 'Announcements'
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

export const mockEmployeeNotifications: NotificationItem[] = [
  {
    id: 'emp-n1',
    title: 'Leave Request Approved',
    message: 'Your request for 3 days of Annual Leave starting on July 10th has been approved by Sarah Chen.',
    timestamp: 'Today, 10:30 AM',
    category: 'Leave',
    priority: 'High',
    read: false,
  },
  {
    id: 'emp-n2',
    title: 'Salary Credited',
    message: 'Your monthly salary for June 2026 has been successfully credited to your bank account.',
    timestamp: 'Today, 09:00 AM',
    category: 'Payroll',
    priority: 'High',
    read: false,
  },
  {
    id: 'emp-n3',
    title: 'Attendance Reminder',
    message: "Please don't forget to punch out at the end of your shift today.",
    timestamp: 'Today, 08:00 AM',
    category: 'Attendance',
    priority: 'Medium',
    read: false,
  },
  {
    id: 'emp-n4',
    title: 'Company Announcement',
    message: 'Join us for the town hall meeting tomorrow at 3 PM in the main conference room.',
    timestamp: 'Yesterday, 02:15 PM',
    category: 'Announcements',
    priority: 'Medium',
    read: true,
  },
  {
    id: 'emp-n5',
    title: 'Payslip Generated',
    message: 'Your payslip for the period ending June 30, 2026, is now available for download.',
    timestamp: 'Yesterday, 10:00 AM',
    category: 'Payroll',
    priority: 'Low',
    read: true,
  },
  {
    id: 'emp-n6',
    title: 'Document Upload Verified',
    message: 'Your uploaded W-4 Tax Form has been verified and approved by the HR department.',
    timestamp: '2 days ago',
    category: 'Documents',
    priority: 'Medium',
    read: true,
  },
  {
    id: 'emp-n7',
    title: 'Holiday Announcement',
    message: 'The office will be closed on Friday, July 4th, in observance of Independence Day.',
    timestamp: '3 days ago',
    category: 'Announcements',
    priority: 'High',
    read: true,
  },
  {
    id: 'emp-n8',
    title: 'Password Changed',
    message: "Your account password was successfully updated. If this wasn't you, contact security.",
    timestamp: '4 days ago',
    category: 'System',
    priority: 'High',
    read: true,
  },
]

