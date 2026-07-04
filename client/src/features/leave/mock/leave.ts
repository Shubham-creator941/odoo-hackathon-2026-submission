import type { LeaveRequest, LeaveBalance } from '../types'

export const mockLeaveBalances: LeaveBalance[] = [
  {
    type: 'Annual Leave',
    allocated: 20,
    used: 5,
    remaining: 15,
  },
  {
    type: 'Sick Leave',
    allocated: 10,
    used: 2,
    remaining: 8,
  },
  {
    type: 'Casual Leave',
    allocated: 7,
    used: 1,
    remaining: 6,
  },
  {
    type: 'Maternity/Paternity',
    allocated: 90,
    used: 0,
    remaining: 90,
  },
]

export const mockLeaves: LeaveRequest[] = [
  {
    id: 'LV-101',
    leaveType: 'Annual Leave',
    startDate: '2026-07-10',
    endDate: '2026-07-13',
    duration: '3 days',
    appliedDate: '2026-07-02',
    status: 'Pending',
    reason: 'Family trip',
  },
  {
    id: 'LV-102',
    leaveType: 'Sick Leave',
    startDate: '2026-07-03',
    endDate: '2026-07-03',
    duration: '1 day',
    appliedDate: '2026-07-03',
    status: 'Approved',
    reason: 'Dental appointment',
    remarks: 'Approved by HR Coordinator',
  },
  {
    id: 'LV-103',
    leaveType: 'Casual Leave',
    startDate: '2026-06-15',
    endDate: '2026-06-16',
    duration: '2 days',
    appliedDate: '2026-06-12',
    status: 'Rejected',
    reason: 'Personal errands',
    remarks: 'Rejected due to project release deadline',
  },
]
