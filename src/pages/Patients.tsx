import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Award } from 'lucide-react'
import { patients } from '../data/patients'
import TagBadge from '../components/ui/TagBadge'

const allTreatments = ['Laser', 'Botox', 'Chemical Peel', 'Acne', 'Hair PRP', 'Fillers']

export default function Patients() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (treatment: string) => {
    setActiveFilters(prev =>
      prev.includes(treatment) ? prev.filter(f => f !== treatment) : [...prev, treatment]
    )
  }

  const filtered = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      activeFilters.length === 0 || activeFilters.some(f => p.treatments.includes(f))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="page-wrap" style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Patients</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>{patients.length} registered patients</p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patients..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {allTreatments.map(t => (
            <TagBadge key={t} label={t} active={activeFilters.includes(t)} onClick={() => toggleFilter(t)} />
          ))}
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            style={{ padding: '4px 10px', fontSize: '12px', color: '#6B7280', background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Name', 'Phone', 'Last Visit', 'Treatments', 'Loyalty Points', 'Next Appointment'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(patient => (
              <tr
                key={patient.id}
                onClick={() => navigate(`/patients/${patient.id}`)}
                style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white' }}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', color: 'white', flexShrink: 0 }}>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>{patient.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{patient.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{patient.phone}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{patient.lastVisit}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {patient.treatments.map(t => <TagBadge key={t} label={t} />)}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={14} style={{ color: '#F59E0B' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{patient.loyaltyPoints.toLocaleString()}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: patient.nextAppointment ? '#111' : '#9CA3AF' }}>
                  {patient.nextAppointment || 'Not scheduled'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
            No patients found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
