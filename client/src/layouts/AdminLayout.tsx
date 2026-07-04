import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-app">
      <Sidebar
        type="admin"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

