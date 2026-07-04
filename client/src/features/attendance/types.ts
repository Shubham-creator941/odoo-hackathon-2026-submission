export interface AttendanceRecord {
  id: string
  employeeName?: string
  date: string
  checkIn: string
  checkOut: string
  workingHours: string
  status: 'Present' | 'Absent' | 'Late' | 'Half Day'
}
