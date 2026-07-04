import {
  mockDashboardMetrics,
  mockRecentEmployees,
  mockRecentLeaves,
  mockAttendanceRates,
  mockEmployeeGrowth,
  mockPayrollSummary,
  mockUpcomingHolidays,
  mockTodayBirthdays,
  mockRecentActivities
} from '../mock/dashboard'
import type { SummaryMetric, RecentEmployee, RecentLeave, AttendanceRate } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboardMetrics(): Promise<SummaryMetric[]> {
  await delay(200)
  return mockDashboardMetrics as SummaryMetric[]
}

export async function getRecentEmployees(): Promise<RecentEmployee[]> {
  await delay(200)
  return mockRecentEmployees
}

export async function getRecentLeaves(): Promise<RecentLeave[]> {
  await delay(200)
  return mockRecentLeaves
}

export async function getAttendanceRates(): Promise<AttendanceRate[]> {
  await delay(200)
  return mockAttendanceRates
}

export async function getEmployeeGrowth() {
  await delay(200)
  return mockEmployeeGrowth
}

export async function getPayrollSummary() {
  await delay(200)
  return mockPayrollSummary
}

export async function getUpcomingHolidays() {
  await delay(200)
  return mockUpcomingHolidays
}

export async function getTodayBirthdays() {
  await delay(200)
  return mockTodayBirthdays
}

export async function getRecentActivities() {
  await delay(200)
  return mockRecentActivities
}
