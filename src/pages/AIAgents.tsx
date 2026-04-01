import { useState } from 'react'
import { Bot, MessageCircle, Phone, Zap, ToggleLeft, ToggleRight } from 'lucide-react'

const agents = [
  {
    id: 'ag1',
    name: 'Lead Qualifier',
    description: 'Automatically qualifies incoming leads from Instagram, Facebook, and Google ads. Asks about treatment interest, budget, and availability.',
    status: true,
    conversations: 156,
    conversionRate: 34,
    icon: MessageCircle,
    color: '#3B82F6',
  },
  {
    id: 'ag2',
    name: 'Appointment Reminder',
    description: 'Sends personalized appointment reminders 24h and 1h before scheduled visits. Handles rescheduling requests automatically.',
    status: true,
    conversations: 342,
    conversionRate: 92,
    icon: Phone,
    color: '#10B981',
  },
  {
    id: 'ag3',
    name: 'Post-Treatment Follow-up',
    description: 'Follows up with patients 48 hours after treatment. Collects feedback, addresses concerns, and promotes related services.',
    status: false,
    conversations: 89,
    conversionRate: 67,
    icon: Zap,
    color: '#8B5CF6',
  },
  {
    id: 'ag4',
    name: 'FAQ Bot',
    description: 'Handles common questions about pricing, procedures, timings, and location. Escalates complex queries to staff.',
    status: true,
    conversations: 523,
    conversionRate: 78,
    icon: Bot,
    color: '#F59E0B',
  },
]

export default function AIAgents() {
  const [agentStatus, setAgentStatus] = useState<Record<string, boolean>>(
    Object.fromEntries(agents.map(a => [a.id, a.status]))
  )

  const toggleAgent = (id: string) => {
    setAgentStatus(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>AI Agents</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage AI-powered conversational agents for patient engagement</p>
      </div>

      {/* Stats */}
      <div className="rg-3" style={{ marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Total Conversations</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111' }}>1,110</p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#10B981' }}>+18% this month</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Avg. Response Time</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111' }}>1.2s</p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#10B981' }}>99.8% uptime</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Human Handoff Rate</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111' }}>12%</p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6B7280' }}>88% resolved by AI</p>
        </div>
      </div>

      {/* Agent cards */}
      <div className="rg-2">
        {agents.map(agent => {
          const Icon = agent.icon
          const isActive = agentStatus[agent.id]
          return (
            <div key={agent.id} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: agent.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={agent.color} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111' }}>{agent.name}</h3>
                    <span style={{
                      padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '500',
                      background: isActive ? '#D1FAE5' : '#F3F4F6',
                      color: isActive ? '#065F46' : '#6B7280',
                    }}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <button onClick={() => toggleAgent(agent.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {isActive
                    ? <ToggleRight size={28} color="#10B981" />
                    : <ToggleLeft size={28} color="#9CA3AF" />
                  }
                </button>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>{agent.description}</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Conversations</p>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111' }}>{agent.conversations}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Success Rate</p>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#10B981' }}>{agent.conversionRate}%</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
