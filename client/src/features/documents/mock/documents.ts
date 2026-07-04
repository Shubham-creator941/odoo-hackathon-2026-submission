export interface DocumentItem {
  id: string
  employeeName: string
  documentName: string
  category: string
  uploadDate: string
  expiryDate: string
  status: 'Verified' | 'Pending' | 'Rejected' | 'Expired'
}

export const mockDocuments: DocumentItem[] = [
  {
    id: '1',
    employeeName: 'Jane Smith',
    documentName: 'W-4 Form Tax Info',
    category: 'Tax Document',
    uploadDate: '2026-06-16',
    expiryDate: '2027-06-16',
    status: 'Verified',
  },
  {
    id: '2',
    employeeName: 'David Johnson',
    documentName: 'Employment Agreement',
    category: 'Contract',
    uploadDate: '2026-06-20',
    expiryDate: '2029-06-20',
    status: 'Verified',
  },
  {
    id: '3',
    employeeName: 'Emily Davis',
    documentName: 'Medical Insurance Policy',
    category: 'Benefits',
    uploadDate: '2026-07-02',
    expiryDate: '2027-07-02',
    status: 'Pending',
  },
  {
    id: '4',
    employeeName: 'Bob Miller',
    documentName: 'I-9 Identification Form',
    category: 'Identity',
    uploadDate: '2026-06-01',
    expiryDate: '2026-06-01',
    status: 'Expired',
  },
  {
    id: '5',
    employeeName: 'Alice Williams',
    documentName: 'NDA Signoff',
    category: 'Legal',
    uploadDate: '2026-05-12',
    expiryDate: '2030-05-12',
    status: 'Rejected',
  },
]
