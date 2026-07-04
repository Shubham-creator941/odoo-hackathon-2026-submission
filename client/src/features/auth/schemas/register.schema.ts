import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(1, 'Phone Number is required')
      .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Invalid phone number format'),
    employeeId: z.string().min(1, 'Employee ID is required'),
    role: z.enum(['employee', 'admin'], {
      message: 'Role is required',
    }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>
