import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg border bg-white px-3 py-2 text-sm text-text-main placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:focus-visible:ring-blue-500",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-border-app focus-visible:ring-blue-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
