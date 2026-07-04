import type { ReactNode } from 'react'
import { cn } from '@/utils'

interface ContentContainerProps {
  children: ReactNode
  className?: string
}

export default function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6", className)}>
      {children}
    </div>
  )
}
