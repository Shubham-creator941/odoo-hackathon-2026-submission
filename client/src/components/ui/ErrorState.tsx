import Card from './Card'
import Button from './Button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this page. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
      <div className="p-3 rounded-full bg-red-50 text-red-600 dark:bg-red-950/20 mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-muted mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
      )}
    </Card>
  )
}
