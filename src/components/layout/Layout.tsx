import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import AssistantDemo from '../ui/AssistantDemo'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: '#F5F5F7' }}>
      {/* Mobile sidebar backdrop */}
      <div
        className={`sidebar-backdrop${sidebarOpen ? ' is-visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}>
        {/* Mobile top bar — hidden on desktop via CSS */}
        <div className="mobile-topbar">
          <button className="mobile-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <span className="mobile-topbar-title">Arna Clinic</span>
        </div>
        <Outlet />
      </main>

      <AssistantDemo />
    </div>
  )
}
