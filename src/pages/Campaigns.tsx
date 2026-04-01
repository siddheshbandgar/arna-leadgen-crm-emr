import { useState, useMemo } from 'react'
import { Send, Clock, FileEdit } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import { patients } from '../data/patients'
import { useToast } from '../components/ui/Toast'

const treatmentOptions = ['All', 'Laser', 'Botox', 'Chemical Peel', 'Acne', 'Hair PRP', 'Fillers']
const lastVisitOptions = ['Any time', 'Last 7 days', 'Last 30 days', 'Last 90 days']
const pointsOptions = ['Any', '1000+', '5000+', '10000+']

const templates = [
  { id: 't1', name: 'Promotion Offer', text: 'Hi {name}, we have a special offer for you at Arna Clinic! Get {discount}% off your next {treatment} session. Book now!' },
  { id: 't2', name: 'Appointment Reminder', text: 'Hi {name}, this is a reminder for your upcoming appointment at Arna Clinic on {date} at {time}. See you soon!' },
  { id: 't3', name: 'Follow-up', text: 'Hi {name}, it has been a while since your last visit. We would love to see you again at Arna Clinic. Book your next session today!' },
]

export default function Campaigns() {
  const { showToast } = useToast()
  const [treatmentFilter, setTreatmentFilter] = useState('All')
  const [lastVisitFilter, setLastVisitFilter] = useState('Any time')
  const [pointsFilter, setPointsFilter] = useState('Any')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [messageText, setMessageText] = useState('')

  const segmentCount = useMemo(() => {
    return patients.filter(p => {
      if (treatmentFilter !== 'All' && !p.treatments.includes(treatmentFilter)) return false

      if (lastVisitFilter !== 'Any time') {
        const parts = p.lastVisit.split(' ')
        const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
        const visitDate = new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]))
        const now = new Date(2026, 2, 13)
        const diffDays = Math.floor((now.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24))
        if (lastVisitFilter === 'Last 7 days' && diffDays > 7) return false
        if (lastVisitFilter === 'Last 30 days' && diffDays > 30) return false
        if (lastVisitFilter === 'Last 90 days' && diffDays > 90) return false
      }

      if (pointsFilter !== 'Any') {
        const minPoints = parseInt(pointsFilter.replace('+', ''))
        if (p.loyaltyPoints < minPoints) return false
      }

      return true
    }).length
  }, [treatmentFilter, lastVisitFilter, pointsFilter])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    const tmpl = templates.find(t => t.id === templateId)
    if (tmpl) setMessageText(tmpl.text)
  }

  const handleSend = () => {
    if (!messageText.trim()) { showToast('Please enter a message', 'error'); return }
    if (segmentCount === 0) { showToast('No patients in this segment', 'error'); return }
    showToast(`Campaign sent to ${segmentCount} patients!`)
  }

  const statusColors: Record<string, { bg: string; text: string; icon: typeof Send }> = {
    'Sent': { bg: '#D1FAE5', text: '#065F46', icon: Send },
    'Scheduled': { bg: '#DBEAFE', text: '#1D4ED8', icon: Clock },
    'Draft': { bg: '#F3F4F6', text: '#374151', icon: FileEdit },
  }

  const selectStyle: React.CSSProperties = { padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', background: 'white' }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Campaigns</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Create and manage WhatsApp marketing campaigns</p>
      </div>

      {/* Campaign Builder */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Campaign Builder</h3>

        {/* Segment filters */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '500', color: '#374151' }}>Target Segment</p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase' }}>Treatment</label>
              <select value={treatmentFilter} onChange={e => setTreatmentFilter(e.target.value)} style={selectStyle}>
                {treatmentOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase' }}>Last Visit</label>
              <select value={lastVisitFilter} onChange={e => setLastVisitFilter(e.target.value)} style={selectStyle}>
                {lastVisitOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase' }}>Loyalty Points</label>
              <select value={pointsFilter} onChange={e => setPointsFilter(e.target.value)} style={selectStyle}>
                {pointsOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginLeft: '8px', padding: '10px 16px', background: '#111', borderRadius: '8px', alignSelf: 'flex-end' }}>
              <span style={{ fontSize: '13px', color: 'white', fontWeight: '600' }}>This segment contains <span style={{ fontSize: '18px' }}>{segmentCount}</span> patients</span>
            </div>
          </div>
        </div>

        {/* Message composer */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '500', color: '#374151' }}>Message</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t.id)}
                style={{
                  padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer',
                  background: selectedTemplate === t.id ? '#111' : 'white',
                  color: selectedTemplate === t.id ? 'white' : '#374151',
                  border: `1px solid ${selectedTemplate === t.id ? '#111' : '#E5E7EB'}`,
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
          <textarea
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            placeholder="Type your campaign message... Use {name} for personalization."
            style={{ width: '100%', padding: '12px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '100px', fontFamily: 'inherit', lineHeight: '1.6' }}
          />
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6B7280' }}>{messageText.length} characters | Variables: {'{name}'}, {'{treatment}'}, {'{date}'}, {'{discount}'}</p>
        </div>

        <button onClick={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          <Send size={15} /> Send Campaign
        </button>
      </div>

      {/* Campaign History */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111' }}>Campaign History</h3>
        </div>
        <div className="tbl-wrap"><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Campaign', 'Segment', 'Sent', 'Delivered', 'Read', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => {
              const sc = statusColors[c.status]
              return (
                <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#111' }}>{c.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{c.segment}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{c.sent}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{c.delivered}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>
                    {c.read}
                    {c.sent > 0 && <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '4px' }}>({Math.round(c.read / c.sent * 100)}%)</span>}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>{c.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: sc.bg, color: sc.text }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
