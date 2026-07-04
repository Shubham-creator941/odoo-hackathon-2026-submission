
export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <p>&copy; {new Date().getFullYear()} HRMS Odoo Hackathon Project. All rights reserved.</p>
    </footer>
  )
}

