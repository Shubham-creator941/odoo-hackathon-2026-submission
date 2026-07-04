import { useState, type FormEvent } from 'react'
import { User, Mail, Phone, MapPin, ShieldAlert, Award, Calendar, Edit, Activity, CheckCircle, Briefcase, FileText } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockProfile, type EmployeeProfile } from '@/features/employee/mock/profile'

export default function Profile() {
  const [profile, setProfile] = useState<EmployeeProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState<'personal' | 'employment' | 'attendance' | 'activity'>('personal')
  const [isEditOpen, setIsEditOpen] = useState(false)

  // Edit Profile Form State
  const [editName, setEditName] = useState(profile.fullName)
  const [editPhone, setEditPhone] = useState(profile.phone)
  const [editAddress, setEditAddress] = useState(profile.address)
  const [editDesignation, setEditDesignation] = useState(profile.designation)

  const handleSaveEdit = (e: FormEvent) => {
    e.preventDefault()
    setProfile({
      ...profile,
      fullName: editName,
      phone: editPhone,
      address: editAddress,
      designation: editDesignation,
    })
    setIsEditOpen(false)
    toast.success('Profile updated successfully', {
      description: 'Your details have been saved locally.',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Employee Profile"
          description="View and manage detailed employment, personal coordinates, leave logs, and system skills info"
        />
        <Button
          onClick={() => {
            setEditName(profile.fullName)
            setEditPhone(profile.phone)
            setEditAddress(profile.address)
            setEditDesignation(profile.designation)
            setIsEditOpen(true)
          }}
          className="flex items-center gap-1.5 text-xs font-bold self-start sm:self-center bg-blue-600 text-white"
        >
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Profile Card & Skills */}
        <div className="space-y-6 lg:col-span-1">
          {/* Main Profile Info Card */}
          <Card className="flex flex-col items-center text-center p-6">
            <div className="h-24 w-24 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center text-3xl font-extrabold text-indigo-650 dark:bg-slate-800 dark:border-slate-700 dark:text-indigo-400">
              JD
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
              {profile.fullName}
            </h3>
            <p className="text-sm font-semibold text-text-muted mt-1">{profile.designation}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">{profile.department}</p>
            
            <div className="w-full border-t border-border-app mt-5 pt-4 space-y-2 text-left text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Employee ID:</span>
                <span className="text-slate-800 dark:text-slate-200">{profile.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Portal Role:</span>
                <span className="text-slate-800 dark:text-slate-200">{profile.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </Card>

          {/* Skills Card */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Expertise & Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-slate-50 dark:bg-slate-850 border border-border-app rounded-md text-xs font-semibold text-text-main"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Leave Balances Widget */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Leave Balances</h4>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100/50 dark:border-indigo-900/10">
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Annual</p>
                <p className="text-xl font-extrabold text-indigo-900 dark:text-indigo-250 mt-1">
                  {profile.leaveBalance.annual - profile.leaveBalance.used}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">days left</p>
              </div>
              <div className="p-3 bg-green-50/50 dark:bg-green-950/20 rounded-xl border border-green-100/50 dark:border-green-900/10">
                <p className="text-xs font-bold text-green-600 dark:text-green-400">Sick</p>
                <p className="text-xl font-extrabold text-green-900 dark:text-green-250 mt-1">
                  {profile.leaveBalance.sick}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">days left</p>
              </div>
              <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100/50 dark:border-amber-900/10">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Casual</p>
                <p className="text-xl font-extrabold text-amber-900 dark:text-amber-250 mt-1">
                  {profile.leaveBalance.casual}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">days left</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Tabbed Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-border-app bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex-1 py-4 text-xs font-bold text-center border-b-2 transition-all ${
                  activeTab === 'personal'
                    ? 'border-b-indigo-600 text-indigo-600 dark:border-b-indigo-400 dark:text-indigo-400'
                    : 'border-b-transparent text-text-muted hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab('employment')}
                className={`flex-1 py-4 text-xs font-bold text-center border-b-2 transition-all ${
                  activeTab === 'employment'
                    ? 'border-b-indigo-600 text-indigo-600 dark:border-b-indigo-400 dark:text-indigo-400'
                    : 'border-b-transparent text-text-muted hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Employment Info
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex-1 py-4 text-xs font-bold text-center border-b-2 transition-all ${
                  activeTab === 'attendance'
                    ? 'border-b-indigo-600 text-indigo-600 dark:border-b-indigo-400 dark:text-indigo-400'
                    : 'border-b-transparent text-text-muted hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Attendance Summary
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 py-4 text-xs font-bold text-center border-b-2 transition-all ${
                  activeTab === 'activity'
                    ? 'border-b-indigo-600 text-indigo-600 dark:border-b-indigo-400 dark:text-indigo-400'
                    : 'border-b-transparent text-text-muted hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Recent Activity
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                    <div className="space-y-1">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Mail className="h-4 w-4" /> Email Address
                      </p>
                      <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="h-4 w-4" /> Phone Number
                      </p>
                      <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.phone}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> Residential Address
                      </p>
                      <p className="text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">{profile.address}</p>
                    </div>
                  </div>

                  <div className="border-t border-border-app pt-5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                      <ShieldAlert className="h-5 w-5 text-red-500" /> Emergency Contact Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
                      <div>
                        <p className="text-slate-400">Contact Name</p>
                        <p className="text-slate-850 dark:text-slate-200 mt-1">{profile.emergencyContact.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Relationship</p>
                        <p className="text-slate-850 dark:text-slate-200 mt-1">{profile.emergencyContact.relation}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Phone Number</p>
                        <p className="text-slate-850 dark:text-slate-200 mt-1">{profile.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'employment' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                  <div>
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> Designation / Role
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.designation}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" /> Joining Date
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.joiningDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" /> Employment Type
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.employmentType}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> Work Location
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.workLocation}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <User className="h-4 w-4" /> Reporting Manager
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 mt-1">{profile.reportingManager}</p>
                  </div>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border-app">
                      <p className="text-xs text-text-muted">Attendance Rate</p>
                      <h4 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                        {profile.attendanceSummary.attendanceRate}
                      </h4>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border-app">
                      <p className="text-xs text-text-muted">Present Days</p>
                      <h4 className="text-2xl font-extrabold text-green-600 dark:text-green-400 mt-1">
                        {profile.attendanceSummary.presentDays}
                      </h4>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border-app">
                      <p className="text-xs text-text-muted">Absent Days</p>
                      <h4 className="text-2xl font-extrabold text-red-500 mt-1">
                        {profile.attendanceSummary.absentDays}
                      </h4>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border-app">
                      <p className="text-xs text-text-muted">Late Check-ins</p>
                      <h4 className="text-2xl font-extrabold text-amber-500 mt-1">
                        {profile.attendanceSummary.lateDays}
                      </h4>
                    </div>
                  </div>

                  <div className="border-t border-border-app pt-5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-indigo-650" /> Verification Documents Uploaded
                    </h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center p-3 border border-border-app bg-slate-50/20 dark:bg-slate-900/10 rounded-lg">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <FileText className="h-4.5 w-4.5 text-blue-500" />
                          <span>Employment_Contract_2026.pdf</span>
                        </div>
                        <Badge variant="success">Verified</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border-app bg-slate-50/20 dark:bg-slate-900/10 rounded-lg">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <FileText className="h-4.5 w-4.5 text-blue-500" />
                          <span>NDA_Signoff_Page.pdf</span>
                        </div>
                        <Badge variant="success">Verified</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="relative pl-6 border-l border-border-app space-y-6">
                  {profile.recentActivities.map((act) => (
                    <div key={act.id} className="relative">
                      <div className="absolute -left-[35px] top-1 p-1 bg-white dark:bg-slate-900 border border-border-app rounded-full text-indigo-600 dark:text-indigo-400">
                        <Activity className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {act.action}
                        </p>
                        <p className="text-[10px] text-text-muted mt-0.5">{act.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile Details">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Full Name *</label>
            <Input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Designation Title</label>
            <Input
              type="text"
              value={editDesignation}
              onChange={(e) => setEditDesignation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Phone Number</label>
            <Input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1.5">Residential Address</label>
            <textarea
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border-app bg-card-app text-text-main px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-border-app">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
