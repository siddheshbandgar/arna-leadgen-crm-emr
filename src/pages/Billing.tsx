import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { billingRecords } from '../data/billing'
import { patients } from '../data/patients'
import { useToast } from '../components/ui/Toast'

const tabs = ['All', 'Consultations', 'Services', 'Medicines']

export default function Billing() {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // New bill state
  const [billPatient, setBillPatient] = useState('')
  const [billType, setBillType] = useState<'Consultation' | 'Service' | 'Medicine'>('Consultation')
  const [billDescription, setBillDescription] = useState('')
  const [billAmount, setBillAmount] = useState('')
  const [billPoints, setBillPoints] = useState('')
  const [billPayment, setBillPayment] = useState<'Cash' | 'UPI' | 'Card'>('UPI')

  const selectedPatientData = patients.find(p => p.id === billPatient)
  const maxPoints = selectedPatientData?.loyaltyPoints || 0
  const amountNum = parseFloat(billAmount) || 0
  const pointsNum = Math.min(parseInt(billPoints) || 0, maxPoints, amountNum)
  const netAmount = Math.max(0, amountNum - pointsNum)

  const totalRevenue = billingRecords.reduce((s, b) => s + b.netAmount, 0)
  const totalConsultations = billingRecords.filter(b => b.type === 'Consultation').reduce((s, b) => s + b.netAmount, 0)
  const totalServices = billingRecords.filter(b => b.type === 'Service').reduce((s, b) => s + b.netAmount, 0)
  const totalMedicines = billingRecords.filter(b => b.type === 'Medicine').reduce((s, b) => s + b.netAmount, 0)

  const filteredRecords = activeTab === 0
    ? billingRecords
    : billingRecords.filter(b => {
        if (activeTab === 1) return b.type === 'Consultation'
        if (activeTab === 2) return b.type === 'Service'
        return b.type === 'Medicine'
      })

  const handleSaveBill = () => {
    if (!billPatient || !billAmount) {
      showToast('Please fill in patient and amount', 'error')
      return
    }
    showToast(`Bill created: Rs.${netAmount.toLocaleString()} for ${selectedPatientData?.name}`)
    setShowModal(false)
    setBillPatient('')
    setBillDescription('')
    setBillAmount('')
    setBillPoints('')
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }

  return (
    <div className="page-wrap" style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Billing</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage invoices, payments, and loyalty points</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          <Plus size={15} /> New Bill
        </button>
      </div>

      {/* Summary cards */}
      <div className="rg-4" style={{ marginBottom: '20px' }}>
        {[
          { label: 'Total Revenue', value: totalRevenue, color: '#111' },
          { label: 'Consultations', value: totalConsultations, color: '#1D4ED8' },
          { label: 'Services', value: totalServices, color: '#6D28D9' },
          { label: 'Medicines', value: totalMedicines, color: '#065F46' },
        ].map(card => (
          <div key={card.label} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{card.label}</p>
            <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: card.color }}>Rs.{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid #E5E7EB', marginBottom: '16px' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 20px', fontSize: '14px', fontWeight: '500', border: 'none', cursor: 'pointer', background: 'none',
              color: activeTab === i ? '#111' : '#6B7280',
              borderBottom: activeTab === i ? '2px solid #111' : '2px solid transparent',
              marginBottom: '-2px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Date', 'Patient', 'Type', 'Description', 'Amount', 'Points Used', 'Net Amount', 'Payment', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{record.date}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{record.patient}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: '4px', fontSize: '12px',
                    background: record.type === 'Service' ? '#EDE9FE' : record.type === 'Medicine' ? '#D1FAE5' : '#DBEAFE',
                    color: record.type === 'Service' ? '#6D28D9' : record.type === 'Medicine' ? '#065F46' : '#1D4ED8',
                  }}>{record.type}</span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{record.description}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '500', color: '#111' }}>Rs.{record.amount.toLocaleString()}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: record.pointsUsed > 0 ? '#F59E0B' : '#9CA3AF' }}>{record.pointsUsed > 0 ? `-${record.pointsUsed}` : '0'}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600', color: '#111' }}>Rs.{record.netAmount.toLocaleString()}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{record.paymentMethod}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: record.status === 'Paid' ? '#D1FAE5' : '#FEF3C7', color: record.status === 'Paid' ? '#065F46' : '#92400E' }}>{record.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Bill Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', width: '500px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111' }}>New Bill</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#6B7280" /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Patient *</label>
                <select value={billPatient} onChange={e => { setBillPatient(e.target.value); setBillPoints('') }} style={inputStyle}>
                  <option value="">Select patient</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.loyaltyPoints.toLocaleString()} pts)</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Type</label>
                  <select value={billType} onChange={e => setBillType(e.target.value as typeof billType)} style={inputStyle}>
                    <option>Consultation</option>
                    <option>Service</option>
                    <option>Medicine</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Payment Method</label>
                  <select value={billPayment} onChange={e => setBillPayment(e.target.value as typeof billPayment)} style={inputStyle}>
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Description</label>
                <input style={inputStyle} value={billDescription} onChange={e => setBillDescription(e.target.value)} placeholder="Service description" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Amount (Rs.) *</label>
                <input style={inputStyle} type="number" value={billAmount} onChange={e => setBillAmount(e.target.value)} placeholder="0" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Loyalty Points to Redeem {selectedPatientData && <span style={{ color: '#6B7280' }}>(Max: {maxPoints.toLocaleString()})</span>}
                </label>
                <input
                  style={inputStyle}
                  type="number"
                  value={billPoints}
                  onChange={e => {
                    const val = parseInt(e.target.value) || 0
                    setBillPoints(Math.min(val, maxPoints, amountNum).toString())
                  }}
                  placeholder="0"
                  max={Math.min(maxPoints, amountNum)}
                  disabled={!billPatient}
                />
              </div>

              {/* Dynamic calculation */}
              <div style={{ padding: '14px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#6B7280' }}>Amount</span>
                  <span style={{ color: '#111', fontWeight: '500' }}>Rs.{amountNum.toLocaleString()}</span>
                </div>
                {pointsNum > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                    <span style={{ color: '#F59E0B' }}>Points Redeemed</span>
                    <span style={{ color: '#F59E0B', fontWeight: '500' }}>- Rs.{pointsNum.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #E5E7EB', fontSize: '15px' }}>
                  <span style={{ fontWeight: '600', color: '#111' }}>Net Amount</span>
                  <span style={{ fontWeight: '700', color: '#111' }}>Rs.{netAmount.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: 'white', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSaveBill} style={{ padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Create Bill</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
