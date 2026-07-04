export interface PayrollRecord {
  id: string
  employeeName: string
  employeeId: string
  department: string
  basicSalary: number
  allowances: number
  deductions: number
  netPay: number
  status: 'Paid' | 'Scheduled' | 'Pending'
  payDate: string
  period: string
}

export const mockPayrollRecords: PayrollRecord[] = [
  { id: '1', employeeName: 'Jane Smith', employeeId: 'EMP-2026-0042', department: 'Engineering', basicSalary: 8500, allowances: 450, deductions: 120, netPay: 8830, status: 'Paid', payDate: '2026-06-30', period: 'June 2026' },
  { id: '2', employeeName: 'David Johnson', employeeId: 'EMP-2026-0015', department: 'Marketing', basicSalary: 6200, allowances: 300, deductions: 90, netPay: 6410, status: 'Paid', payDate: '2026-06-30', period: 'June 2026' },
  { id: '3', employeeName: 'Emily Davis', employeeId: 'EMP-2026-0022', department: 'HR', basicSalary: 5500, allowances: 250, deductions: 80, netPay: 5670, status: 'Paid', payDate: '2026-06-30', period: 'June 2026' },
  { id: '4', employeeName: 'Bob Miller', employeeId: 'EMP-2026-0031', department: 'Engineering', basicSalary: 9200, allowances: 600, deductions: 150, netPay: 9650, status: 'Pending', payDate: '2026-07-30', period: 'July 2026' },
  { id: '5', employeeName: 'Alice Williams', employeeId: 'EMP-2026-0055', department: 'Finance', basicSalary: 7100, allowances: 350, deductions: 100, netPay: 7350, status: 'Scheduled', payDate: '2026-07-30', period: 'July 2026' },
  { id: '6', employeeName: 'Michael Torres', employeeId: 'EMP-2026-0018', department: 'Sales', basicSalary: 6800, allowances: 400, deductions: 95, netPay: 7105, status: 'Paid', payDate: '2026-06-30', period: 'June 2026' },
  { id: '7', employeeName: 'Priya Patel', employeeId: 'EMP-2026-0045', department: 'Finance', basicSalary: 7200, allowances: 320, deductions: 110, netPay: 7410, status: 'Scheduled', payDate: '2026-07-30', period: 'July 2026' },
]
