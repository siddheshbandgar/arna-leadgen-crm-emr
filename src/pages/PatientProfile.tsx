import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, Award, MessageCircle, Calendar, Download, Send } from 'lucide-react'
import { patients } from '../data/patients'
import TagBadge from '../components/ui/TagBadge'
import { useToast } from '../components/ui/Toast'

const tabs = ['Overview', 'Visit History', 'Prescriptions', 'Forms & Consents', 'Billing', 'Photos']

export default function PatientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState(0)

  const patient = patients.find(p => p.id === id)
  if (!patient) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2 style={{ color: '#111', marginBottom: '8px' }}>Patient not found</h2>
        <button onClick={() => navigate('/patients')} style={{ padding: '8px 16px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>Back to Patients</button>
      </div>
    )
  }

  const totalSpent = patient.bills.reduce((s, b) => s + b.amount, 0)
  const totalPointsUsed = patient.bills.reduce((s, b) => s + b.pointsUsed, 0)

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
      <span style={{ width: '160px', fontSize: '13px', color: '#6B7280', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#111', fontWeight: '500' }}>{value}</span>
    </div>
  )

  const renderOverview = () => (
    <div className="rg-2">
      {/* Personal Info */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Personal Information</h3>
        <InfoRow label="Date of Birth" value={patient.dob} />
        <InfoRow label="Gender" value={patient.gender} />
        <InfoRow label="Blood Group" value={patient.bloodGroup} />
        <InfoRow label="Address" value={patient.address} />
        <InfoRow label="Emergency Contact" value={`${patient.emergencyContact} (${patient.emergencyPhone})`} />
      </div>

      {/* Medical History */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Medical History</h3>
        <InfoRow label="Allergies" value={patient.allergies} />
        <InfoRow label="Chronic Conditions" value={patient.chronicConditions.length > 0 ? patient.chronicConditions.join(', ') : 'None'} />
        <InfoRow label="Current Medications" value={patient.medications} />
        <InfoRow label="Previous Surgeries" value={patient.previousSurgeries} />
        <InfoRow label="Skin Type" value={patient.skinType} />
      </div>

      {/* Notes */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Clinical Notes</h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.7', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>{patient.notes}</p>
      </div>

      {/* Balance Summary */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Balance Summary</h3>
        <div className="rg-3">
          <div style={{ background: '#F9FAFB', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: '600' }}>Total Spent</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111' }}>Rs.{totalSpent.toLocaleString()}</p>
          </div>
          <div style={{ background: '#F9FAFB', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: '600' }}>Loyalty Points</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#F59E0B' }}>{patient.loyaltyPoints.toLocaleString()}</p>
          </div>
          <div style={{ background: '#F9FAFB', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: '600' }}>Points Used</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111' }}>{totalPointsUsed.toLocaleString()}</p>
          </div>
        </div>

        {patient.nextAppointment && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#DBEAFE', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} style={{ color: '#1D4ED8' }} />
            <span style={{ fontSize: '13px', color: '#1D4ED8', fontWeight: '500' }}>Next Appointment: {patient.nextAppointment}</span>
          </div>
        )}
      </div>
    </div>
  )

  const renderVisitHistory = () => (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
      <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Visit History</h3>
      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', background: '#E5E7EB' }} />

        {patient.visits.map((visit, i) => (
          <div key={visit.id} style={{ position: 'relative', marginBottom: i < patient.visits.length - 1 ? '28px' : 0 }}>
            {/* Timeline dot */}
            <div style={{ position: 'absolute', left: '-24px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#111', border: '2px solid white', boxShadow: '0 0 0 2px #E5E7EB' }} />

            <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '16px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '600', color: '#111' }}>{visit.title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{visit.date} | {visit.doctor}</p>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500',
                  background: visit.billStatus === 'Paid' ? '#D1FAE5' : '#FEF3C7',
                  color: visit.billStatus === 'Paid' ? '#065F46' : '#92400E'
                }}>
                  Rs.{visit.bill.toLocaleString()} - {visit.billStatus}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 4px' }}><strong>Complaint:</strong> {visit.complaint}</p>
                <p style={{ margin: '0 0 4px' }}><strong>Treatment:</strong> {visit.treatment}</p>
                <p style={{ margin: 0 }}><strong>Notes:</strong> {visit.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {patient.visits.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '14px', padding: '20px 0' }}>No visits recorded yet.</p>
      )}
    </div>
  )

  const renderPrescriptions = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {patient.prescriptions.map(rx => (
        <div key={rx.id} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '600', color: '#111' }}>Prescription #{rx.id.toUpperCase()}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{rx.date} | {rx.doctor}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => showToast('Downloading prescription...')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                <Download size={13} /> Download
              </button>
              <button onClick={() => showToast('Sent via WhatsApp')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#111', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                <Send size={13} /> Send via WA
              </button>
            </div>
          </div>
          {rx.sentViaWA && (
            <div style={{ marginBottom: '12px', padding: '6px 10px', background: '#D1FAE5', borderRadius: '6px', fontSize: '12px', color: '#065F46', display: 'inline-block' }}>
              Sent via WhatsApp
            </div>
          )}
          <div className="tbl-wrap"><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '380px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                {['Medicine', 'Dosage', 'Frequency', 'Duration'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rx.medicines.map((med, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '500', color: '#111' }}>{med.name}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{med.dosage}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{med.frequency}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      ))}
      {patient.prescriptions.length === 0 && (
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
          No prescriptions recorded yet.
        </div>
      )}
    </div>
  )

  const renderForms = () => (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Forms & Consent Documents</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {patient.consentForms.map(form => (
          <div key={form.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>
                {form.status === 'Pending' ? '⏳' : '✅'}
              </span>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111' }}>{form.formName}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>
                  {form.date ? `${form.status} on ${form.date}` : 'Pending completion'}
                </p>
              </div>
            </div>
            <span style={{
              padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500',
              background: form.status === 'Pending' ? '#FEF3C7' : '#D1FAE5',
              color: form.status === 'Pending' ? '#92400E' : '#065F46'
            }}>
              {form.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBilling = () => (
    <div>
      {/* Summary cards */}
      <div className="rg-3" style={{ marginBottom: '16px' }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Total Spent</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Rs.{totalSpent.toLocaleString()}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Points Earned</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#F59E0B' }}>{patient.loyaltyPoints.toLocaleString()}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Points Redeemed</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>{totalPointsUsed.toLocaleString()}</p>
        </div>
      </div>

      {/* Bills table */}
      <div className="tbl-wrap" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Date', 'Type', 'Description', 'Amount', 'Points Used', 'Net Amount', 'Payment', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patient.bills.map(bill => (
              <tr key={bill.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{bill.date}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: bill.type === 'Service' ? '#EDE9FE' : bill.type === 'Medicine' ? '#D1FAE5' : '#DBEAFE', color: bill.type === 'Service' ? '#6D28D9' : bill.type === 'Medicine' ? '#065F46' : '#1D4ED8' }}>{bill.type}</span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#111' }}>{bill.description}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '500', color: '#111' }}>Rs.{bill.amount.toLocaleString()}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: bill.pointsUsed > 0 ? '#F59E0B' : '#9CA3AF' }}>{bill.pointsUsed > 0 ? `-${bill.pointsUsed}` : '0'}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600', color: '#111' }}>Rs.{bill.netAmount.toLocaleString()}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{bill.paymentMethod || '-'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: bill.status === 'Paid' ? '#D1FAE5' : '#FEF3C7', color: bill.status === 'Paid' ? '#065F46' : '#92400E' }}>{bill.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPhotos = () => {
    const treatmentPhotos = patient.treatments.map(t => ({
      treatment: t,
      before: `Before - ${t}`,
      after: `After - ${t}`,
    }))
    return (
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Before / After Photos</h3>
        <div className="rg-3">
          {treatmentPhotos.map((tp, i) => (
            <div key={i}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', color: '#111' }}>{tp.treatment}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ aspectRatio: '4/3', background: '#F3F4F6', borderRadius: '8px', border: '2px dashed #D1D5DB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px', color: '#9CA3AF', marginBottom: '4px' }}>📷</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>{tp.before}</span>
                </div>
                <div style={{ aspectRatio: '4/3', background: '#F3F4F6', borderRadius: '8px', border: '2px dashed #D1D5DB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px', color: '#9CA3AF', marginBottom: '4px' }}>📷</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>{tp.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {treatmentPhotos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '14px', padding: '20px 0' }}>No treatment photos to display.</p>
        )}
      </div>
    )
  }

  const tabContent = [renderOverview, renderVisitHistory, renderPrescriptions, renderForms, renderBilling, renderPhotos]

  return (
    <div className="page-wrap" style={{ maxWidth: '1400px' }}>
      {/* Back button */}
      <button onClick={() => navigate('/patients')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#6B7280', marginBottom: '16px', padding: 0 }}>
        <ArrowLeft size={16} /> Back to Patients
      </button>

      {/* Header card */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#111' }}>{patient.name}</h1>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280' }}>
                  <Phone size={13} /> {patient.phone}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280' }}>
                  <Mail size={13} /> {patient.email}
                </span>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>{patient.age}y, {patient.gender}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                {patient.treatments.map(t => <TagBadge key={t} label={t} />)}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px', padding: '3px 10px', background: '#FEF3C7', borderRadius: '999px' }}>
                  <Award size={13} style={{ color: '#F59E0B' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400E' }}>{patient.loyaltyPoints.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => showToast('Opening WhatsApp...')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: 'white', color: '#111', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <MessageCircle size={14} /> WhatsApp
            </button>
            <button onClick={() => showToast('Booking appointment...')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <Calendar size={14} /> Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-scroll" style={{ borderBottom: '2px solid #E5E7EB', marginBottom: '20px' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 20px', fontSize: '14px', fontWeight: '500', border: 'none', cursor: 'pointer', background: 'none',
              color: activeTab === i ? '#111' : '#6B7280',
              borderBottom: activeTab === i ? '2px solid #111' : '2px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tabContent[activeTab]()}
    </div>
  )
}
