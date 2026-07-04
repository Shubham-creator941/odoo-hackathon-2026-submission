import FilterDropdown from '@/components/ui/FilterDropdown'

interface EmployeeFiltersProps {
  department: string
  onDepartmentChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

export default function EmployeeFilters({
  department,
  onDepartmentChange,
  status,
  onStatusChange,
}: EmployeeFiltersProps) {
  const departmentOptions = [
    { label: 'All Departments', value: '' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Human Resources', value: 'Human Resources' },
    { label: 'Finance', value: 'Finance' },
  ]

  const statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ]

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <FilterDropdown
        label="Department"
        options={departmentOptions}
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
      />
      <FilterDropdown
        label="Status"
        options={statusOptions}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      />
    </div>
  )
}
