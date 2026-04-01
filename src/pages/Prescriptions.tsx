import { useState } from 'react'
import { Search, Plus, X, Eye, Send, Trash2 } from 'lucide-react'
import { patients } from '../data/patients'
import { useToast } from '../components/ui/Toast'

interface MedicineRow {
  name: string; dosage: string; frequency: string; duration: string
}

export default function Prescriptions() {
  const { showToast } = useToast()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [viewRx, setViewRx] = useState<{ patientName: string; rx: typeof patients[0]['prescriptions'][0] } | null>(null)

  // New prescription state
  const [selectedPatient, setSelectedPatient] = useState('')
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ name: '', dosage: '', frequency: '', duration: '' }])

  const allPrescriptions = patients.flatMap(p =>
    p.prescriptions.map(rx => ({ ...rx, patientName: p.name, patientId: p.id }))
  ).sort((a, b) => b.date.localeCompare(a.date))

  const filtered = allPrescriptions.filter(rx =>
    rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
    rx.id.toLowerCase().includes(search.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(search.toLowerCase())
  )

  const addMedicineRow = () => setMedicines(prev => [...prev, { name: '', dosage: '', frequency: '', duration: '' }])
  const removeMedicineRow = (i: number) => setMedicines(prev => prev.filter((_, idx) => idx !== i))
  const updateMedicine = (i: number, field: keyof MedicineRow, value: string) => {
    setMedicines(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m))
  }

  const handleSavePrescription = () => {
    if (!selectedPatient) { showToast('Please select a patient', 'error'); return }
    if (!medicines[0].name) { showToast('Please add at least one medicine', 'error'); return }
    showToast('Prescription saved successfully!')
    setShowModal(false)
    setSelectedPatient('')
    setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }])
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Prescriptions</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>{allPrescriptions.length} prescriptions across all patients</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          <Plus size={15} /> New Prescription
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '16px', maxWidth: '340px' }}>
        <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search prescriptions..." style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none' }} />
      </div>

      <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Rx ID', 'Date', 'Patient', 'Doctor', 'Medicines', 'Sent via WA', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(rx => (
              <tr key={rx.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', color: '#111' }}>{rx.id.toUpperCase()}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{rx.date}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{rx.patientName}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{rx.doctor}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{rx.medicines.length} items</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: rx.sentViaWA ? '#D1FAE5' : '#F3F4F6', color: rx.sentViaWA ? '#065F46' : '#6B7280' }}>
                    {rx.sentViaWA ? 'Sent' : 'Not sent'}
                  </span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setViewRx({ patientName: rx.patientName, rx })} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', border: '1px solid #E5E7EB', borderRadius: '5px', background: 'white', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                      <Eye size={12} /> View
                    </button>
                    <button onClick={() => showToast('Prescription resent via WhatsApp')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: '#111', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>
                      <Send size={12} /> Resend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Prescription Modal */}
      {viewRx && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewRx(null)}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', width: '600px', maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>Prescription #{viewRx.rx.id.toUpperCase()}</h3>
              <button onClick={() => setViewRx(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#6B7280" /></button>
            </div>

            {/* Prescription card */}
            <div style={{ border: '2px solid #111', borderRadius: '10px', padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
                <h4 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '700', color: '#111' }}>Arna Clinic - Skin & Hair</h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>Banjara Hills, Hyderabad | +91 40 1234 5678</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
                <div>
                  <p style={{ margin: '0 0 2px', color: '#6B7280' }}>Patient</p>
                  <p style={{ margin: 0, fontWeight: '600', color: '#111' }}>{viewRx.patientName}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 2px', color: '#6B7280' }}>Date</p>
                  <p style={{ margin: 0, fontWeight: '600', color: '#111' }}>{viewRx.rx.date}</p>
                </div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6B7280' }}>Prescribing Doctor</p>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111' }}>{viewRx.rx.doctor}</p>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#111', margin: '16px 0 8px' }}>Rx</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    {['#', 'Medicine', 'Dosage', 'Frequency', 'Duration'].map(h => (
                      <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {viewRx.rx.medicines.map((med, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '8px', fontSize: '13px', color: '#6B7280' }}>{i + 1}</td>
                      <td style={{ padding: '8px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{med.name}</td>
                      <td style={{ padding: '8px', fontSize: '13px', color: '#374151' }}>{med.dosage}</td>
                      <td style={{ padding: '8px', fontSize: '13px', color: '#374151' }}>{med.frequency}</td>
                      <td style={{ padding: '8px', fontSize: '13px', color: '#374151' }}>{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #E5E7EB', textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111' }}>{viewRx.rx.doctor}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>MBBS, MD Dermatology</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Prescription Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', width: '700px', maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>New Prescription</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#6B7280" /></button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Patient *</label>
              <select value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} style={inputStyle}>
                <option value="">Select patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Medicines</label>
                <button onClick={addMedicineRow} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#F3F4F6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                  <Plus size={12} /> Add Medicine
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 32px', gap: '6px', marginBottom: '6px' }}>
                {['Medicine Name', 'Dosage', 'Frequency', 'Duration', ''].map(h => (
                  <span key={h} style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>{h}</span>
                ))}
              </div>

              {medicines.map((med, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 32px', gap: '6px', marginBottom: '6px' }}>
                  <input style={inputStyle} value={med.name} onChange={e => updateMedicine(i, 'name', e.target.value)} placeholder="e.g. Tretinoin 0.025%" />
                  <input style={inputStyle} value={med.dosage} onChange={e => updateMedicine(i, 'dosage', e.target.value)} placeholder="e.g. Pea-sized" />
                  <input style={inputStyle} value={med.frequency} onChange={e => updateMedicine(i, 'frequency', e.target.value)} placeholder="e.g. Once daily" />
                  <input style={inputStyle} value={med.duration} onChange={e => updateMedicine(i, 'duration', e.target.value)} placeholder="e.g. 8 weeks" />
                  {medicines.length > 1 && (
                    <button onClick={() => removeMedicineRow(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={14} color="#EF4444" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: 'white', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSavePrescription} style={{ padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Save Prescription</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
