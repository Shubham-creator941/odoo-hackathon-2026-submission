import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { loginSchema, type LoginInput } from '../schemas/login.schema'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/utils/routes'
import { cn } from '@/utils'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee'>('admin')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@company.com',
      password: 'password123',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      const user = await login({ email: data.email, password: data.password })
      const actualRole = user.role
      
      toast.success(
        actualRole === 'admin' ? 'Welcome, Admin!' : 'Welcome back!',
        {
          description: actualRole === 'admin'
            ? 'Signed in to the Admin Portal.'
            : 'Signed in to the Employee Portal.',
        }
      )
      navigate(
        actualRole === 'admin'
          ? ROUTES.ADMIN.DASHBOARD
          : ROUTES.EMPLOYEE.DASHBOARD
      )
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } }
      const message = err.response?.data?.error || 'Authentication failed. Please check your credentials.'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Styled Radio Role Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
          Select Portal Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={cn(
              "flex flex-col gap-1 rounded-xl border p-3.5 cursor-pointer transition-all duration-200 hover:border-indigo-500/50",
              selectedRole === 'admin'
                ? "border-indigo-650 bg-indigo-50/25 dark:border-indigo-500 dark:bg-indigo-950/20 text-indigo-750 dark:text-indigo-400"
                : "border-border-app bg-card-app text-text-muted"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Admin</span>
              <input
                type="radio"
                name="role-selector"
                value="admin"
                checked={selectedRole === 'admin'}
                onChange={() => {
                  setSelectedRole('admin')
                  setValue('email', 'admin@company.com')
                }}
                className="accent-indigo-650 dark:accent-indigo-500 h-4 w-4"
              />
            </div>
            <span className="text-[10px] text-text-muted leading-tight">HR Operations</span>
          </label>

          <label
            className={cn(
              "flex flex-col gap-1 rounded-xl border p-3.5 cursor-pointer transition-all duration-200 hover:border-indigo-500/50",
              selectedRole === 'employee'
                ? "border-indigo-650 bg-indigo-50/25 dark:border-indigo-500 dark:bg-indigo-950/20 text-indigo-750 dark:text-indigo-400"
                : "border-border-app bg-card-app text-text-muted"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Employee</span>
              <input
                type="radio"
                name="role-selector"
                value="employee"
                checked={selectedRole === 'employee'}
                onChange={() => {
                  setSelectedRole('employee')
                  setValue('email', 'jane.smith@company.com')
                }}
                className="accent-indigo-650 dark:accent-indigo-500 h-4 w-4"
              />
            </div>
            <span className="text-[10px] text-text-muted leading-tight">My Workspace</span>
          </label>
        </div>
      </div>

      <FormField label="Email Address" error={errors.email?.message} required>
        <Input
          type="email"
          placeholder="name@company.com"
          error={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message} required>
        <PasswordInput
          placeholder="••••••••"
          error={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" {...register('rememberMe')} />
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault()
            toast.info('Password recovery is not implemented yet.')
          }}
          className="text-sm font-semibold text-blue-600 hover:text-blue-500"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Sign In to Portal
      </Button>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </div>
    </form>
  )
}

