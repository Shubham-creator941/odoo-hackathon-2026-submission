import { useState, type FormEvent } from 'react'
import { User, Mail, Shield, ShieldCheck, Lock, Settings, Briefcase, Key } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockProfile } from '@/features/employee/mock/profile'

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'role' | 'permissions' | 'security' | 'account'>('profile')

  // Password reset mock states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdatePassword = (e: FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }
    toast.success('Password updated successfully', {
      description: 'Your login credentials have been refreshed.'
    })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Admin Profile Settings"
        description="Configure your administrative coordinates, view portal role credentials, system permissions, and update login security settings."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column Tabs Selector */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'profile', name: 'Profile Info', icon: User },
            { id: 'role', name: 'Role & Dept', icon: Briefcase },
            { id: 'permissions', name: 'Permissions', icon: ShieldCheck },
            { id: 'security', name: 'Security Settings', icon: Lock },
            { id: 'account', name: 'Account Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'border-border-app bg-card-app text-text-muted hover:bg-slate-50 dark:hover:bg-slate-850/40 hover:text-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            )
          })}
        </div>

        {/* Right Column Content Card */}
        <div className="lg:col-span-3">
          <Card className="h-full min-h-[400px]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-extrabold text-indigo-600">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{mockProfile.fullName}</h3>
                    <p className="text-xs text-text-muted mt-1">{mockProfile.designation} • {mockProfile.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border-app pt-6 text-xs font-semibold">
                  <div className="space-y-1">
                    <p className="text-slate-400">FULL NAME</p>
                    <p className="text-slate-800 dark:text-slate-200">{mockProfile.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> EMAIL ADDRESS
                    </p>
                    <p className="text-slate-800 dark:text-slate-200">john.doe@company.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">EMPLOYEE ID</p>
                    <p className="text-slate-800 dark:text-slate-200">{mockProfile.employeeId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">PHONE NUMBER</p>
                    <p className="text-slate-800 dark:text-slate-200">{mockProfile.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'role' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Role & Department</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <p className="text-slate-400">SYSTEM DESIGNATION</p>
                    <p className="text-slate-800 dark:text-slate-200">System HR Administrator</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">DEPARTMENT</p>
                    <p className="text-slate-800 dark:text-slate-200">Human Resources & Personnel Operations</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">ACCESS SCOPE</p>
                    <p className="text-slate-800 dark:text-slate-200">Global Admin Portal</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">REPORTS TO</p>
                    <p className="text-slate-800 dark:text-slate-200">Chief Human Resources Officer (CHRO)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Portal Permissions Access Policy</h4>
                </div>
                <p className="text-xs text-text-muted">
                  The following role authorizations are assigned to your user account and checked dynamically by application routers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-semibold">
                  {[
                    'READ_EMPLOYEE_RECORDS',
                    'WRITE_EMPLOYEE_RECORDS',
                    'PROCESS_PAYROLL_RUNS',
                    'APPROVE_REJECT_LEAVES',
                    'VERIFY_EMPLOYEE_DOCUMENTS',
                    'MANAGE_SYSTEM_SETTINGS',
                  ].map((perm) => (
                    <div key={perm} className="flex items-center gap-2.5 p-3 border border-border-app rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Security Settings</h4>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md pt-2">
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1.5">Current Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1.5">New Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1.5">Confirm New Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-blue-600 text-white font-bold">
                    Update Password
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Account Preferences</h4>
                </div>

                <div className="space-y-4 pt-2 text-xs font-semibold">
                  <div className="flex items-center justify-between p-4 border border-border-app rounded-xl">
                    <div>
                      <p className="text-slate-850 dark:text-slate-200">Email Notification Digests</p>
                      <p className="text-[11px] text-text-muted mt-0.5">Receive summary reports on leaves and payroll finalized runs</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border-app rounded-xl">
                    <div>
                      <p className="text-slate-850 dark:text-slate-200">Session Activity Logger</p>
                      <p className="text-[11px] text-text-muted mt-0.5">Retain audit trail of all check-in monitoring activities</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
