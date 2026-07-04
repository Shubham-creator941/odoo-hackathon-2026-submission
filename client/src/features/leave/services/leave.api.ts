import { mockLeaves, mockLeaveBalances, CURRENT_EMPLOYEE_ID } from '../mock/leave'
import type { LeaveRequest, LeaveBalance } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const localLeaves = [...mockLeaves]

export async function getLeaves(): Promise<LeaveRequest[]> {
  await delay(200)
  return [...localLeaves]
}

export async function getEmployeeLeaves(employeeId = CURRENT_EMPLOYEE_ID): Promise<LeaveRequest[]> {
  await delay(200)
  return localLeaves.filter((l) => l.employeeId === employeeId)
}

export async function getLeaveBalances(): Promise<LeaveBalance[]> {
  await delay(200)
  return mockLeaveBalances
}

export async function applyLeave(
  data: Omit<LeaveRequest, 'id' | 'duration' | 'appliedDate' | 'status'>,
  employeeId = CURRENT_EMPLOYEE_ID
): Promise<LeaveRequest> {
  await delay(300)
  const diffTime = Math.abs(new Date(data.endDate).getTime() - new Date(data.startDate).getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  const profile = employeeId === CURRENT_EMPLOYEE_ID
    ? { name: 'Jane Smith', department: 'Engineering', manager: 'Sarah Chen' }
    : { name: data.employeeName ?? 'Employee', department: data.department ?? 'General', manager: 'HR Manager' }

  const newLeave: LeaveRequest = {
    ...data,
    id: `LV-${Math.floor(Math.random() * 900) + 100}`,
    duration: `${diffDays} day${diffDays > 1 ? 's' : ''}`,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    employeeName: profile.name,
    employeeId,
    department: profile.department,
    manager: profile.manager,
  }
  localLeaves.unshift(newLeave)
  return newLeave
}

export async function approveLeave(id: string): Promise<void> {
  await delay(200)
  const leave = localLeaves.find((l) => l.id === id)
  if (leave) {
    leave.status = 'Approved'
    leave.resolvedDate = new Date().toISOString().split('T')[0]
  }
}

export async function rejectLeave(id: string, remarks?: string): Promise<void> {
  await delay(200)
  const leave = localLeaves.find((l) => l.id === id)
  if (leave) {
    leave.status = 'Rejected'
    leave.remarks = remarks
    leave.resolvedDate = new Date().toISOString().split('T')[0]
  }
}

export async function bulkApproveLeaves(ids: string[]): Promise<void> {
  await delay(300)
  ids.forEach((id) => {
    const leave = localLeaves.find((l) => l.id === id)
    if (leave && leave.status === 'Pending') {
      leave.status = 'Approved'
      leave.resolvedDate = new Date().toISOString().split('T')[0]
    }
  })
}

export async function bulkRejectLeaves(ids: string[], remarks?: string): Promise<void> {
  await delay(300)
  ids.forEach((id) => {
    const leave = localLeaves.find((l) => l.id === id)
    if (leave && leave.status === 'Pending') {
      leave.status = 'Rejected'
      leave.remarks = remarks ?? 'Bulk rejected by administrator'
      leave.resolvedDate = new Date().toISOString().split('T')[0]
    }
  })
}
