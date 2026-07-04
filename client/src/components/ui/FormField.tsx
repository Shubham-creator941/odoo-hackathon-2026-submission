import type { ReactNode } from 'react'
import { cn } from '@/utils'
import ErrorMessage from './ErrorMessage'

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export default function FormField({
  label,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-600 ml-1 dark:text-red-400">*</span>}
        </span>
      )}
      {children}
      <ErrorMessage message={error} />
    </div>
  )
}
