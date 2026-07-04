import { useEffect, useState } from 'react'
import { CalendarX, Plus } from 'lucide-react'
import { toast } from 'sonner'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import LeaveForm from '../components/LeaveForm'
import { getLeaveBalances, getEmployeeLeaves, applyLeave } from '../services/leave.api'
import type { LeaveRequest, LeaveBalance } from '../types'
import type { LeaveInput } from '../schemas/leave.schema'
import { useAuth } from '@/context/AuthContext'

export default function EmployeeLeavePage() {
  const { user } = useAuth()
  const [balances, setBalances] = useState<LeaveBalance[]>([])
  const [myLeaves, setMyLeaves] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApplyForm, setShowApplyForm] = useState(false)

  useEffect(() => {
    let active = true
    async function loadData() {
      setIsLoading(true)
      try {
        const [b, l] = await Promise.all([
          getLeaveBalances(),
          getEmployeeLeaves(user?.employeeId),
        ])
        if (active) {
          setBalances(b)
          setMyLeaves(l)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }
    loadData()
    return () => {
      active = false
    }
  }, [user?.employeeId])

  const handleApply = async (data: LeaveInput) => {
    setIsSubmitting(true)
    try {
      const newLeave = await applyLeave(
        {
          leaveType: data.leaveType,
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
        },
        user?.employeeId
      )
      toast.success('Leave request submitted successfully!')
      setMyLeaves((prev) => [newLeave, ...prev])
      setShowApplyForm(false)
      // Refresh balances
      const b = await getLeaveBalances()
      setBalances(b)
    } catch {
      toast.error('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Leave Management"
        description="View your leave balances, history of requests, and submit new leave requests."
        actions={
          <Button
            onClick={() => setShowApplyForm(!showApplyForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> {showApplyForm ? 'View Leave History' : 'Apply for Leave'}
          </Button>
        }
      />

      {/* Leave Balance Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="h-24"><LoadingSkeleton type="cards" /></Card>
          ))
        ) : (
          balances.map((b) => {
            let colorClasses = 'bg-indigo-50/50 text-indigo-650 dark:bg-indigo-955/20 dark:text-indigo-400'
            if (b.type === 'Sick Leave') {
              colorClasses = 'bg-green-50/50 text-green-600 dark:bg-green-955/25 dark:text-green-400'
            } else if (b.type === 'Casual Leave') {
              colorClasses = 'bg-amber-50/50 text-amber-600 dark:bg-amber-955/25 dark:text-amber-400'
            }
            return (
              <Card key={b.type} className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-semibold text-text-muted">{b.type}</p>
                  <h4 className="text-2xl font-bold mt-1 text-slate-800 dark:text-white">
                    {b.remaining} <span className="text-xs font-medium text-text-muted">/ {b.allocated} days</span>
                  </h4>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <CalendarX className="h-6 w-6" />
                </div>
              </Card>
            )
          })
        )}
      </div>

      {showApplyForm ? (
        <Card className="max-w-xl mx-auto p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">New Leave Application</h3>
          <LeaveForm onSubmit={handleApply} isSubmitting={isSubmitting} cancelPath="/employee/leave" />
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-border-app flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">My Leave Requests History</h3>
          </div>
          {isLoading ? (
            <div className="p-6"><LoadingSkeleton type="table" count={4} /></div>
          ) : myLeaves.length === 0 ? (
            <div className="py-12 text-center text-text-muted">No leave requests logged.</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm text-text-muted border-collapse">
                <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-text-main border-b border-border-app">
                  <tr>
                    <th className="px-6 py-4">Leave Type</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4">End Date</th>
                    <th className="px-6 py-4 text-center">Duration</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Manager Remarks</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-app bg-card-app">
                  {myLeaves.map((lv) => (
                    <tr key={lv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-150">
                      <td className="px-6 py-4 font-bold text-indigo-650 dark:text-indigo-400 text-xs">{lv.leaveType}</td>
                      <td className="px-6 py-4 text-xs text-text-muted">{lv.startDate}</td>
                      <td className="px-6 py-4 text-xs text-text-muted">{lv.endDate}</td>
                      <td className="px-6 py-4 text-xs text-center font-semibold text-text-main">{lv.duration}</td>
                      <td className="px-6 py-4 text-xs max-w-xs truncate" title={lv.reason}>{lv.reason}</td>
                      <td className="px-6 py-4 text-xs text-text-muted italic max-w-xs truncate" title={lv.remarks ?? ''}>
                        {lv.remarks ? lv.remarks : <span className="text-slate-300 dark:text-slate-700">—</span>}
                      </td>
                      <td className="px-6 py-4 text-right"><StatusBadge status={lv.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
