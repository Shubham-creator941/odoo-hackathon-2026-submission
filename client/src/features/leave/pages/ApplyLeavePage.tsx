import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import SectionHeader from '@/components/ui/SectionHeader'
import LeaveForm from '../components/LeaveForm'
import { applyLeave } from '../services/leave.api'
import type { LeaveInput } from '../schemas/leave.schema'
import { ROUTES } from '@/utils/routes'
import { useAuth } from '@/context/AuthContext'

export default function ApplyLeavePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isEmployee = location.pathname.startsWith('/employee')
  const leavePath = isEmployee ? ROUTES.EMPLOYEE.LEAVE : ROUTES.ADMIN.LEAVE
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: LeaveInput) => {
    setIsSubmitting(true)
    try {
      await applyLeave(
        {
          leaveType: data.leaveType,
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
        },
        user?.employeeId
      )
      toast.success('Leave request submitted successfully!')
      navigate(leavePath)
    } catch {
      toast.error('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Apply for Leave"
        description="Submit a new request for approval by your manager or HR administrator"
      />

      <LeaveForm onSubmit={handleSubmit} isSubmitting={isSubmitting} cancelPath={leavePath} />
    </div>
  )
}
