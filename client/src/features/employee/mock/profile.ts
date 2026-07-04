export interface EmployeeProfile {
  id: string
  fullName: string
  employeeId: string
  department: string
  designation: string
  role: string
  email: string
  phone: string
  address: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  joiningDate: string
  employmentType: string
  workLocation: string
  reportingManager: string
  skills: string[]
  leaveBalance: {
    annual: number
    sick: number
    casual: number
    used: number
  }
  attendanceSummary: {
    presentDays: number
    absentDays: number
    lateDays: number
    attendanceRate: string
  }
  recentActivities: {
    id: string
    action: string
    timestamp: string
  }[]
}

export const mockProfile: EmployeeProfile = {
  id: '101',
  fullName: 'John Doe',
  employeeId: 'EMP-2026-0042',
  department: 'Product Development',
  designation: 'Senior Frontend Architect',
  role: 'System Administrator / Admin',
  email: 'john.doe@company.com',
  phone: '+1 (555) 019-2834',
  address: '123 Tech Park Drive, Suite 400, San Francisco, CA 94107',
  emergencyContact: {
    name: 'Jane Doe',
    relation: 'Spouse',
    phone: '+1 (555) 019-5829',
  },
  joiningDate: '2024-03-15',
  employmentType: 'Full-Time Employee',
  workLocation: 'San Francisco Headquarters (Onsite)',
  reportingManager: 'Sarah Jenkins (VP of Engineering)',
  skills: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Recharts', 'System Design', 'Git Workflow'],
  leaveBalance: {
    annual: 18,
    sick: 8,
    casual: 6,
    used: 4,
  },
  attendanceSummary: {
    presentDays: 142,
    absentDays: 4,
    lateDays: 2,
    attendanceRate: '95.9%',
  },
  recentActivities: [
    { id: '1', action: 'Completed Payroll Verification for June', timestamp: 'Today, 10:30 AM' },
    { id: '2', action: 'Approved annual leave request for Bob Miller', timestamp: 'Yesterday, 04:15 PM' },
    { id: '3', action: 'Uploaded new W-4 Tax Form', timestamp: '3 days ago' },
    { id: '4', action: 'Checked in present', timestamp: '5 days ago' },
  ]
}
