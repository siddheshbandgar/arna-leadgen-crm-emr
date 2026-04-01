import { useState } from 'react'
import { ChevronLeft, ChevronRight, List, CalendarDays, X } from 'lucide-react'
import { appointments } from '../data/appointments'
import type { Appointment } from '../data/appointments'

const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30']
const timeLabels: Record<string, string> = { '17:00': '5:00 PM', '17:30': '5:30 PM', '18:00': '6:00 PM', '18:30': '6:30 PM', '19:00': '7:00 PM', '19:30': '7:30 PM' }

const statusColors: Record<string, { bg: string; text: string }> = {
  'Confirmed': { bg: '#D1FAE5', text: '#065F46' },
  'Pending': { bg: '#FEF3C7', text: '#92400E' },
  'Cancelled': { bg: '#FEE2E2', text: '#991B1B' },
  'Completed': { bg: '#F3F4F6', text: '#374151' },
}

function getWeekDates(baseDate: Date): { date: string; label: string; dayName: string; iso: string }[] {
  const day = baseDate.getDay()
  const monday = new Date(baseDate)
  monday.setDate(baseDate.getDate() - (day === 0 ? 6 : day - 1))
  const days = []
  for (let i = 0; i < 6; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push({
      date: d.toISOString().split('T')[0],
      label: d.getDate().toString(),
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      iso: d.toISOString().split('T')[0],
    })
  }
  return days
}

export default function Appointments() {
  const [view, setView] = useState<'calendar' | 'list'>(() =>
    window.innerWidth < 768 ? 'list' : 'calendar'
  )
  const [baseDate, setBaseDate] = useState(new Date(2026, 2, 13))
  const [selected, setSelected] = useState<Appointment | null>(null)

  const weekDates = getWeekDates(baseDate)
  const weekStart = weekDates[0].dayName + ' ' + weekDates[0].label
  const weekEnd = weekDates[5].dayName + ' ' + weekDates[5].label

  const goToday = () => setBaseDate(new Date(2026, 2, 13))
  const goPrev = () => { const d = new Date(baseDate); d.setDate(d.getDate() - 7); setBaseDate(d) }
  const goNext = () => { const d = new Date(baseDate); d.setDate(d.getDate() + 7); setBaseDate(d) }

  const todayIso = '2026-03-13'

  const renderCalendar = () => (
    <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr>
            <th style={{ width: '80px', padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', background: '#F9FAFB' }}>Time</th>
            {weekDates.map(day => (
              <th key={day.iso} style={{
                padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: '600', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB',
                background: day.iso === todayIso ? '#111' : '#F9FAFB',
                color: day.iso === todayIso ? 'white' : '#6B7280',
              }}>
                <div>{day.dayName}</div>
                <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '2px' }}>{day.label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px', color: '#6B7280', borderRight: '1px solid #E5E7EB', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA', fontWeight: '500' }}>{timeLabels[slot]}</td>
              {weekDates.map(day => {
                const appt = appointments.find(a => a.date === day.iso && a.time === slot)
                return (
                  <td key={day.iso + slot} style={{ padding: '4px', borderRight: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', verticalAlign: 'top', height: '60px' }}>
                    {appt && (
                      <div
                        onClick={() => setSelected(appt)}
                        style={{
                          padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px',
                          background: appt.treatmentColor + '18',
                          borderLeft: `3px solid ${appt.treatmentColor}`,
                          height: '100%',
                        }}
                      >
                        <div style={{ fontWeight: '600', color: '#111', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.patient}</div>
                        <div style={{ color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.treatment}</div>
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderList = () => (
    <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
            {['Date', 'Time', 'Patient', 'Treatment', 'Doctor', 'Status'].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(a => weekDates.some(d => d.iso === a.date))
            .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
            .map(appt => (
            <tr key={appt.id}
              onClick={() => setSelected(appt)}
              style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
            >
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{appt.date}</td>
              <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#111' }}>{timeLabels[appt.time] || appt.time}</td>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: 'white' }}>
                    {appt.patient.charAt(0)}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#111' }}>{appt.patient}</span>
                </div>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: appt.treatmentColor + '20', color: appt.treatmentColor, fontWeight: '500' }}>{appt.treatment}</span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{appt.doctor}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[appt.status]?.bg, color: statusColors[appt.status]?.text }}>{appt.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="page-wrap" style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Appointments</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Week of {weekStart} - {weekEnd}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '7px', overflow: 'hidden' }}>
            <button onClick={() => setView('calendar')} style={{ padding: '7px 12px', background: view === 'calendar' ? '#111' : 'white', color: view === 'calendar' ? 'white' : '#374151', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
              <CalendarDays size={14} /> Calendar
            </button>
            <button onClick={() => setView('list')} style={{ padding: '7px 12px', background: view === 'list' ? '#111' : 'white', color: view === 'list' ? 'white' : '#374151', border: 'none', borderLeft: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
              <List size={14} /> List
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button onClick={goPrev} style={{ padding: '6px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
          <ChevronLeft size={16} />
        </button>
        <button onClick={goToday} style={{ padding: '6px 14px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Today</button>
        <button onClick={goNext} style={{ padding: '6px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {view === 'calendar' ? renderCalendar() : renderList()}

      {/* Detail popup */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '400px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>Appointment Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#6B7280" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '600', color: 'white' }}>{selected.patient.charAt(0)}</div>
                <div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111' }}>{selected.patient}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{selected.phone}</p>
                </div>
              </div>
              <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Date</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#111', fontWeight: '500' }}>{selected.date}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Time</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#111', fontWeight: '500' }}>{timeLabels[selected.time] || selected.time}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Treatment</p>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: selected.treatmentColor + '20', color: selected.treatmentColor, fontWeight: '500' }}>{selected.treatment}</span>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Status</p>
                    <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: statusColors[selected.status]?.bg, color: statusColors[selected.status]?.text }}>{selected.status}</span>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Doctor</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#111' }}>{selected.doctor}</p>
                </div>
                {selected.notes && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Notes</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#374151' }}>{selected.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
