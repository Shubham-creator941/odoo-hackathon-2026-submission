import { useNavigate } from 'react-router-dom'
import { Shield, UserCircle } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/utils/routes'

export default function DemoLoginPanel() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()

  const handleDemoLogin = (role: 'admin' | 'employee') => {
    loginAs(role)
    toast.success(
      role === 'admin' ? 'Welcome, Admin' : 'Welcome back',
      {
        description:
          role === 'admin'
            ? 'Signed in to the Admin Portal.'
            : 'Signed in to the Employee Portal.',
      }
    )
    navigate(role === 'admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.EMPLOYEE.DASHBOARD)
  }

  return (
    <div className="space-y-3 border-t border-border-app pt-6">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-text-muted">
        Hackathon Demo — Quick Access
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('admin')}
          className="flex h-auto flex-col items-center gap-2 py-4 font-semibold"
          aria-label="Login as Admin"
        >
          <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Login as Admin
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('employee')}
          className="flex h-auto flex-col items-center gap-2 py-4 font-semibold"
          aria-label="Login as Employee"
        >
          <UserCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Login as Employee
        </Button>
      </div>
    </div>
  )
}
