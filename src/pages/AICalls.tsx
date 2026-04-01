import { useState, useEffect, useRef } from 'react'
import {
  PhoneOff, Phone, PhoneMissed, Clock, CheckCircle2,
  ChevronDown, ChevronUp, Play, X, Mic, MicOff, Volume2,
  TrendingUp, Users, BarChart2, Zap, Plus, Radio
} from 'lucide-react'
import {
  callRecords, callCampaigns, demoCallScript,
  purposeLabels, purposeColors,
  type CallRecord, type CallStatus, type CallPurpose
} from '../data/calls'

// ─── helpers ────────────────────────────────────────────────────────────────

function fmtDuration(s: number) {
  if (!s) return '—'
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const statusMeta: Record<CallStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  completed:   { label: 'Completed',   color: '#065F46', bg: '#D1FAE5', icon: CheckCircle2 },
  'no-answer': { label: 'No Answer',   color: '#92400E', bg: '#FEF3C7', icon: PhoneMissed },
  'in-progress':{ label: 'Live',       color: '#1D4ED8', bg: '#DBEAFE', icon: Radio },
  scheduled:   { label: 'Scheduled',   color: '#6B7280', bg: '#F3F4F6', icon: Clock },
  failed:      { label: 'Failed',      color: '#991B1B', bg: '#FEE2E2', icon: PhoneOff },
}

// ─── sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: React.ElementType; color: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '26px', fontWeight: '700', color: '#111', lineHeight: 1 }}>{value}</p>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#10B981' }}>{sub}</p>
      </div>
    </div>
  )
}

function CampaignRow({ c }: { c: typeof callCampaigns[0] }) {
  const pct = c.completed > 0 ? Math.round((c.answered / c.completed) * 100) : 0
  const progress = Math.round((c.completed / c.totalCalls) * 100)
  const color = purposeColors[c.purpose]
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '18px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.active ? '#10B981' : '#9CA3AF', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111' }}>{c.name}</p>
            <span style={{ fontSize: '11px', fontWeight: '500', color, background: color + '15', padding: '2px 8px', borderRadius: '999px' }}>
              {purposeLabels[c.purpose]}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Answered</p>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#10B981' }}>{pct}%</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Remaining</p>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111' }}>{c.totalCalls - c.completed}</p>
          </div>
        </div>
      </div>
      {/* progress bar */}
      <div style={{ height: '5px', background: '#F3F4F6', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: '999px', transition: 'width 0.3s' }} />
      </div>
      <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#9CA3AF' }}>{c.completed} / {c.totalCalls} calls processed</p>
    </div>
  )
}

function CallRow({ record, onExpand, expanded }: { record: CallRecord; onExpand: () => void; expanded: boolean }) {
  const meta = statusMeta[record.status]
  const StatusIcon = meta.icon
  const purposeColor = purposeColors[record.purpose]
  return (
    <div style={{ borderBottom: '1px solid #F3F4F6' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', cursor: record.transcript ? 'pointer' : 'default' }}
        onClick={() => record.transcript && onExpand()}
      >
        {/* avatar */}
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: purposeColor + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: purposeColor, flexShrink: 0 }}>
          {record.avatar}
        </div>
        {/* name + purpose */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '600', color: '#111' }}>{record.patientName}</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{purposeLabels[record.purpose]}</p>
        </div>
        {/* time */}
        <div style={{ textAlign: 'right', minWidth: '60px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{fmtTime(record.scheduledAt)}</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>{fmtDuration(record.duration ?? 0)}</p>
        </div>
        {/* status badge */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '999px', background: meta.bg, color: meta.color, fontSize: '11.5px', fontWeight: '600', minWidth: '90px', justifyContent: 'center' }}>
          <StatusIcon size={11} strokeWidth={2.2} />
          {meta.label}
        </span>
        {/* expand chevron */}
        {record.transcript
          ? (expanded ? <ChevronUp size={15} color="#9CA3AF" /> : <ChevronDown size={15} color="#9CA3AF" />)
          : <div style={{ width: '15px' }} />
        }
      </div>
      {/* expanded transcript */}
      {expanded && record.transcript && (
        <div style={{ padding: '0 16px 16px 66px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {record.transcript.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '3px', minWidth: '26px', fontFamily: 'monospace' }}>{line.time}</span>
              <span style={{
                padding: '6px 12px', borderRadius: '10px', fontSize: '12.5px', lineHeight: '1.5', maxWidth: '520px',
                background: line.speaker === 'ai' ? '#EEF2FF' : '#F9FAFB',
                color: line.speaker === 'ai' ? '#3730A3' : '#374151',
                borderBottomLeftRadius: line.speaker === 'ai' ? '2px' : '10px',
                borderBottomRightRadius: line.speaker === 'patient' ? '2px' : '10px',
              }}>
                <span style={{ fontSize: '10px', fontWeight: '700', display: 'block', marginBottom: '2px', opacity: 0.6 }}>
                  {line.speaker === 'ai' ? 'Arna AI' : record.patientName.split(' ')[0]}
                </span>
                {line.text}
              </span>
            </div>
          ))}
          {record.outcome && (
            <div style={{ marginTop: '4px', padding: '8px 12px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '12px', color: '#065F46', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <CheckCircle2 size={13} />
              <span><strong>Outcome:</strong> {record.outcome}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Live Call Modal ─────────────────────────────────────────────────────────

function LiveCallModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'dialing' | 'connected' | 'ended'>('dialing')
  const [transcript, setTranscript] = useState<typeof demoCallScript>([])
  const [muted, setMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dialTimeout = setTimeout(() => {
      setPhase('connected')
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
      // schedule each transcript line
      demoCallScript.forEach(line => {
        setTimeout(() => {
          setTranscript(prev => [...prev, line])
          scrollRef.current?.scrollTo({ top: 9999, behavior: 'smooth' })
        }, line.delay)
      })
      // end call after last line + 3s
      const last = demoCallScript[demoCallScript.length - 1]
      setTimeout(() => {
        setPhase('ended')
        if (timerRef.current) clearInterval(timerRef.current)
      }, last.delay + 3000)
    }, 2500)
    return () => {
      clearTimeout(dialTimeout)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const fmtElapsed = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(3px)' }}>
      <div style={{ background: 'white', borderRadius: '16px', width: '460px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}>
        {/* header */}
        <div style={{ background: phase === 'ended' ? '#111' : 'linear-gradient(135deg,#1E3A5F,#2563EB)', padding: '28px 24px 20px', color: 'white', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', padding: '4px 8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <X size={13} /> Close
          </button>
          {/* avatar ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              {phase === 'connected' && (
                <>
                  <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', animation: 'pulse-ring 1.5s ease-out infinite' }} />
                  <div style={{ position: 'absolute', inset: '-24px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', animation: 'pulse-ring 1.5s ease-out infinite 0.5s' }} />
                </>
              )}
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700' }}>AK</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Ananya Krishnan</p>
              <p style={{ margin: '3px 0 0', fontSize: '12px', opacity: 0.75 }}>+91 98765 11110</p>
            </div>
            {/* status line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '5px 14px', fontSize: '13px', fontWeight: '600' }}>
              {phase === 'dialing' && <><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FCD34D', display: 'inline-block', animation: 'blink 1s step-end infinite' }} /> Dialing…</>}
              {phase === 'connected' && <><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }} /> {fmtElapsed(elapsed)}</>}
              {phase === 'ended' && <><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9CA3AF', display: 'inline-block' }} /> Call ended &nbsp;·&nbsp; {fmtElapsed(elapsed)}</>}
            </div>
          </div>
        </div>

        {/* transcript scroll area */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '200px', maxHeight: '320px', background: '#FAFAFA' }}>
          {transcript.length === 0 && phase === 'dialing' && (
            <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', marginTop: '40px' }}>Connecting to patient…</div>
          )}
          {transcript.map((line, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: line.speaker === 'ai' ? 'flex-start' : 'flex-end' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '3px', paddingLeft: '4px', paddingRight: '4px' }}>
                {line.speaker === 'ai' ? 'Arna AI' : 'Ananya'}
              </span>
              <div style={{
                maxWidth: '85%', padding: '8px 13px', borderRadius: '12px', fontSize: '13px', lineHeight: '1.5',
                background: line.speaker === 'ai' ? '#EEF2FF' : 'white',
                color: line.speaker === 'ai' ? '#3730A3' : '#374151',
                border: '1px solid',
                borderColor: line.speaker === 'ai' ? '#C7D2FE' : '#E5E7EB',
                borderBottomLeftRadius: line.speaker === 'ai' ? '2px' : '12px',
                borderBottomRightRadius: line.speaker === 'patient' ? '2px' : '12px',
              }}>
                {line.text}
              </div>
            </div>
          ))}
          {phase === 'ended' && (
            <div style={{ textAlign: 'center', padding: '12px', background: '#F0FDF4', borderRadius: '10px', border: '1px solid #BBF7D0', color: '#065F46', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} /> Call completed — Appointment confirmed
            </div>
          )}
        </div>

        {/* controls */}
        <div style={{ padding: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'center', gap: '16px', background: 'white' }}>
          {phase !== 'ended' ? (
            <>
              <button
                onClick={() => setMuted(m => !m)}
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #E5E7EB', background: muted ? '#FEF2F2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <MicOff size={18} color="#EF4444" /> : <Mic size={18} color="#6B7280" />}
              </button>
              <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={18} color="#6B7280" />
              </button>
              <button
                onClick={onClose}
                style={{ width: '56px', height: '56px', borderRadius: '50%', border: 'none', background: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="End call"
              >
                <PhoneOff size={22} color="white" />
              </button>
            </>
          ) : (
            <button onClick={onClose} style={{ padding: '10px 28px', borderRadius: '8px', border: 'none', background: '#111', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Close
            </button>
          )}
        </div>
      </div>

      {/* keyframe styles injected inline */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── New Campaign Modal ──────────────────────────────────────────────────────

const purposeOptions: { value: CallPurpose; label: string }[] = [
  { value: 'appointment-reminder', label: 'Appointment Reminder' },
  { value: 'post-treatment', label: 'Post-Treatment Follow-up' },
  { value: 'lead-followup', label: 'Lead Follow-up' },
  { value: 'prescription', label: 'Prescription Ready' },
  { value: 'payment-reminder', label: 'Payment Reminder' },
]

function NewCampaignModal({ onClose, onSave }: { onClose: () => void; onSave: (name: string, purpose: CallPurpose) => void }) {
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState<CallPurpose>('appointment-reminder')
  const [audience, setAudience] = useState('all')

  const audienceOptions = [
    { value: 'all', label: 'All Patients (86)' },
    { value: 'upcoming', label: 'Upcoming Appointments (23)' },
    { value: 'leads', label: 'New Leads (14)' },
    { value: 'overdue', label: 'Overdue Payments (6)' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: '14px', width: '440px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#111' }}>New Call Campaign</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Campaign Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. April Appointment Reminders"
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Call Purpose</label>
            <select
              value={purpose}
              onChange={e => setPurpose(e.target.value as CallPurpose)}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: 'white' }}
            >
              {purposeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Audience</label>
            <select
              value={audience}
              onChange={e => setAudience(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: 'white' }}
            >
              {audienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '12px', border: '1px solid #E5E7EB', fontSize: '12.5px', color: '#6B7280', lineHeight: '1.5' }}>
            <strong style={{ color: '#111' }}>AI will automatically:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <li>Call each patient in the selected audience</li>
              <li>Handle rescheduling and confirmations</li>
              <li>Send WhatsApp follow-up if call is missed</li>
              <li>Log full transcript and outcome</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', border: '1px solid #D1D5DB', borderRadius: '8px', background: 'white', fontSize: '13.5px', cursor: 'pointer', color: '#374151' }}>Cancel</button>
          <button
            onClick={() => { if (name.trim()) onSave(name.trim(), purpose) }}
            disabled={!name.trim()}
            style={{ padding: '9px 20px', border: 'none', borderRadius: '8px', background: name.trim() ? '#111' : '#D1D5DB', color: 'white', fontSize: '13.5px', fontWeight: '600', cursor: name.trim() ? 'pointer' : 'default' }}
          >
            Launch Campaign
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const STATUS_FILTERS: { value: CallStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'no-answer', label: 'No Answer' },
  { value: 'scheduled', label: 'Scheduled' },
]

export default function AICalls() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showLiveDemo, setShowLiveDemo] = useState(false)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [statusFilter, setStatusFilter] = useState<CallStatus | 'all'>('all')
  const [campaigns, setCampaigns] = useState(callCampaigns)

  const filtered = statusFilter === 'all' ? callRecords : callRecords.filter(r => r.status === statusFilter)

  const completedToday = callRecords.filter(r => r.status === 'completed').length
  const answeredPct = Math.round((callRecords.filter(r => r.status === 'completed').length / callRecords.filter(r => r.status !== 'scheduled').length) * 100)
  const avgDuration = Math.round(callRecords.filter(r => r.duration).reduce((a, r) => a + (r.duration ?? 0), 0) / callRecords.filter(r => r.duration).length)

  function handleSaveCampaign(name: string, purpose: CallPurpose) {
    setCampaigns(prev => [{
      id: 'cc' + Date.now(),
      name,
      purpose,
      totalCalls: 0,
      completed: 0,
      answered: 0,
      scheduled: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      active: true,
    }, ...prev])
    setShowNewCampaign(false)
  }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>AI Voice Calls</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Automated outbound calls handled by the Arna AI voice agent</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowLiveDemo(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', border: '1.5px solid #3B82F6', borderRadius: '8px', background: '#EFF6FF', color: '#1D4ED8', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}
          >
            <Play size={14} fill="#1D4ED8" /> Demo Live Call
          </button>
          <button
            onClick={() => setShowNewCampaign(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', border: 'none', borderRadius: '8px', background: '#111', color: 'white', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}
          >
            <Plus size={15} /> New Campaign
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="rg-4" style={{ marginBottom: '24px' }}>
        <StatCard label="Calls Today" value={String(callRecords.length)} sub="+3 vs yesterday" icon={Phone} color="#3B82F6" />
        <StatCard label="Completed" value={String(completedToday)} sub={`${answeredPct}% answer rate`} icon={CheckCircle2} color="#10B981" />
        <StatCard label="Avg Duration" value={fmtDuration(avgDuration)} sub="Per answered call" icon={Clock} color="#8B5CF6" />
        <StatCard label="Booked via Call" value="3" sub="Appointments today" icon={TrendingUp} color="#F59E0B" />
      </div>

      <div className="rg-2" style={{ marginBottom: '24px' }}>
        {/* campaigns */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111' }}>Call Campaigns</h2>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{campaigns.filter(c => c.active).length} active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {campaigns.map(c => <CampaignRow key={c.id} c={c} />)}
          </div>
        </div>

        {/* quick stats panel */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: '#111' }}>Today's Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Appointments Confirmed', value: '5', icon: CheckCircle2, color: '#10B981' },
              { label: 'Rescheduled via AI', value: '1', icon: Clock, color: '#3B82F6' },
              { label: 'Leads Converted to Consult', value: '1', icon: Users, color: '#8B5CF6' },
              { label: 'Payments Collected (₹)', value: '4,500', icon: BarChart2, color: '#F59E0B' },
              { label: 'Avg AI Confidence Score', value: '97%', icon: Zap, color: '#06B6D4' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: item.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} color={item.color} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#374151' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>{item.value}</span>
                </div>
              )
            })}
          </div>

          {/* AI voice agent info */}
          <div style={{ marginTop: '20px', padding: '12px', background: '#F8FAFF', borderRadius: '8px', border: '1px solid #DBEAFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#1D4ED8' }}>Arna Voice Agent · Active</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', lineHeight: '1.5' }}>
              Powered by conversational AI. Handles natural dialogue, rescheduling, FAQs, and payment follow-ups with zero hold time.
            </p>
          </div>
        </div>
      </div>

      {/* call log */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111' }}>Call Log — Today</h2>
          <div style={{ display: 'flex', gap: '6px' }}>
            {STATUS_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                style={{
                  padding: '5px 12px', borderRadius: '999px', border: '1px solid', fontSize: '12px', fontWeight: '500', cursor: 'pointer',
                  borderColor: statusFilter === f.value ? '#111' : '#E5E7EB',
                  background: statusFilter === f.value ? '#111' : 'white',
                  color: statusFilter === f.value ? 'white' : '#6B7280',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>No calls match this filter.</div>
        ) : (
          filtered.map(record => (
            <CallRow
              key={record.id}
              record={record}
              expanded={expandedId === record.id}
              onExpand={() => setExpandedId(expandedId === record.id ? null : record.id)}
            />
          ))
        )}
      </div>

      {showLiveDemo && <LiveCallModal onClose={() => setShowLiveDemo(false)} />}
      {showNewCampaign && <NewCampaignModal onClose={() => setShowNewCampaign(false)} onSave={handleSaveCampaign} />}
    </div>
  )
}
