import { useState } from 'react'
import { Search, MessageCircle, Calendar, UserPlus } from 'lucide-react'
import { leads } from '../data/leads'
import type { Lead } from '../data/leads'
import { useToast } from '../components/ui/Toast'

const statusColors: Record<string, { bg: string; text: string }> = {
  'New': { bg: '#DBEAFE', text: '#1D4ED8' },
  'Contacted': { bg: '#FEF3C7', text: '#92400E' },
  'Booked': { bg: '#EDE9FE', text: '#6D28D9' },
  'Visited': { bg: '#FED7AA', text: '#92400E' },
  'Converted': { bg: '#D1FAE5', text: '#065F46' },
  'Lost': { bg: '#F3F4F6', text: '#374151' },
}

export default function Leads() {
  const [selected, setSelected] = useState<Lead | null>(null)
  const [search, setSearch] = useState('')
  const { showToast } = useToast()

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    l.interest.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Leads</h1>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>{leads.length} total leads from all sources</p>
          </div>
          <button onClick={() => showToast('Coming soon')} style={{ padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>+ New Lead</button>
        </div>

        <div style={{ position: 'relative', marginBottom: '16px', maxWidth: '340px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                {['Name', 'Contact', 'Source', 'Interest', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id}
                  onClick={() => setSelected(lead)}
                  style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer', background: selected?.id === lead.id ? '#F9FAFB' : 'white' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: 'white', flexShrink: 0 }}>
                        {lead.name.charAt(0)}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>{lead.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{lead.phone}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{lead.source}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{lead.interest}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[lead.status]?.bg, color: statusColors[lead.status]?.text }}>{lead.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div style={{ width: '320px', background: 'white', borderLeft: '1px solid #E5E7EB', padding: '24px', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>Lead Details</h2>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '18px' }}>x</button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: 'white', margin: '0 auto 10px' }}>
              {selected.name.charAt(0)}
            </div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: '#111' }}>{selected.name}</h3>
            <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[selected.status]?.bg, color: statusColors[selected.status]?.text }}>{selected.status}</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CONTACT</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#111' }}>{selected.phone}</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SOURCE</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#111' }}>{selected.source}</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>TAGS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selected.tags.map(t => <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', background: '#F3F4F6', color: '#374151' }}>{t}</span>)}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI SUMMARY</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6', background: '#F9FAFB', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>{selected.aiSummary}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => showToast('Opening WhatsApp...')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <MessageCircle size={15} /> Send WhatsApp
            </button>
            <button onClick={() => showToast('Booking appointment...')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', background: 'white', color: '#111', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <Calendar size={15} /> Book Appointment
            </button>
            <button onClick={() => showToast('Converting to patient...')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', background: '#10B981', color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <UserPlus size={15} /> Convert to Patient
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
