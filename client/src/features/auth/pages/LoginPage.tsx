import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your dashboard to manage HR operations"
    >
      <LoginForm />
    </AuthCard>
  )
}
