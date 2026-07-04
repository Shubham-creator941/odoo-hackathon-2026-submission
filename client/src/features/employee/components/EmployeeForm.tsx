import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { employeeSchema, type EmployeeInput } from '../schemas/employee.schema'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/utils/routes'

interface EmployeeFormProps {
  initialValues?: EmployeeInput
  onSubmit: (data: EmployeeInput) => void
  isSubmitting?: boolean
}

export default function EmployeeForm({
  initialValues,
  onSubmit,
  isSubmitting,
}: EmployeeFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialValues || {
      fullName: '',
      email: '',
      phoneNumber: '',
      employeeId: '',
      department: '',
      designation: '',
      role: 'employee',
      joiningDate: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            placeholder="john.doe@company.com"
            error={!!errors.email}
            {...register('email')}
          />
        </FormField>

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
            disabled={!!initialValues}
          />
        </FormField>

        <FormField label="Department" error={errors.department?.message} required>
          <select
            className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-slate-900 dark:border-slate-800 ${
              errors.department ? 'border-red-600' : 'border-slate-200'
            }`}
            {...register('department')}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
        </FormField>

        <FormField label="Designation" error={errors.designation?.message} required>
          <Input
            placeholder="Senior Backend Developer"
            error={!!errors.designation}
            {...register('designation')}
          />
        </FormField>

        <FormField label="System Role" error={errors.role?.message} required>
          <select
            className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-slate-900 dark:border-slate-800 ${
              errors.role ? 'border-red-600' : 'border-slate-200'
            }`}
            {...register('role')}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>

        <FormField label="Joining Date" error={errors.joiningDate?.message} required>
          <Input
            type="date"
            error={!!errors.joiningDate}
            {...register('joiningDate')}
          />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(ROUTES.ADMIN.EMPLOYEES)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValues ? 'Save Changes' : 'Create Employee'}
        </Button>
      </div>
    </form>
  )
}
