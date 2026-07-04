import type { LoginInput, RegisterInput, AuthResponse } from '../types'

// Mock database helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(data: LoginInput): Promise<AuthResponse> {
  await delay(800)
  const isAdmin = data.email.toLowerCase().includes('admin')
  return {
    user: {
      id: isAdmin ? 'admin-001' : 'emp-042',
      fullName: isAdmin ? 'John Doe' : 'Jane Smith',
      email: data.email,
      phoneNumber: isAdmin ? '+1 555-0100' : '+1 555-0142',
      employeeId: isAdmin ? 'EMP-2026-0001' : 'EMP-2026-0042',
      role: isAdmin ? 'admin' : 'employee',
    },
    token: 'mock-jwt-token-xyz',
  }
}

export async function register(data: RegisterInput): Promise<AuthResponse> {
  await delay(1000)
  return {
    user: {
      id: 'mock-user-id-456',
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      employeeId: data.employeeId,
      role: data.role,
    },
    token: 'mock-jwt-token-abc',
  }
}

export async function logout(): Promise<void> {
  await delay(500)
}
