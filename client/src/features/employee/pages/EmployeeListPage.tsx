import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import EmployeeStats from '../components/EmployeeStats'
import EmployeeSearch from '../components/EmployeeSearch'
import EmployeeFilters from '../components/EmployeeFilters'
import EmployeeTable from '../components/EmployeeTable'
import Pagination from '@/components/ui/Pagination'
import { getEmployees } from '../services/employee.api'
import type { Employee } from '../types'
import { ROUTES } from '@/utils/routes'

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployees()
        setEmployees(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const filteredEmployees = (() => {
    let result = [...employees]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.employeeId.toLowerCase().includes(q)
      )
    }

    if (department) {
      result = result.filter((emp) => emp.department === department)
    }

    if (status) {
      result = result.filter((emp) => emp.status === status)
    }

    return result
  })()

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const activePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedEmployees = filteredEmployees.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  )

  const headerActions = (
    <Link to={ROUTES.ADMIN.EMPLOYEES_NEW}>
      <Button variant="primary" className="flex items-center gap-2">
        <Plus className="h-4 w-4" /> Add Employee
      </Button>
    </Link>
  )

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Employee Directory"
        description="Search, filter, and manage employee records and profiles."
        actions={headerActions}
      />

      <EmployeeStats employees={employees} isLoading={isLoading} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <EmployeeSearch value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} />
        <EmployeeFilters
          department={department}
          onDepartmentChange={(val) => { setDepartment(val); setCurrentPage(1); }}
          status={status}
          onStatusChange={(val) => { setStatus(val); setCurrentPage(1); }}
        />
      </div>

      <EmployeeTable employees={paginatedEmployees} isLoading={isLoading} />

      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredEmployees.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}
