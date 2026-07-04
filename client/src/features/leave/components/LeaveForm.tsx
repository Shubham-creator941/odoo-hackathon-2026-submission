import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { leaveSchema, type LeaveInput } from '../schemas/leave.schema'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/utils/routes'

interface LeaveFormProps {
  onSubmit: (data: LeaveInput) => void
  isSubmitting?: boolean
  cancelPath?: string
}

export default function LeaveForm({ onSubmit, isSubmitting, cancelPath }: LeaveFormProps) {
  const navigate = useNavigate()
  const backPath = cancelPath ?? ROUTES.EMPLOYEE.LEAVE
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveInput>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <FormField label="Leave Type" error={errors.leaveType?.message} required>
        <select
          className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-slate-900 dark:border-slate-800 ${
            errors.leaveType ? 'border-red-600' : 'border-slate-200'
          }`}
          {...register('leaveType')}
        >
          <option value="">Select Leave Type</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Maternity/Paternity">Maternity/Paternity</option>
        </select>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Start Date" error={errors.startDate?.message} required>
          <Input type="date" error={!!errors.startDate} {...register('startDate')} />
        </FormField>
        <FormField label="End Date" error={errors.endDate?.message} required>
          <Input type="date" error={!!errors.endDate} {...register('endDate')} />
        </FormField>
      </div>

      <FormField label="Reason for Leave" error={errors.reason?.message} required>
        <textarea
          rows={4}
          placeholder="Please explain the details..."
          className={`flex w-full rounded-lg border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-slate-900 dark:border-slate-800 ${
            errors.reason ? 'border-red-600' : 'border-slate-202'
          }`}
          {...register('reason')}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(backPath)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Submit Request
        </Button>
      </div>
    </form>
  )
}
