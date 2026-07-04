import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { loginSchema, type LoginInput } from '../schemas/login.schema'
import { login } from '../services/auth.api'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/utils/routes'

export default function LoginForm() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await login(data)
      loginAs(response.user.role)
      toast.success(`Welcome back, ${response.user.fullName}!`, {
        description: 'Successfully authenticated.',
      })
      navigate(
        response.user.role === 'admin'
          ? ROUTES.ADMIN.DASHBOARD
          : ROUTES.EMPLOYEE.DASHBOARD
      )
    } catch {
      toast.error('Authentication failed. Please check your credentials.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        Sign In
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
