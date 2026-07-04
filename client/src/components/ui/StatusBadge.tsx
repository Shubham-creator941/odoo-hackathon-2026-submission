import Badge from './Badge'

export type StatusType =
  | 'active'
  | 'inactive'
  | 'present'
  | 'absent'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'late'
  | 'half day'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const cleanStatus = status.toLowerCase().trim() as StatusType

  const variants: Record<StatusType, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gray'> = {
    active: 'success',
    present: 'success',
    approved: 'success',
    inactive: 'gray',
    'half day': 'gray',
    absent: 'danger',
    rejected: 'danger',
    pending: 'warning',
    late: 'warning',
  }

  const variant = variants[cleanStatus] || 'gray'

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  )
}
