import { useState } from 'react'
import { Copy, Eye, Plus, X } from 'lucide-react'
import { useToast } from '../components/ui/Toast'

interface WATemplate {
  id: string
  name: string
  category: 'Marketing' | 'Utility' | 'Authentication'
  status: 'Approved' | 'Pending' | 'Rejected'
  language: string
  body: string
  lastUsed: string
  usageCount: number
}

const templates: WATemplate[] = [
  {
    id: 'wt1', name: 'appointment_reminder', category: 'Utility', status: 'Approved', language: 'English',
    body: 'Hi {{1}}, this is a reminder for your appointment at Arna Clinic on {{2}} at {{3}}. Please arrive 10 minutes early. Reply CONFIRM to confirm or RESCHEDULE to change your appointment.',
    lastUsed: '13 Mar 2026', usageCount: 342,
  },
  {
    id: 'wt2', name: 'treatment_followup', category: 'Utility', status: 'Approved', language: 'English',
    body: 'Hi {{1}}, we hope your {{2}} session went well! Here are your post-treatment care instructions: {{3}}. If you have any concerns, please contact us at +91 40 1234 5678.',
    lastUsed: '12 Mar 2026', usageCount: 189,
  },
  {
    id: 'wt3', name: 'promotional_offer', category: 'Marketing', status: 'Approved', language: 'English',
    body: 'Hi {{1}}, exciting offer at Arna Clinic! Get {{2}}% off on {{3}} this month. Limited slots available. Book now by replying BOOK or call us at +91 40 1234 5678. T&C apply.',
    lastUsed: '10 Mar 2026', usageCount: 520,
  },
  {
    id: 'wt4', name: 'prescription_share', category: 'Utility', status: 'Approved', language: 'English',
    body: 'Hi {{1}}, here is your prescription from Dr. {{2}} dated {{3}}. Please follow the medication schedule as prescribed. Your next follow-up is on {{4}}.',
    lastUsed: '11 Mar 2026', usageCount: 156,
  },
  {
    id: 'wt5', name: 'loyalty_points_update', category: 'Marketing', status: 'Pending', language: 'English',
    body: 'Hi {{1}}, you have earned {{2}} loyalty points at Arna Clinic! Your total balance is {{3}} points. Redeem them on your next visit for exclusive discounts.',
    lastUsed: 'Never', usageCount: 0,
  },
  {
    id: 'wt6', name: 'feedback_request', category: 'Utility', status: 'Rejected', language: 'English',
    body: 'Hi {{1}}, thank you for visiting Arna Clinic. We would love your feedback! Please rate your experience: {{2}}. Your feedback helps us improve.',
    lastUsed: 'Never', usageCount: 0,
  },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  'Approved': { bg: '#D1FAE5', text: '#065F46' },
  'Pending': { bg: '#FEF3C7', text: '#92400E' },
  'Rejected': { bg: '#FEE2E2', text: '#991B1B' },
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Marketing': { bg: '#EDE9FE', text: '#6D28D9' },
  'Utility': { bg: '#DBEAFE', text: '#1D4ED8' },
  'Authentication': { bg: '#FEF3C7', text: '#92400E' },
}

export default function WATemplates() {
  const { showToast } = useToast()
  const [previewTemplate, setPreviewTemplate] = useState<WATemplate | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => showToast('Template copied to clipboard'))
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>WhatsApp Templates</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage WhatsApp Business message templates</p>
        </div>
        <button onClick={() => showToast('Template creation coming soon', 'info')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          <Plus size={15} /> New Template
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280' }}>Total Templates</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>{templates.length}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280' }}>Approved</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#065F46' }}>{templates.filter(t => t.status === 'Approved').length}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280' }}>Pending</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#92400E' }}>{templates.filter(t => t.status === 'Pending').length}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280' }}>Total Usage</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>{templates.reduce((s, t) => s + t.usageCount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Template list */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Template Name', 'Category', 'Status', 'Language', 'Usage', 'Last Used', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templates.map(tmpl => (
              <tr key={tmpl.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#111', fontFamily: 'monospace' }}>{tmpl.name}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: categoryColors[tmpl.category]?.bg, color: categoryColors[tmpl.category]?.text }}>{tmpl.category}</span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[tmpl.status]?.bg, color: statusColors[tmpl.status]?.text }}>{tmpl.status}</span>
                </td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{tmpl.language}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{tmpl.usageCount.toLocaleString()}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#6B7280' }}>{tmpl.lastUsed}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setPreviewTemplate(tmpl)} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '5px 8px', border: '1px solid #E5E7EB', borderRadius: '5px', background: 'white', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                      <Eye size={12} />
                    </button>
                    <button onClick={() => copyToClipboard(tmpl.body)} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '5px 8px', border: '1px solid #E5E7EB', borderRadius: '5px', background: 'white', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                      <Copy size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setPreviewTemplate(null)}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', width: '480px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>Template Preview</h3>
              <button onClick={() => setPreviewTemplate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#6B7280" /></button>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600', color: '#111' }}>{previewTemplate.name}</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: categoryColors[previewTemplate.category]?.bg, color: categoryColors[previewTemplate.category]?.text }}>{previewTemplate.category}</span>
                <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[previewTemplate.status]?.bg, color: statusColors[previewTemplate.status]?.text }}>{previewTemplate.status}</span>
              </div>
            </div>
            {/* WhatsApp-style preview */}
            <div style={{ background: '#E5DDD5', borderRadius: '10px', padding: '16px' }}>
              <div style={{ background: 'white', borderRadius: '8px', padding: '12px 14px', maxWidth: '85%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#111', lineHeight: '1.6' }}>{previewTemplate.body}</p>
                <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#6B7280', textAlign: 'right' }}>12:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
