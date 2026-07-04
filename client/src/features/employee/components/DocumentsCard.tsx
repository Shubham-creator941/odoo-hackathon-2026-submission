import { FileText, Download } from 'lucide-react'

export default function DocumentsCard() {
  const docs = [
    { name: 'Employment_Contract.pdf', size: '1.2 MB' },
    { name: 'National_ID_Card.pdf', size: '840 KB' },
    { name: 'Degree_Certificate.pdf', size: '2.1 MB' },
  ]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Employee Documents
      </h3>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {docs.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {doc.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {doc.size}
                </p>
              </div>
            </div>
            <button
              className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg dark:hover:bg-slate-800"
              title="Download Document"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
