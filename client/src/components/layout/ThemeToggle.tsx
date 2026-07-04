import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 transition-all duration-300 transform active:scale-95 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-500 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600 rotate-0 transition-transform duration-300" />
      )}
    </button>
  )
}
