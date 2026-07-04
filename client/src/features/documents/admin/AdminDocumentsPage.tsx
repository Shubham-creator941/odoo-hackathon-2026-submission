import { useState, type FormEvent } from 'react'
import { FileText, Clock, CheckCircle, Search, Plus, Eye, Download, ShieldAlert, FolderOpen } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockDocuments, type DocumentItem } from '../mock/documents'

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // Form State for new upload
  const [newDocName, setNewDocName] = useState('')
  const [newEmployeeName, setNewEmployeeName] = useState('')
  const [newCategory, setNewCategory] = useState('Tax Document')
  const [newExpiry, setNewExpiry] = useState('')

  // Derived summaries
  const totalDocs = documents.length
  const pendingCount = documents.filter((d) => d.status === 'Pending').length
  const expiringSoonCount = documents.filter((d) => d.status === 'Expired').length // Expiring soon / expired
  const verifiedCount = documents.filter((d) => d.status === 'Verified').length

  const categories = ['All', 'Tax Document', 'Contract', 'Benefits', 'Identity', 'Legal']

  // Filtered list
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.documentName.toLowerCase().includes(search.toLowerCase()) ||
      doc.employeeName.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="success">Verified</Badge>
      case 'Pending':
        return <Badge variant="warning">Pending</Badge>
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
    if (!newDocName || !newEmployeeName) {
      toast.error('Please enter all required fields')
      return
    }

    const newDoc: DocumentItem = {
      id: String(documents.length + 1),
      employeeName: newEmployeeName,
      documentName: newDocName,
      category: newCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: newExpiry || 'N/A',
      status: 'Pending',
    }

    setDocuments([newDoc, ...documents])
    setIsUploadOpen(false)
    toast.success('Document uploaded successfully', {
      description: 'The document is pending verification.',
    })

    // Reset Form
    setNewDocName('')
    setNewEmployeeName('')
    setNewCategory('Tax Document')
    setNewExpiry('')
  }

  const handleVerify = (id: string) => {
    setDocuments(documents.map((d) => (d.id === id ? { ...d, status: 'Verified' } : d)))
    toast.success('Document Verified', { description: 'Status updated to Verified.' })
    setIsPreviewOpen(false)
  }

  const handleReject = (id: string) => {
    setDocuments(documents.map((d) => (d.id === id ? { ...d, status: 'Rejected' } : d)))
    toast.error('Document Rejected', { description: 'Status updated to Rejected.' })
    setIsPreviewOpen(false)
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Document Management"
        description="Verify, track, and manage employee corporate documents and compliance certificates"
      />

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/30 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Total Documents</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalDocs}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-955/30 dark:text-amber-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Pending Verification</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-955/30 dark:text-red-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Expiring Soon</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{expiringSoonCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/30 dark:text-green-400">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Verified Documents</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{verifiedCount}</h4>
          </div>
        </Card>
      </div>

      {/* Toolbar Panel */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search box */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by file or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          {/* Category selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted whitespace-nowrap">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-lg border border-border-app bg-card-app text-text-main px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
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
                <th className="px-6 py-4">Employee</th>
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
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FolderOpen className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text-muted">No documents found matching search criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                    <td className="px-6 py-4 text-xs font-bold text-slate-800 dark:text-slate-200">{doc.employeeName}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-750 dark:text-slate-100 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      {doc.documentName}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-text-muted">{doc.category}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{doc.uploadDate}</td>
                    <td className="px-6 py-4 text-xs text-text-muted">{doc.expiryDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedDoc(doc)
                            setIsPreviewOpen(true)
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                          title="Preview details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => toast.success('Starting document download...')}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                          title="Download document"
                        >
                          <Download className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Modal dialog */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Corporate Document">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Document Title *</label>
            <Input
              type="text"
              placeholder="e.g. W-4 Tax Form, Passport Scan"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Employee Name *</label>
            <Input
              type="text"
              placeholder="e.g. Jane Smith"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="h-10 w-full rounded-lg border border-border-app bg-card-app text-text-main px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">Expiry Date</label>
              <Input type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-border-app">
            <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload File</Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal dialog */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Document Verification Details">
        {selectedDoc && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
              <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{selectedDoc.documentName}</h4>
                <p className="text-xs text-text-muted mt-0.5">{selectedDoc.category} • Uploaded {selectedDoc.uploadDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-border-app py-4 text-xs font-semibold">
              <div>
                <p className="text-slate-400">EMPLOYEE</p>
                <p className="text-slate-800 dark:text-slate-200 mt-1">{selectedDoc.employeeName}</p>
              </div>
              <div>
                <p className="text-slate-400">EXPIRY DATE</p>
                <p className="text-slate-800 dark:text-slate-200 mt-1">{selectedDoc.expiryDate}</p>
              </div>
              <div>
                <p className="text-slate-400">STATUS</p>
                <div className="mt-1">{getStatusBadge(selectedDoc.status)}</div>
              </div>
              <div>
                <p className="text-slate-400">DOCUMENT ID</p>
                <p className="text-slate-800 dark:text-slate-200 mt-1">DOC-00{selectedDoc.id}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                onClick={() => toast.success('Downloading document preview...')}
                className="flex items-center gap-1.5 text-xs font-bold"
              >
                <Download className="h-4 w-4" /> Download File
              </Button>
              {selectedDoc.status === 'Pending' && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleReject(selectedDoc.id)}
                    variant="danger"
                    className="bg-red-650 hover:bg-red-700 text-white text-xs font-bold"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleVerify(selectedDoc.id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold"
                  >
                    Verify & Approve
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
