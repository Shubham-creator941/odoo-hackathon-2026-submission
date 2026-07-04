import { cn } from '@/utils'

interface AvatarProps {
  name: string
  avatarUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Avatar({
  name,
  avatarUrl,
  size = 'md',
  className,
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg',
  }

  return (
    <div
      className={cn(
        "rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center font-bold text-indigo-600 overflow-hidden dark:bg-slate-800 dark:border-slate-700 dark:text-indigo-400 flex-shrink-0",
        sizes[size],
        className
      )}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}
