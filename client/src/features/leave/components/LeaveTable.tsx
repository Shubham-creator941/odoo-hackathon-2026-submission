import type { LeaveRequest } from '../types'
import DataTable, { type Column } from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

interface LeaveTableProps {
  leaves: LeaveRequest[]
  isLoading?: boolean
}

export default function LeaveTable({ leaves, isLoading }: LeaveTableProps) {
  if (isLoading) {
    return <LoadingSkeleton type="table" count={5} />
  }

  if (leaves.length === 0) {
    return (
      <EmptyState
        title="No leave history"
        description="There are no leave requests found in the system log."
      />
    )
  }

  const columns: Column<LeaveRequest>[] = [
    {
      header: 'Leave Type',
      accessor: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">{row.leaveType}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{row.reason}</div>
        </div>
      ),
    },
    {
      header: 'Duration',
      accessor: (row) => (
        <div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">{row.duration}</div>
          <div className="text-xs text-slate-400 dark:text-slate-500">
            {row.startDate} &rarr; {row.endDate}
          </div>
        </div>
      ),
    },
    {
      header: 'Applied Date',
      accessor: (row) => row.appliedDate,
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Remarks',
      accessor: (row) => row.remarks || '—',
    },
  ]

  return <DataTable columns={columns} data={leaves} />
}
