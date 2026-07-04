import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'
import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const startIdx = (currentPage - 1) * itemsPerPage + 1
  const endIdx = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : currentPage * itemsPerPage

  return (
    <div className={cn("flex items-center justify-between border-t border-border-app px-4 py-3 sm:px-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl", className)}>
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-text-muted">
            {totalItems ? (
              <>
                Showing <span className="font-semibold text-text-main">{startIdx}</span> to{' '}
                <span className="font-semibold text-text-main">{endIdx}</span> of{' '}
                <span className="font-semibold text-text-main">{totalItems}</span> results
              </>
            ) : (
              <>
                Showing page <span className="font-semibold text-text-main">{currentPage}</span> of{' '}
                <span className="font-semibold text-text-main">{totalPages}</span>
              </>
            )}
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2.5 py-2 text-text-muted ring-1 ring-inset ring-border-app hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1
              const isCurrent = pageNum === currentPage
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    "relative inline-flex items-center px-3.5 py-2 text-xs font-bold ring-1 ring-inset ring-border-app focus:z-20 cursor-pointer",
                    isCurrent
                      ? "z-10 bg-blue-600 text-white ring-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      : "text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2.5 py-2 text-text-muted ring-1 ring-inset ring-border-app hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
