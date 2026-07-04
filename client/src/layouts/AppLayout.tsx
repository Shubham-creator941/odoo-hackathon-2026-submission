import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ContentContainer from '@/components/layout/ContentContainer'

interface AppLayoutProps {
  type: 'admin' | 'employee'
}

export default function AppLayout({ type }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-app">
      <Sidebar
        type={type}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <ContentContainer>
            <Breadcrumb />
            <Outlet />
          </ContentContainer>
        </main>

        <Footer />
      </div>
    </div>
  )
}
