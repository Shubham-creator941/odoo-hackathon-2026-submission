import type { LoginInput, RegisterInput, AuthResponse } from '../types'

// Mock database helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(data: LoginInput): Promise<AuthResponse> {
  await delay(1000)
  return {
    user: {
      id: 'mock-user-id-123',
      fullName: 'John Doe',
      email: data.email,
      phoneNumber: '+1234567890',
      employeeId: 'EMP-001',
      role: 'admin',
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
