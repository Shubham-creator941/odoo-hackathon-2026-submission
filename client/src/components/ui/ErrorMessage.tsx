import { cn } from '@/utils'

interface ErrorMessageProps {
  message?: string
  className?: string
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null

  return (
    <p className={cn("text-xs font-semibold text-red-600 mt-1 dark:text-red-400", className)}>
      {message}
    </p>
  )
}
