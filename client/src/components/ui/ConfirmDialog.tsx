import Modal from './Modal'
import Button from './Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  const footer = (
    <>
      <Button variant="outline" onClick={onClose}>
        {cancelText}
      </Button>
      <Button
        variant={variant === 'danger' ? 'danger' : 'primary'}
        onClick={onConfirm}
        className={variant === 'warning' ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}
      >
        {confirmText}
      </Button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <div className="flex gap-4 items-start">
        <div className="p-3 rounded-full bg-red-50 text-red-600 dark:bg-red-950/20 mt-0.5">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  )
}
