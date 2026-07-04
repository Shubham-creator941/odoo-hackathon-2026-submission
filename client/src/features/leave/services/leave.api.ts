import { mockLeaves, mockLeaveBalances } from '../mock/leave'
import type { LeaveRequest, LeaveBalance } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const localLeaves = [...mockLeaves]

export async function getLeaves(): Promise<LeaveRequest[]> {
  await delay(500)
  return localLeaves
}

export async function getLeaveBalances(): Promise<LeaveBalance[]> {
  await delay(500)
  return mockLeaveBalances
}

export async function applyLeave(data: Omit<LeaveRequest, 'id' | 'duration' | 'appliedDate' | 'status'>): Promise<LeaveRequest> {
  await delay(600)
  const diffTime = Math.abs(new Date(data.endDate).getTime() - new Date(data.startDate).getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  const newLeave: LeaveRequest = {
    ...data,
    id: `LV-${Math.floor(Math.random() * 900) + 100}`,
    duration: `${diffDays} day${diffDays > 1 ? 's' : ''}`,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
  }
  localLeaves.unshift(newLeave)
  return newLeave
}
