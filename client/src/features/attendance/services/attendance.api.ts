import { mockAttendanceLogs } from '../mock/attendance'
import type { AttendanceRecord } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAttendanceLogs(): Promise<AttendanceRecord[]> {
  await delay(500)
  return mockAttendanceLogs
}

export async function checkIn(): Promise<AttendanceRecord> {
  await delay(500)
  return {
    id: `ATT-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    checkOut: '—',
    workingHours: '—',
    status: 'Present',
  }
}

export async function checkOut(id: string): Promise<AttendanceRecord> {
  await delay(500)
  return {
    id,
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00 AM',
    checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    workingHours: '8h 00m',
    status: 'Present',
  }
}
