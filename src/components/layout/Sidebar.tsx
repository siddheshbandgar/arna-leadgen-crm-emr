import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserSquare2, Calendar, FileText,
  Pill, CreditCard, Megaphone, Bot, Radio, MessageSquareCode, Settings, LogOut, PhoneCall
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/patients', icon: UserSquare2, label: 'Patients' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/forms', icon: FileText, label: 'Forms & Consents' },
  { to: '/prescriptions', icon: Pill, label: 'Prescriptions' },
  { to: '/billing', icon: CreditCard, label: 'Billing' },
  { to: '/campaigns', icon: Megaphone, label: 'Campaigns' },
  { to: '/ai-agents', icon: Bot, label: 'AI Agents' },
  { to: '/ai-calls', icon: PhoneCall, label: 'AI Voice Calls' },
  { to: '/channels', icon: Radio, label: 'Channels' },
  { to: '/wa-templates', icon: MessageSquareCode, label: 'WA Templates' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <div style={{ width: '240px', minWidth: '240px', backgroundColor: '#1A1A1A', color: 'white', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>A</span>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Arna Clinic</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Skin & Hair</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '6px',
              marginBottom: '2px',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: '500',
              backgroundColor: isActive ? '#2A2A2A' : 'transparent',
              color: isActive ? 'white' : '#9CA3AF',
              transition: 'all 0.15s',
            })}
          >
            <Icon size={16} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid #2A2A2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#3A3A3A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: 'white' }}>M</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '500', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Mounika Ketha</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>mounika@arnaclinic.in</div>
          </div>
          <LogOut size={15} style={{ color: '#9CA3AF', cursor: 'pointer', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}
