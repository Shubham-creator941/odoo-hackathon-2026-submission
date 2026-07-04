import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { ROUTES } from '@/utils/routes'

export default function Breadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (pathnames.length === 0) return null

  const isEmployee = pathnames[0] === 'employee'
  const homeHref = isEmployee ? ROUTES.EMPLOYEE.DASHBOARD : ROUTES.ADMIN.DASHBOARD

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted font-semibold mb-4" aria-label="Breadcrumb">
      <Link
        to={homeHref}
        aria-label="Home"
        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const label = value.charAt(0).toUpperCase() + value.slice(1)

        if (!isNaN(Number(value))) return null

        return (
          <div key={to} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            {last ? (
              <span className="text-text-main font-bold select-none" aria-current="page">{label}</span>
            ) : (
              <Link
                to={to}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors capitalize"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
