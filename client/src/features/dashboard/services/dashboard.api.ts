import { mockDashboardMetrics, mockRecentEmployees, mockRecentLeaves, mockAttendanceRates } from '../mock/dashboard'
import type { SummaryMetric, RecentEmployee, RecentLeave, AttendanceRate } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboardMetrics(): Promise<SummaryMetric[]> {
  await delay(500)
  return mockDashboardMetrics as SummaryMetric[]
}

export async function getRecentEmployees(): Promise<RecentEmployee[]> {
  await delay(500)
  return mockRecentEmployees
}

export async function getRecentLeaves(): Promise<RecentLeave[]> {
  await delay(500)
  return mockRecentLeaves
}

export async function getAttendanceRates(): Promise<AttendanceRate[]> {
  await delay(500)
  return mockAttendanceRates
}
