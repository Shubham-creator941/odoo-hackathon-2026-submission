import type { ReactNode } from 'react'
import { cn } from '@/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  variant?: 'default' | 'accent' | 'bordered'
}

export default function Card({
  children,
  className,
  hoverEffect = false,
  variant = 'default',
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        "bg-card-app border border-border-app text-text-main shadow-sm",
        hoverEffect && "hover:shadow-md hover:-translate-y-0.5",
        variant === 'accent' && "border-l-4 border-l-blue-600 dark:border-l-blue-500",
        variant === 'bordered' && "border-2 border-slate-200 dark:border-slate-800",
        className
      )}
    >
      {children}
    </div>
  )
}
