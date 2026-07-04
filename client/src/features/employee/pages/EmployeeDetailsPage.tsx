import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Edit2, ArrowLeft } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import ProfileCard from '../components/ProfileCard'
import EmploymentCard from '../components/EmploymentCard'
import ContactCard from '../components/ContactCard'
import DocumentsCard from '../components/DocumentsCard'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import { getEmployee } from '../services/employee.api'
import type { Employee } from '../types'
import { ROUTES } from '@/utils/routes'

export default function EmployeeDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [employee, setEmployee] = useState<Employee | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        const data = await getEmployee(id)
        setEmployee(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  if (isLoading) {
    return <LoadingSkeleton type="details" />
  }

  if (!employee) {
    return (
      <EmptyState
        title="Employee not found"
        description="The employee record you are trying to view does not exist."
      />
    )
  }

  const headerActions = (
    <div className="flex items-center gap-3">
      <Link to={ROUTES.ADMIN.EMPLOYEES}>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Button>
      </Link>
      <Link to={ROUTES.ADMIN.EMPLOYEES_EDIT(employee.id)}>
        <Button variant="primary" className="flex items-center gap-2">
          <Edit2 className="h-4 w-4" /> Edit Profile
        </Button>
      </Link>
    </div>
  )

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Employee Profile"
        description={`Detailed HR record for ${employee.fullName}`}
        actions={headerActions}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard employee={employee} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <EmploymentCard employee={employee} />
          <ContactCard employee={employee} />
          <DocumentsCard />
        </div>
      </div>
    </div>
  )
}
