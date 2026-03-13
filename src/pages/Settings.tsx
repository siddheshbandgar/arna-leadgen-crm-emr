import { useState } from 'react'
import { Building2, User, Bell, Shield, Palette, Globe } from 'lucide-react'
import { useToast } from '../components/ui/Toast'

const settingsTabs = [
  { label: 'Clinic Profile', icon: Building2 },
  { label: 'User Account', icon: User },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: Shield },
  { label: 'Appearance', icon: Palette },
  { label: 'Integrations', icon: Globe },
]

export default function Settings() {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState(0)

  // Clinic profile state
  const [clinicName, setClinicName] = useState('Arna Clinic - Skin & Hair')
  const [clinicPhone, setClinicPhone] = useState('+91 40 1234 5678')
  const [clinicEmail, setClinicEmail] = useState('info@arnaclinic.in')
  const [clinicAddress, setClinicAddress] = useState('Road No. 12, Banjara Hills, Hyderabad, Telangana 500034')
  const [clinicTimings, setClinicTimings] = useState('Mon-Sat: 5:00 PM - 9:00 PM')
  const [consultationFee, setConsultationFee] = useState('700')

  // Notifications state
  const [notifAppointment, setNotifAppointment] = useState(true)
  const [notifLeads, setNotifLeads] = useState(true)
  const [notifBilling, setNotifBilling] = useState(false)
  const [notifCampaigns, setNotifCampaigns] = useState(true)

  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }

  const renderContent = () => {
    switch (activeTab) {
      case 0: // Clinic Profile
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>Clinic Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Clinic Name</label>
                <input style={inputStyle} value={clinicName} onChange={e => setClinicName(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={clinicPhone} onChange={e => setClinicPhone(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={clinicEmail} onChange={e => setClinicEmail(e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Address</label>
                <input style={inputStyle} value={clinicAddress} onChange={e => setClinicAddress(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Working Hours</label>
                <input style={inputStyle} value={clinicTimings} onChange={e => setClinicTimings(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Consultation Fee (Rs.)</label>
                <input style={inputStyle} type="number" value={consultationFee} onChange={e => setConsultationFee(e.target.value)} />
              </div>
            </div>
            <button onClick={() => showToast('Clinic profile saved!')} style={{ marginTop: '20px', padding: '9px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Save Changes</button>
          </div>
        )

      case 1: // User Account
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>User Account</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: 'white' }}>M</div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '600', color: '#111' }}>Dr. Mounika Ketha</p>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6B7280' }}>MBBS, MD Dermatology</p>
                <button onClick={() => showToast('Upload feature coming soon', 'info')} style={{ padding: '5px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>Change Photo</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} defaultValue="Dr. Mounika Ketha" />
              </div>
              <div>
                <label style={labelStyle}>Qualification</label>
                <input style={inputStyle} defaultValue="MBBS, MD Dermatology" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} defaultValue="mounika@arnaclinic.in" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} defaultValue="+91 98765 43210" />
              </div>
              <div>
                <label style={labelStyle}>Registration Number</label>
                <input style={inputStyle} defaultValue="AP-MCI-2018-12345" />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} defaultValue="Admin / Doctor" disabled />
              </div>
            </div>
            <button onClick={() => showToast('Account updated!')} style={{ marginTop: '20px', padding: '9px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Update Account</button>
          </div>
        )

      case 2: // Notifications
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>Notification Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
              {[
                { label: 'Appointment Notifications', desc: 'Get notified about new, changed, or cancelled appointments', state: notifAppointment, setter: setNotifAppointment },
                { label: 'New Lead Alerts', desc: 'Receive alerts when new leads come in from any channel', state: notifLeads, setter: setNotifLeads },
                { label: 'Billing Notifications', desc: 'Get notified about payment status changes', state: notifBilling, setter: setNotifBilling },
                { label: 'Campaign Reports', desc: 'Receive campaign delivery and read reports', state: notifCampaigns, setter: setNotifCampaigns },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '500', color: '#111' }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{item.desc}</p>
                  </div>
                  <button onClick={() => item.setter(!item.state)} style={{ background: item.state ? '#111' : '#D1D5DB', border: 'none', borderRadius: '999px', width: '44px', height: '24px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: item.state ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('Preferences saved!')} style={{ marginTop: '20px', padding: '9px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Save Preferences</button>
          </div>
        )

      case 3: // Security
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>Security Settings</h3>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '24px', padding: '16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: '#111' }}>Change Password</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Current Password</label>
                    <input style={inputStyle} type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label style={labelStyle}>New Password</label>
                    <input style={inputStyle} type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input style={inputStyle} type="password" placeholder="Confirm new password" />
                  </div>
                  <button onClick={() => showToast('Password updated!')} style={{ padding: '9px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', alignSelf: 'flex-start' }}>Update Password</button>
                </div>
              </div>

              <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600', color: '#111' }}>Two-Factor Authentication</h4>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6B7280' }}>Add an extra layer of security to your account</p>
                <button onClick={() => showToast('2FA setup coming soon', 'info')} style={{ padding: '8px 16px', border: '1px solid #E5E7EB', borderRadius: '7px', background: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#374151' }}>Enable 2FA</button>
              </div>
            </div>
          </div>
        )

      case 4: // Appearance
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>Appearance</h3>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Theme</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Light', 'Dark', 'System'].map(theme => (
                    <button key={theme} style={{
                      padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                      background: theme === 'Light' ? '#111' : 'white',
                      color: theme === 'Light' ? 'white' : '#374151',
                      border: `1px solid ${theme === 'Light' ? '#111' : '#E5E7EB'}`,
                    }}>{theme}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Sidebar Position</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Left', 'Right'].map(pos => (
                    <button key={pos} style={{
                      padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                      background: pos === 'Left' ? '#111' : 'white',
                      color: pos === 'Left' ? 'white' : '#374151',
                      border: `1px solid ${pos === 'Left' ? '#111' : '#E5E7EB'}`,
                    }}>{pos}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Font Size</label>
                <select style={{ ...inputStyle, width: '200px' }} defaultValue="Medium">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 5: // Integrations
        return (
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '600', color: '#111' }}>Integrations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
              {[
                { name: 'Gupshup (WhatsApp API)', status: 'Connected', desc: 'WhatsApp Business API provider for messaging' },
                { name: 'Razorpay', status: 'Connected', desc: 'Payment gateway for online payments' },
                { name: 'Google Calendar', status: 'Not connected', desc: 'Sync appointments with Google Calendar' },
                { name: 'Practo', status: 'Connected', desc: 'Online appointment booking and reviews' },
                { name: 'Tally', status: 'Not connected', desc: 'Accounting and invoicing integration' },
              ].map(integration => (
                <div key={integration.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: '#111' }}>{integration.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{integration.desc}</p>
                  </div>
                  <button
                    onClick={() => showToast(integration.status === 'Connected' ? 'Already connected' : 'Connecting...', 'info')}
                    style={{
                      padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                      background: integration.status === 'Connected' ? '#D1FAE5' : 'white',
                      color: integration.status === 'Connected' ? '#065F46' : '#374151',
                      border: `1px solid ${integration.status === 'Connected' ? '#D1FAE5' : '#E5E7EB'}`,
                    }}
                  >
                    {integration.status === 'Connected' ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Settings</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage your clinic and account settings</p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Settings sidebar */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
            {settingsTabs.map((tab, i) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 16px',
                    background: activeTab === i ? '#F9FAFB' : 'white',
                    border: 'none', borderBottom: i < settingsTabs.length - 1 ? '1px solid #F3F4F6' : 'none',
                    cursor: 'pointer', fontSize: '13px', fontWeight: '500',
                    color: activeTab === i ? '#111' : '#6B7280',
                    borderLeft: activeTab === i ? '3px solid #111' : '3px solid transparent',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
