import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Info,
  AlertTriangle,
  DollarSign,
  CalendarCheck,
  CalendarX,
  FileText,
  Check,
  Trash2,
  ArrowRight,
  Megaphone
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockEmployeeNotifications, type NotificationItem } from '../mock/notifications'

export default function EmployeeNotificationsPage() {
  const baseRoute = '/employee'
  
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockEmployeeNotifications)
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Leave' | 'Attendance' | 'Payroll' | 'Documents' | 'Announcements' | 'System'>('All')

  // Stats derivation
  const unreadCount = notifications.filter((n) => !n.read).length
  const todayCount = notifications.filter((n) => n.timestamp.startsWith('Today')).length
  const documentsCount = notifications.filter((n) => n.category === 'Documents').length
  const pendingActionsCount = notifications.filter((n) => !n.read && n.priority === 'High').length

  // Filter logic
  const filteredList = notifications.filter((item) => {
    if (filter === 'All') return true
    if (filter === 'Unread') return !item.read
    return item.category === filter
  })

  const getIcon = (category: string) => {
    switch (category) {
      case 'System':
        return AlertTriangle
      case 'Leave':
        return CalendarX
      case 'Attendance':
        return CalendarCheck
      case 'Payroll':
        return DollarSign
      case 'Documents':
        return FileText
      case 'Announcements':
        return Megaphone
      default:
        return Bell
    }
  }

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'System':
        return 'text-red-655 bg-red-50 dark:text-red-400 dark:bg-red-955/20'
      case 'Leave':
        return 'text-indigo-650 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-955/20'
      case 'Attendance':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-955/20'
      case 'Payroll':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-955/20'
      case 'Documents':
        return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-955/20'
      case 'Announcements':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-955/20'
      default:
        return 'text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-800/40'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="danger">High</Badge>
      case 'Medium':
        return <Badge variant="warning">Medium</Badge>
      case 'Low':
        return <Badge variant="gray">Low</Badge>
      default:
        return <Badge variant="gray">{priority}</Badge>
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    toast.success('Notification marked as read')
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    toast.error('Notification deleted')
  }

  // Route calculation based on category (pointing only to employee portal)
  const getActionLink = (category: string) => {
    switch (category) {
      case 'Leave':
        return `${baseRoute}/leave`
      case 'Attendance':
        return `${baseRoute}/attendance`
      case 'Payroll':
        return `${baseRoute}/payroll`
      case 'Documents':
        return `${baseRoute}/documents`
      case 'Announcements':
      case 'System':
      default:
        return `${baseRoute}/dashboard`
    }
  }

  const getActionLabel = (category: string) => {
    switch (category) {
      case 'Leave':
        return 'View Leave'
      case 'Attendance':
        return 'Open Attendance'
      case 'Payroll':
        return 'View Payslip'
      case 'Documents':
        return 'View Document'
      case 'Announcements':
        return 'Open Announcement'
      case 'System':
      default:
        return 'View My Dashboard'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="My Notifications"
          description="View updates, alerts, and feedback on leave approvals, payroll, or uploaded personal documents."
        />
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            variant="outline"
            className="flex items-center gap-1.5 text-xs font-bold self-start sm:self-center"
          >
            <Check className="h-4 w-4" /> Mark All as Read
          </Button>
        )}
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Unread Notifications</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{unreadCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-955/20 dark:text-green-400">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Today&apos;s Updates</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{todayCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-50 text-purple-650 dark:bg-purple-955/20 dark:text-purple-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Documents Received</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{documentsCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/20 dark:text-blue-400">
            <Info className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Pending Actions</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingActionsCount}</h4>
          </div>
        </Card>
      </div>

      {/* Filter Row Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border-app pb-2">
        {(['All', 'Unread', 'Leave', 'Attendance', 'Payroll', 'Documents', 'Announcements', 'System'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-text-muted hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-850 dark:hover:text-slate-200'
            }`}
          >
            {cat}
            {cat === 'Unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[9px]">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="p-0 overflow-hidden divide-y divide-border-app">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-text-muted">No notifications found.</p>
          </div>
        ) : (
          filteredList.map((item) => {
            const IconComponent = getIcon(item.category)
            return (
              <div
                key={item.id}
                className={`flex gap-4 p-5 items-start transition-all duration-150 relative ${
                  !item.read
                    ? 'bg-blue-50/25 dark:bg-blue-955/10'
                    : 'bg-card-app'
                }`}
              >
                {!item.read && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600" />
                )}

                <div className={`p-3 rounded-lg flex-shrink-0 ${getCategoryStyles(item.category)}`}>
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {item.category}
                      </span>
                      {getPriorityBadge(item.priority)}
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{item.message}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-[11px] text-text-muted font-medium">{item.timestamp}</p>
                    
                    <Link
                      to={getActionLink(item.category)}
                      onClick={() => handleMarkAsRead(item.id)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                    >
                      {getActionLabel(item.category)} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Mark as read & Delete controls */}
                <div className="flex items-center gap-2 self-center">
                  {!item.read && (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:text-slate-400 cursor-pointer"
                      title="Mark as read"
                    >
                      <Check className="h-4.5 w-4.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-550 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-955/20 cursor-pointer"
                    title="Delete notification"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </Card>
    </div>
  )
}
