import type { AttendanceRecord } from '../types'

export const mockAttendanceLogs: AttendanceRecord[] = [
  {
    id: 'ATT-001',
    date: '2026-07-03',
    checkIn: '08:58 AM',
    checkOut: '05:30 PM',
    workingHours: '8h 32m',
    status: 'Present',
  },
  {
    id: 'ATT-002',
    date: '2026-07-02',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    workingHours: '8h 30m',
    status: 'Late',
  },
  {
    id: 'ATT-003',
    date: '2026-07-01',
    checkIn: '08:55 AM',
    checkOut: '05:15 PM',
    workingHours: '8h 20m',
    status: 'Present',
  },
  {
    id: 'ATT-004',
    date: '2026-06-30',
    checkIn: '09:02 AM',
    checkOut: '01:10 PM',
    workingHours: '4h 08m',
    status: 'Half Day',
  },
  {
    id: 'ATT-005',
    date: '2026-06-29',
    checkIn: '—',
    checkOut: '—',
    workingHours: '0h 0m',
    status: 'Absent',
  },
  {
    id: 'ATT-006',
    date: '2026-06-26',
    checkIn: '08:50 AM',
    checkOut: '05:25 PM',
    workingHours: '8h 35m',
    status: 'Present',
  },
]
