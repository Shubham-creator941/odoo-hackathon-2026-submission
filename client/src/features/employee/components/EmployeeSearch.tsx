import SearchBar from '@/components/ui/SearchBar'

interface EmployeeSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function EmployeeSearch({ value, onChange }: EmployeeSearchProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder="Search name, email, employee ID..."
    />
  )
}
