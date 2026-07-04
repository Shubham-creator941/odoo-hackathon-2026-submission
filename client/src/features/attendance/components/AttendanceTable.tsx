import type { AttendanceRecord } from '../types'
import DataTable, { type Column } from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

interface AttendanceTableProps {
  logs: AttendanceRecord[]
  isLoading?: boolean
}

export default function AttendanceTable({ logs, isLoading }: AttendanceTableProps) {
  if (isLoading) {
    return <LoadingSkeleton type="table" count={5} />
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        title="No logs found"
        description="No attendance logs matching your search parameters."
      />
    )
  }

  const columns: Column<AttendanceRecord>[] = [
    {
      header: 'Date',
      accessor: (row) => row.date,
    },
    {
      header: 'Check In',
      accessor: (row) => row.checkIn,
    },
    {
      header: 'Check Out',
      accessor: (row) => row.checkOut,
    },
    {
      header: 'Working Hours',
      accessor: (row) => row.workingHours,
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ]

  return <DataTable columns={columns} data={logs} />
}
