import type { ReactNode } from 'react'
import { cn } from '@/utils'

export interface Column<T> {
  header: string
  accessor: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
}

export default function DataTable<T>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border bg-card-app border-border-app shadow-sm max-h-[600px] overflow-y-auto scrollbar-thin", className)}>
      <table className="w-full text-left text-sm text-text-muted border-collapse">
        <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-text-main border-b border-border-app dark:bg-slate-900/90 z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={cn("px-6 py-4 font-bold select-none", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-app bg-card-app">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors"
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={cn("px-6 py-4 text-text-main", col.className)}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
