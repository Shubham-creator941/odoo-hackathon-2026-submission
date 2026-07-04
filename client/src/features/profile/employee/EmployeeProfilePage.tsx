import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Award, BookOpen, Briefcase, Plus, HeartHandshake } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

interface EducationItem {
  degree: string
  school: string
  year: string
}

interface ExperienceItem {
  role: string
  company: string
  period: string
}

export default function EmployeeProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  // Profile fields state
  const [phone, setPhone] = useState('+1 (555) 014-2834')
  const [address, setAddress] = useState('456 Redwood Highway, Apt 12, Mill Valley, CA 94941')
  const [emergencyName, setEmergencyName] = useState('Mark Smith')
  const [emergencyRelation, setEmergencyRelation] = useState('Brother')
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 014-5829')

  const [skills, setSkills] = useState<string[]>([
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Vite',
    'Next.js',
    'Jest',
    'Git & GitHub',
  ])
  const [newSkill, setNewSkill] = useState('')

  const education: EducationItem[] = [
    { degree: 'B.S. in Computer Science', school: 'University of California, Berkeley', year: '2018 - 2022' },
  ]

  const experience: ExperienceItem[] = [
    { role: 'Software Engineer', company: 'TechSolutions Corp', period: '2022 - 2024' },
    { role: 'Frontend Intern', company: 'Innovate Labs', period: '2021 (6 months)' },
  ]

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    toast.success('Profile Updated Successfully', {
      description: 'Your changes have been saved to your local workspace.'
    })
  }

  const handleAddSkill = (e: FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    if (skills.includes(newSkill.trim())) {
      toast.error('Skill already exists')
      return
    }
    setSkills([...skills, newSkill.trim()])
    setNewSkill('')
    toast.success('Skill added')
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Profile"
        description="View your employment records, update contact coordinates, emergency contacts, education, and professional skills."
        actions={
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Card: Basic User Profile */}
        <Card className="flex flex-col items-center text-center p-6 lg:col-span-1">
          <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
            {user?.fullName?.split(' ').map((n) => n[0]).join('') ?? 'EE'}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.fullName ?? 'Employee Name'}</h3>
          <p className="text-xs font-semibold text-text-muted mt-1">Frontend Engineer · Engineering</p>
          <Badge className="mt-3.5" variant="info">
            EMP-2026-0042
          </Badge>

          <div className="w-full text-left border-t border-border-app mt-6 pt-5 space-y-4 text-xs font-semibold">
            <div className="flex items-center gap-2.5 text-text-muted">
              <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">{user?.email ?? 'jane.smith@company.com'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-text-muted">
              <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-text-muted">
              <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className="leading-tight">{address}</span>
            </div>
          </div>
        </Card>

        {/* Right Sections: Details / Forms */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <Card className="p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Edit Personal Information</h3>
              <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5">Phone Number</label>
                    <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5">Address</label>
                    <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </div>
                </div>

                <div className="border-t border-border-app pt-4 mt-4 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Emergency Contact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1.5">Contact Name</label>
                      <Input type="text" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1.5">Relationship</label>
                      <Input type="text" value={emergencyRelation} onChange={(e) => setEmergencyRelation(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1.5">Phone Number</label>
                      <Input type="text" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border-app">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <>
              {/* Emergency Contacts */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4 border-b border-border-app pb-3">
                  <HeartHandshake className="h-5 w-5 text-red-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Emergency Contact</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <p className="text-slate-400">CONTACT NAME</p>
                    <p className="text-slate-800 dark:text-slate-200">{emergencyName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">RELATIONSHIP</p>
                    <p className="text-slate-800 dark:text-slate-200">{emergencyRelation}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">PHONE NUMBER</p>
                    <p className="text-slate-800 dark:text-slate-200">{emergencyPhone}</p>
                  </div>
                </div>
              </Card>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-border-app pb-2">
                    <BookOpen className="h-4.5 w-4.5 text-blue-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education</h3>
                  </div>
                  {education.map((edu) => (
                    <div key={edu.degree} className="text-xs font-semibold space-y-1">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{edu.degree}</h4>
                      <p className="text-text-muted">{edu.school}</p>
                      <p className="text-[11px] text-text-muted mt-1">{edu.year}</p>
                    </div>
                  ))}
                </Card>

                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4 border-b border-border-app pb-2">
                    <Briefcase className="h-4.5 w-4.5 text-indigo-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Experience</h3>
                  </div>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.role} className="text-xs font-semibold space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{exp.role}</h4>
                        <p className="text-text-muted">{exp.company}</p>
                        <p className="text-[11px] text-text-muted mt-1">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Skills */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4 border-b border-border-app pb-2">
                  <Award className="h-4.5 w-4.5 text-yellow-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="info">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2 max-w-xs">
                  <Input
                    type="text"
                    placeholder="Add new skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="text-xs"
                  />
                  <Button type="submit" className="flex items-center gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" /> Add
                  </Button>
                </form>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
