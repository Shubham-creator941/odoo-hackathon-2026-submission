import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 focus:ring-offset-white dark:border-slate-800 dark:focus:ring-offset-slate-950",
            error && "border-red-600 focus:ring-red-600",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
