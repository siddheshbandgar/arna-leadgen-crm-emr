import { useState } from 'react'
import { MessageCircle, Instagram, Globe, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'
import { useToast } from '../components/ui/Toast'

const channels = [
  {
    id: 'ch1',
    name: 'WhatsApp Business',
    description: 'Primary patient communication channel. Connected to WhatsApp Business API via Gupshup.',
    status: true,
    icon: MessageCircle,
    color: '#25D366',
    stats: { messagesThisMonth: 1240, responseRate: '98%', avgResponseTime: '2 min' },
    provider: 'Gupshup',
    phone: '+91 40 1234 5678',
  },
  {
    id: 'ch2',
    name: 'Instagram DMs',
    description: 'Automated responses to Instagram direct messages and story replies. Connected via Meta API.',
    status: true,
    icon: Instagram,
    color: '#E1306C',
    stats: { messagesThisMonth: 340, responseRate: '94%', avgResponseTime: '5 min' },
    provider: 'Meta API',
    phone: '@arnaclinic.hyd',
  },
  {
    id: 'ch3',
    name: 'Website Chat',
    description: 'Live chat widget on arnaclinic.in. AI agent handles initial queries, escalates to staff when needed.',
    status: false,
    icon: Globe,
    color: '#3B82F6',
    stats: { messagesThisMonth: 89, responseRate: '87%', avgResponseTime: '8 min' },
    provider: 'Custom Widget',
    phone: 'arnaclinic.in',
  },
]

export default function Channels() {
  const { showToast } = useToast()
  const [channelStatus, setChannelStatus] = useState<Record<string, boolean>>(
    Object.fromEntries(channels.map(c => [c.id, c.status]))
  )

  const toggleChannel = (id: string) => {
    setChannelStatus(prev => ({ ...prev, [id]: !prev[id] }))
    showToast(`Channel ${channelStatus[id] ? 'disabled' : 'enabled'}`)
  }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Channels</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage communication channels and integrations</p>
      </div>

      {/* Summary */}
      <div className="rg-3" style={{ marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Total Messages This Month</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111' }}>1,669</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Active Channels</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#10B981' }}>{Object.values(channelStatus).filter(Boolean).length}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Overall Response Rate</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111' }}>95%</p>
        </div>
      </div>

      {/* Channel cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {channels.map(channel => {
          const Icon = channel.icon
          const isActive = channelStatus[channel.id]
          return (
            <div key={channel.id} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '14px', flex: 1 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: channel.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={24} color={channel.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>{channel.name}</h3>
                      <span style={{
                        padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '500',
                        background: isActive ? '#D1FAE5' : '#F3F4F6',
                        color: isActive ? '#065F46' : '#6B7280',
                      }}>
                        {isActive ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>{channel.description}</p>

                    <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Messages/Month</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111' }}>{channel.stats.messagesThisMonth.toLocaleString()}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Response Rate</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#10B981' }}>{channel.stats.responseRate}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Avg Response</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111' }}>{channel.stats.avgResponseTime}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6B7280' }}>
                      <span>Provider: <strong style={{ color: '#111' }}>{channel.provider}</strong></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {channel.phone} <ExternalLink size={11} />
                      </span>
                    </div>
                  </div>
                </div>

                <button onClick={() => toggleChannel(channel.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginLeft: '16px' }}>
                  {isActive
                    ? <ToggleRight size={32} color="#10B981" />
                    : <ToggleLeft size={32} color="#9CA3AF" />
                  }
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
