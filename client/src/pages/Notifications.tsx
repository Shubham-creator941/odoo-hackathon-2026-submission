import { useState } from 'react'
import { Bell, Info, AlertTriangle, DollarSign, CalendarCheck, CalendarX, Check, Trash2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockNotifications, type NotificationItem } from '@/features/notification/mock/notifications'

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [filter, setFilter] = useState<'All' | 'Unread' | 'System' | 'Leave' | 'Attendance' | 'Payroll'>('All')

  // Stats derivation
  const unreadCount = notifications.filter((n) => !n.read).length
  const todayCount = notifications.filter((n) => n.timestamp.startsWith('Today')).length
  const systemCount = notifications.filter((n) => n.category === 'System').length
  const priorityHighCount = notifications.filter((n) => n.priority === 'High').length

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
      default:
        return Bell
    }
  }

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'System':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/20'
      case 'Leave':
        return 'text-indigo-650 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/20'
      case 'Attendance':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20'
      case 'Payroll':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20'
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Notification Center"
          description="View alerts, updates, and organizational notifications for leave request approvals, attendance schedules, and payroll timelines"
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
            <p className="text-xs font-semibold text-text-muted">Unread Alerts</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{unreadCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Received Today</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{todayCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">System Alerts</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{systemCount}</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Info className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">High Priority</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{priorityHighCount}</h4>
          </div>
        </Card>
      </div>

      {/* Filter Row Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border-app pb-2">
        {(['All', 'Unread', 'System', 'Leave', 'Attendance', 'Payroll'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
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
                    ? 'bg-blue-50/20 dark:bg-blue-950/10'
                    : 'bg-card-app'
                }`}
              >
                {/* Unread blue dot indicator */}
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
                  <p className="text-[11px] text-text-muted mt-2 font-medium">{item.timestamp}</p>
                </div>

                {/* Inline Action Triggers */}
                <div className="flex items-center gap-2 self-center">
                  {!item.read && (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:text-slate-400"
                      title="Mark as read"
                    >
                      <Check className="h-4.5 w-4.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-550 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
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
