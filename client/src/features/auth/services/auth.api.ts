import { api } from '@/services/api'
import type { LoginInput, RegisterInput, AuthResponse } from '../types'

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/users/login', data)
  return response.data
}

export async function register(data: RegisterInput): Promise<AuthResponse & { user: { verify_code?: string } }> {
  // Backend expects employee_code, email, password, role
  const payload = {
    employee_code: data.employeeId,
    email: data.email,
    password: data.password,
    role: data.role
  }
  
  const response = await api.post('/users/register', payload)
  return response.data
}

export async function verifyCode(email: string, code: string): Promise<{ message: string }> {
  const response = await api.post('/users/verify', { email, verify_code: code })
  return response.data
}

export async function logout(): Promise<void> {
  // Since we use JWT, logout is purely client-side
  localStorage.removeItem('hrms-token')
  localStorage.removeItem('hrms-auth-user')
}
