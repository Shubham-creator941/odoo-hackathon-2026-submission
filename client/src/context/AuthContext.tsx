import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@/features/auth/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<User>
  loginAs: (role: User['role']) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'hrms-auth-user'
import { login as loginApi } from '@/features/auth/services/auth.api'

const demoUsers: Record<User['role'], User> = {
  admin: {
    id: 'admin-001',
    fullName: 'John Doe',
    email: 'admin@company.com',
    phoneNumber: '+1 555-0100',
    employeeId: 'EMP-2026-0001',
    role: 'admin',
  },
  employee: {
    id: 'emp-042',
    fullName: 'Jane Smith',
    email: 'jane.smith@company.com',
    phoneNumber: '+1 555-0142',
    employeeId: 'EMP-2026-0042',
    role: 'employee',
  },
}

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as User
    if (parsed.role === 'admin' || parsed.role === 'employee') return parsed
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const res = await loginApi(credentials)
    
    // Retrieve locally saved extra info (fullName, phoneNumber) from registration
    const extraKey = `hrms-auth-extra-${res.user.email}`
    const extraRaw = localStorage.getItem(extraKey)
    let extra = { fullName: res.user.email, phoneNumber: '' }
    if (extraRaw) {
      try { extra = JSON.parse(extraRaw) } catch { /* ignore parsing errors */ }
    }

    // Safely type cast keeping mapped properties
    const mappedUser: User = {
      ...res.user,
      employeeId: res.user.employeeCode || (res.user as User & {employee_code?: string}).employee_code || 'EMP-UNKNOWN',
      fullName: extra.fullName,
      phoneNumber: extra.phoneNumber,
    }

    setUser(mappedUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser))
    localStorage.setItem('hrms-token', res.token)
    return mappedUser
  }, [])

  const loginAs = useCallback((role: User['role']) => {
    const nextUser = demoUsers[role]
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    localStorage.setItem('hrms-token', 'mock-jwt-token-xyz')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('hrms-token')
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      loginAs,
      logout,
    }),
    [user, login, loginAs, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { demoUsers }
