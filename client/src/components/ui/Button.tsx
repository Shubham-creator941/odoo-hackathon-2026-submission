import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Loader from './Loader'
import { cn } from '@/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 transform active:scale-98 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
        secondary: "bg-slate-100 text-text-main hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-transparent",
        outline: "border border-border-app bg-transparent text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800",
        ghost: "text-text-muted hover:bg-slate-50 dark:hover:bg-slate-850",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm",
        danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export default function Button({
  className,
  variant,
  size,
  fullWidth,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader size="sm" className="mr-1 text-current!" />}
      {children}
    </button>
  )
}
