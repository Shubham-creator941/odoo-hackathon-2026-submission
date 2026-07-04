import type { Employee } from '../types'
import { Link } from 'react-router-dom'
import { Edit2, Eye } from 'lucide-react'
import DataTable, { type Column } from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import { ROUTES } from '@/utils/routes'

interface EmployeeTableProps {
  employees: Employee[]
  isLoading?: boolean
}

export default function EmployeeTable({ employees, isLoading }: EmployeeTableProps) {
  if (isLoading) {
    return <LoadingSkeleton type="table" count={5} />
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees found"
        description="Try adjusting your filters or search terms."
      />
    )
  }

  const columns: Column<Employee>[] = [
    {
      header: 'Employee',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
            {row.avatar || row.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{row.fullName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'ID',
      accessor: (row) => row.employeeId,
    },
    {
      header: 'Department',
      accessor: (row) => row.department,
    },
    {
      header: 'Designation',
      accessor: (row) => row.designation,
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={ROUTES.ADMIN.EMPLOYEES_DETAILS(row.id)}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            to={ROUTES.ADMIN.EMPLOYEES_EDIT(row.id)}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800"
            title="Edit Employee"
          >
            <Edit2 className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={employees} />
}
