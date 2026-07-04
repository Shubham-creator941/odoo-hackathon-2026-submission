export interface Employee {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  employeeId: string
  department: string
  designation: string
  role: 'employee' | 'admin'
  joiningDate: string
  status: 'Active' | 'Inactive'
  avatar?: string
}
