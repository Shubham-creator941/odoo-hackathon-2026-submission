import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import SectionHeader from '@/components/ui/SectionHeader'
import LeaveForm from '../components/LeaveForm'
import { applyLeave } from '../services/leave.api'
import type { LeaveInput } from '../schemas/leave.schema'
import { ROUTES } from '@/utils/routes'

export default function ApplyLeavePage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: LeaveInput) => {
    setIsSubmitting(true)
    try {
      await applyLeave({
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
      })
      toast.success('Leave request submitted successfully!')
      navigate(ROUTES.ADMIN.LEAVE)
    } catch (err) {
      toast.error('Submission failed. Please try again.')
      console.error(err)
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

      <LeaveForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
