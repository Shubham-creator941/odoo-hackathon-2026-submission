import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { verifyCode } from '../services/auth.api'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface VerifyCodeFormProps {
  email: string
}

export default function VerifyCodeForm({ email }: VerifyCodeFormProps) {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!code || code.length !== 6) {
      setError('Please enter a 6-digit code')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await verifyCode(email, code)
      toast.success('Account verified!', {
        description: 'You can now log in with your credentials.',
      })
      navigate('/login')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } }
      const message = err.response?.data?.error || 'Verification failed. Invalid code.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Verify Your Account</h3>
        <p className="text-sm text-slate-500 mt-2">
          We&apos;ve registered your account. Please enter the 6-digit verification code below.
        </p>
      </div>

      <FormField label="Verification Code" error={error} required>
        <Input
          type="text"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={!!error}
          maxLength={6}
          className="text-center text-lg tracking-[0.5em] font-mono"
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Verify Account
      </Button>
    </form>
  )
}
