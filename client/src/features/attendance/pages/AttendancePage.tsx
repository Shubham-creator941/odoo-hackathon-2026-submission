import { useEffect, useState } from 'react'
import { Clock, Calendar as CalendarIcon, LogIn, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import AttendanceStats from '../components/AttendanceStats'
import AttendanceTable from '../components/AttendanceTable'
import AttendanceCalendar from '../components/AttendanceCalendar'
import { getAttendanceLogs, checkIn, checkOut } from '../services/attendance.api'
import type { AttendanceRecord } from '../types'

export default function AttendancePage() {
  const [logs, setLogs] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar'>('overview')
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentLogId, setCurrentLogId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getAttendanceLogs()
        setLogs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleCheckIn = async () => {
    try {
      const newLog = await checkIn()
      setLogs((prev) => [newLog, ...prev])
      setIsCheckedIn(true)
      setCurrentLogId(newLog.id)
      toast.success('Successfully checked in!', {
        description: `Checked in at ${newLog.checkIn}`,
      })
    } catch {
      toast.error('Check-in failed. Please try again.')
    }
  }

  const handleCheckOut = async () => {
    if (!currentLogId) return
    try {
      const updatedLog = await checkOut(currentLogId)
      setLogs((prev) => prev.map((l) => (l.id === currentLogId ? updatedLog : l)))
      setIsCheckedIn(false)
      setCurrentLogId(null)
      toast.success('Successfully checked out!', {
        description: `Checked out at ${updatedLog.checkOut}. Total hours: ${updatedLog.workingHours}`,
      })
    } catch {
      toast.error('Check-out failed. Please try again.')
    }
  }

  const headerActions = (
    <div className="flex items-center gap-3">
      {isCheckedIn ? (
        <Button
          variant="outline"
          onClick={handleCheckOut}
          className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20"
        >
          <LogOut className="h-4 w-4" /> Check Out
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleCheckIn}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" /> Check In
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Attendance Management"
        description="Track daily check-ins, working hours, and review monthly attendance logs."
        actions={headerActions}
      />

      <AttendanceStats logs={logs} isLoading={isLoading} />

      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Clock className="h-4 w-4" /> Log Overview
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'calendar'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <CalendarIcon className="h-4 w-4" /> Calendar View
        </button>
      </div>

      <div>
        {activeTab === 'overview' ? (
          <AttendanceTable logs={logs} isLoading={isLoading} />
        ) : (
          <AttendanceCalendar logs={logs} />
        )}
      </div>
    </div>
  )
}
