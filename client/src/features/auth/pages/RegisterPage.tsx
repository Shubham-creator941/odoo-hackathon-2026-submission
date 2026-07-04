import AuthCard from '../components/AuthCard'
import RegisterForm from '../components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Register as an employee or administrator to get started"
    >
      <RegisterForm />
    </AuthCard>
  )
}
