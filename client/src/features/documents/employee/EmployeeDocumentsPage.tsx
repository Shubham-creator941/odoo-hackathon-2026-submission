import { useState, type FormEvent } from 'react'
import { FileText, Clock, CheckCircle, Search, Plus, Download, FolderOpen } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockDocuments, type DocumentItem } from '@/features/document/mock/documents'
import { useAuth } from '@/context/AuthContext'

export default function EmployeeDocumentsPage() {
  const { user } = useAuth()
  // Filter documents to only show the ones belonging to this employee
  const employeeName = user?.fullName ?? 'Jane Smith'
  const [documents, setDocuments] = useState<DocumentItem[]>(() =>
    mockDocuments.filter((d) => d.employeeName === employeeName || d.employeeName === 'Jane Smith')
  )
  const [search, setSearch] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // Form State for new upload
  const [newDocName, setNewDocName] = useState('')
  const [newCategory, setNewCategory] = useState('Tax Document')

  // Derived summaries
  const totalDocs = documents.length
  const pendingCount = documents.filter((d) => d.status === 'Pending').length
  const verifiedCount = documents.filter((d) => d.status === 'Verified').length

  const categories = ['Tax Document', 'Contract', 'Benefits', 'Identity', 'Legal']

  // Filtered list
  const filteredDocs = documents.filter((doc) =>
    doc.documentName.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="success">Verified</Badge>
      case 'Pending':
        return <Badge variant="warning">Pending Verification</Badge>
      case 'Rejected':
        return <Badge variant="danger">Rejected</Badge>
      case 'Expired':
        return <Badge variant="gray">Expired</Badge>
      default:
        return <Badge variant="gray">{status}</Badge>
    }
  }

  const handleUpload = (e: FormEvent) => {
    e.preventDefault()
    if (!newDocName) {
      toast.error('Please enter document title')
      return
    }

    const newDoc: DocumentItem = {
      id: String(documents.length + 1),
      employeeName: employeeName,
      documentName: newDocName,
      category: newCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: 'N/A',
      status: 'Pending',
    }

    setDocuments([newDoc, ...documents])
    setIsUploadOpen(false)
    toast.success('Document uploaded successfully', {
      description: 'Your document has been submitted to HR for review.',
    })

    setNewDocName('')
    setNewCategory('Tax Document')
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Documents"
        description="Access your contract agreements, tax documentation, benefits statements, and upload personal compliance files."
      />

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">My Documents</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalDocs}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-955/30 dark:text-amber-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Awaiting Verification</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Verified Files</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{verifiedCount}</h4>
          </div>
        </Card>
      </div>

      {/* Toolbar Panel */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 text-xs font-bold"
        >
          <Plus className="h-4 w-4" /> Upload Document
        </Button>
      </Card>

      {/* Documents Table */}
      <Card className="p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted border-collapse">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-app bg-card-app">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FolderOpen className="h-10 w-10 text-slate-350 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text-muted">No documents found matching search criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                    <td className="px-6 py-4 text-xs font-bold text-slate-750 dark:text-slate-100 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      {doc.documentName}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-text-muted">{doc.category}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{doc.uploadDate}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{doc.expiryDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toast.success('Starting document download...')}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                        title="Download document"
                      >
                        <Download className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Modal dialog */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Personal Document">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Document Title *</label>
            <Input
              type="text"
              placeholder="e.g. Passport scan, Degree Certificate"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="h-10 w-full rounded-lg border border-border-app bg-card-app text-text-main px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-border-app">
            <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload File</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
