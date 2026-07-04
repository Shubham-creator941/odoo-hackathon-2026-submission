import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import SectionHeader from '@/components/ui/SectionHeader'
import EmployeeForm from '../components/EmployeeForm'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import { getEmployee, createEmployee, updateEmployee } from '../services/employee.api'
import type { EmployeeInput } from '../schemas/employee.schema'
import { ROUTES } from '@/utils/routes'

export default function EmployeeFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<EmployeeInput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditMode = !!id

  useEffect(() => {
    async function load() {
      if (!id) return
      setIsLoading(true)
      try {
        const emp = await getEmployee(id)
        if (emp) {
          setInitialValues({
            fullName: emp.fullName,
            email: emp.email,
            phoneNumber: emp.phoneNumber,
            employeeId: emp.employeeId,
            department: emp.department,
            designation: emp.designation,
            role: emp.role,
            joiningDate: emp.joiningDate,
          })
        } else {
          toast.error('Employee not found')
          navigate(ROUTES.ADMIN.EMPLOYEES)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id, navigate])

  const handleSubmit = async (data: EmployeeInput) => {
    setIsSubmitting(true)
    try {
      if (isEditMode && id) {
        await updateEmployee(id, data)
        toast.success('Employee updated successfully!')
      } else {
        await createEmployee(data)
        toast.success('Employee created successfully!')
      }
      navigate(ROUTES.ADMIN.EMPLOYEES)
    } catch (err) {
      toast.error('Operation failed. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <LoadingSkeleton type="details" />
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={isEditMode ? 'Edit Employee Profile' : 'Add New Employee'}
        description={
          isEditMode
            ? 'Update employment details and configurations'
            : 'Register a new employee in the company directory'
        }
      />

      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
