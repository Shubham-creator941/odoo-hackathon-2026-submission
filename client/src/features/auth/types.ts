import type { LoginInput } from './schemas/login.schema'
import type { RegisterInput } from './schemas/register.schema'

export interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  employeeId: string
  role: 'employee' | 'admin'
}

export interface AuthResponse {
  user: User
  token: string
}

export type { LoginInput, RegisterInput }
