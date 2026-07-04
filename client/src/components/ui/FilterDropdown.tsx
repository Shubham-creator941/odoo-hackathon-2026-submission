import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/utils'

interface Option {
  label: string
  value: string
}

interface FilterDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
  label?: string
}

export default function FilterDropdown({
  options,
  label,
  className,
  value,
  onChange,
  ...props
}: FilterDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-300",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
