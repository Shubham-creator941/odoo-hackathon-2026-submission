import { z } from 'zod'

export const employeeSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone Number is required')
    .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Invalid phone number format'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  department: z.string().min(1, 'Department is required'),
  designation: z.string().min(1, 'Designation is required'),
  role: z.enum(['employee', 'admin'], {
    message: 'Role is required',
  }),
  joiningDate: z.string().min(1, 'Joining Date is required'),
})

export type EmployeeInput = z.infer<typeof employeeSchema>
