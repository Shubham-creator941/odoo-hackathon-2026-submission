export interface LeaveRequest {
  id: string
  leaveType: string
  startDate: string
  endDate: string
  duration: string
  appliedDate: string
  status: 'Pending' | 'Approved' | 'Rejected'
  reason: string
  remarks?: string
  employeeName?: string
  employeeId?: string
  department?: string
  manager?: string
  supportingDocuments?: string[]
  resolvedDate?: string
}

export interface LeaveBalance {
  type: string
  allocated: number
  used: number
  remaining: number
}
