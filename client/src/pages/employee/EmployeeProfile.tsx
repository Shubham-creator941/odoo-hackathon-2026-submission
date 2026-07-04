import { useState, type FormEvent } from 'react'
import { User, Mail, Phone, MapPin, Award, Calendar, Edit, Activity, CheckCircle, Briefcase, FileText } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { mockProfile, type EmployeeProfile } from '@/features/employee/mock/profile'

export default function EmployeeProfilePage() {
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
          title="My Profile"
          description="View and manage your personal coordinates, emergency contacts, expertise skills, and documents."
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
          <Card className="flex flex-col items-center text-center p-6">
            <div className="h-24 w-24 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center text-3xl font-extrabold text-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-indigo-400">
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
                  className="px-2.5 py-1 bg-slate-50 dark:bg-slate-855 border border-border-app rounded-md text-xs font-semibold text-text-main"
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
              {(['personal', 'employment', 'attendance', 'activity'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold text-center border-b-2 transition-all capitalize cursor-pointer ${
                    activeTab === tab
                      ? 'border-b-indigo-600 text-indigo-600 dark:border-b-indigo-400 dark:text-indigo-400'
                      : 'border-b-transparent text-text-muted hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <User className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                      Contact & Location Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <p className="text-slate-400 uppercase">FULL NAME</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.fullName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 uppercase font-sans flex items-center gap-1">
                          <Mail className="h-3 w-3" /> EMAIL ADDRESS
                        </p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 uppercase flex items-center gap-1">
                          <Phone className="h-3 w-3" /> PHONE NUMBER
                        </p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 uppercase flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> PERMANENT ADDRESS
                        </p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-app pt-6">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Briefcase className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                      Emergency Contacts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <p className="text-slate-400">CONTACT NAME</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.emergencyContact.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400">RELATIONSHIP</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.emergencyContact.relation}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> PHONE NUMBER
                        </p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'employment' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Briefcase className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                      Workplace Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <p className="text-slate-400">DESIGNATION</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.designation}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400">DEPARTMENT</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.department}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400">JOINING DATE</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.joiningDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400">REPORTING MANAGER</p>
                        <p className="text-slate-800 dark:text-slate-200">{profile.reportingManager}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-app pt-6">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                      Education Background
                    </h4>
                    <div className="space-y-3 text-xs font-semibold">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-850 dark:text-slate-200">M.S. in Computer Science</p>
                          <p className="text-slate-400 text-[11px] mt-0.5">Stanford University</p>
                        </div>
                        <span className="text-text-muted">Graduated 2022</span>
                      </div>
                      <div className="flex justify-between items-start border-t border-border-app/40 pt-3">
                        <div>
                          <p className="text-slate-850 dark:text-slate-200">B.S. in Software Engineering</p>
                          <p className="text-slate-400 text-[11px] mt-0.5">University of Michigan</p>
                        </div>
                        <span className="text-text-muted">Graduated 2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-green-600" />
                    Attendance Summary (Current Month)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl text-center">
                      <p className="text-xs text-text-muted">Present days</p>
                      <p className="text-2xl font-bold text-slate-850 dark:text-slate-200 mt-1">18</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl text-center">
                      <p className="text-xs text-text-muted">Late arrivals</p>
                      <p className="text-2xl font-bold text-amber-600 mt-1">2</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl text-center">
                      <p className="text-xs text-text-muted">Half days</p>
                      <p className="text-2xl font-bold text-slate-500 mt-1">1</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl text-center">
                      <p className="text-xs text-text-muted">Absent days</p>
                      <p className="text-2xl font-bold text-red-650 mt-1">0</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Activity className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                    My Activity Logs
                  </h4>
                  <div className="relative pl-6 border-l border-border-app space-y-4 text-xs font-semibold">
                    <div className="relative">
                      <div className="absolute -left-[30px] p-1 bg-green-500 rounded-full text-white">
                        <CheckCircle className="h-2 w-2" />
                      </div>
                      <p className="text-slate-850 dark:text-slate-200">Checked in today at 08:58 AM</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Today, 08:58 AM</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[30px] p-1 bg-blue-500 rounded-full text-white">
                        <FileText className="h-2 w-2" />
                      </div>
                      <p className="text-slate-850 dark:text-slate-200">Uploaded Tax Verification documents</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Yesterday, 04:22 PM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile Details">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-main mb-1">Full Name</label>
            <Input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1">Phone Number</label>
            <Input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1">Permanent Address</label>
            <Input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-main mb-1">Designation</label>
            <Input type="text" value={editDesignation} onChange={(e) => setEditDesignation(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border-app">
            <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
