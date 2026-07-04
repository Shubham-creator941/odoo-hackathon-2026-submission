import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { registerSchema, type RegisterInput } from '../schemas/register.schema'
import { register as registerUser } from '../services/auth.api'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import VerifyCodeForm from './VerifyCodeForm'

export default function RegisterForm() {
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      employeeId: '',
      role: 'employee',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    try {
      // Store local fields that backend doesn't persist
      const extraKey = `hrms-auth-extra-${data.email}`
      localStorage.setItem(extraKey, JSON.stringify({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber
      }))
      
      const response = await registerUser(data)
      toast.success('Registration successful!', {
        description: `Welcome aboard, ${data.fullName}! Verification code: ${response.user.verify_code}`,
        duration: 10000,
      })
      setRegisteredEmail(data.email)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } }
      const message = err.response?.data?.error || 'Registration failed. Please check the details and try again.'
      toast.error(message)
    }
  }

  if (registeredEmail) {
    return <VerifyCodeForm email={registeredEmail} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Full Name" error={errors.fullName?.message} required>
        <Input
          placeholder="John Doe"
          error={!!errors.fullName}
          {...register('fullName')}
        />
      </FormField>

      <FormField label="Email Address" error={errors.email?.message} required>
        <Input
          type="email"
          placeholder="name@company.com"
          error={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Phone Number" error={errors.phoneNumber?.message} required>
          <Input
            placeholder="+1234567890"
            error={!!errors.phoneNumber}
            {...register('phoneNumber')}
          />
        </FormField>

        <FormField label="Employee ID" error={errors.employeeId?.message} required>
          <Input
            placeholder="EMP-001"
            error={!!errors.employeeId}
            {...register('employeeId')}
          />
        </FormField>
      </div>

      <FormField label="Role" error={errors.role?.message} required>
        <Select
          options={[
            { label: 'Employee', value: 'employee' },
            { label: 'Admin', value: 'admin' },
          ]}
          error={!!errors.role}
          {...register('role')}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message} required>
        <PasswordInput
          placeholder="••••••••"
          error={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <FormField label="Confirm Password" error={errors.confirmPassword?.message} required>
        <PasswordInput
          placeholder="••••••••"
          error={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </FormField>

      <FormField error={errors.acceptTerms?.message}>
        <Checkbox
          label="I accept the Terms & Conditions"
          error={!!errors.acceptTerms}
          {...register('acceptTerms')}
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Register
      </Button>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
          Login here
        </Link>
      </div>
    </form>
  )
}
