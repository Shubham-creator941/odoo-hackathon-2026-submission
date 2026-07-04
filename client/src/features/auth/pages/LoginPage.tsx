import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import DemoLoginPanel from '../components/DemoLoginPanel'

export default function LoginPage() {
  return (
    <AuthCard
      title="HRMS Portal"
      subtitle="Sign in to manage HR operations or access your employee workspace"
    >
      <LoginForm />
      <DemoLoginPanel />
    </AuthCard>
  )
}
