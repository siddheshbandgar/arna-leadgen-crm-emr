import { useState } from 'react'
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react'
import SignaturePad from '../components/ui/SignaturePad'
import { useToast } from '../components/ui/Toast'

const formTemplates = [
  { id: 'ft1', name: 'Client Data Form', description: 'New patient registration form with personal and medical details', fields: 14, type: 'data' },
  { id: 'ft2', name: 'Laser Consent Form', description: 'Informed consent for laser treatment procedures', fields: 8, type: 'consent' },
  { id: 'ft3', name: 'Chemical Peel Consent Form', description: 'Informed consent for chemical peel procedures', fields: 8, type: 'consent' },
  { id: 'ft4', name: 'Botox Consent Form', description: 'Informed consent for botulinum toxin injections', fields: 8, type: 'consent' },
  { id: 'ft5', name: 'PRP Consent Form', description: 'Informed consent for Platelet Rich Plasma therapy', fields: 8, type: 'consent' },
]

export default function FormsAndConsents() {
  const { showToast } = useToast()
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<string[]>([])

  // Client Data Form state
  const [clientData, setClientData] = useState({
    fullName: '', dob: '', gender: '', phone: '', email: '', address: '',
    bloodGroup: '', emergencyContact: '', emergencyPhone: '',
    allergies: '', chronicConditions: '', currentMedications: '', previousSurgeries: '', skinType: '',
  })

  // Consent form state
  const [consentData, setConsentData] = useState({
    patientName: '', date: '', understand: false, risks: false, alternatives: false, consent: false,
  })
  const [signatureData, setSignatureData] = useState<string | null>(null)

  const handleClientSubmit = () => {
    if (!clientData.fullName || !clientData.phone) {
      showToast('Please fill in required fields (Name and Phone)', 'error')
      return
    }
    setSubmitted(prev => [...prev, 'ft1'])
    showToast('Client Data Form submitted successfully!')
    setActiveForm(null)
  }

  const handleConsentSubmit = () => {
    if (!consentData.patientName || !consentData.consent) {
      showToast('Please fill in name and check the consent box', 'error')
      return
    }
    if (!signatureData) {
      showToast('Please sign the consent form', 'error')
      return
    }
    setSubmitted(prev => [...prev, activeForm!])
    showToast('Consent form signed and submitted!')
    setActiveForm(null)
    setConsentData({ patientName: '', date: '', understand: false, risks: false, alternatives: false, consent: false })
    setSignatureData(null)
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '14px', outline: 'none',
    fontFamily: 'inherit',
  }
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '500' as const, color: '#374151', marginBottom: '4px' }

  const renderClientDataForm = () => (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveForm(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}><ArrowLeft size={18} color="#6B7280" /></button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111' }}>Client Data Form</h2>
      </div>

      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} value={clientData.fullName} onChange={e => setClientData({ ...clientData, fullName: e.target.value })} placeholder="Enter full name" />
          </div>
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input style={inputStyle} type="date" value={clientData.dob} onChange={e => setClientData({ ...clientData, dob: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Gender</label>
            <select style={inputStyle} value={clientData.gender} onChange={e => setClientData({ ...clientData, gender: e.target.value })}>
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Phone *</label>
            <input style={inputStyle} value={clientData.phone} onChange={e => setClientData({ ...clientData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={clientData.email} onChange={e => setClientData({ ...clientData, email: e.target.value })} placeholder="email@example.com" />
          </div>
          <div>
            <label style={labelStyle}>Blood Group</label>
            <select style={inputStyle} value={clientData.bloodGroup} onChange={e => setClientData({ ...clientData, bloodGroup: e.target.value })}>
              <option value="">Select</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Address</label>
            <input style={inputStyle} value={clientData.address} onChange={e => setClientData({ ...clientData, address: e.target.value })} placeholder="Full address" />
          </div>
          <div>
            <label style={labelStyle}>Emergency Contact</label>
            <input style={inputStyle} value={clientData.emergencyContact} onChange={e => setClientData({ ...clientData, emergencyContact: e.target.value })} placeholder="Contact name" />
          </div>
          <div>
            <label style={labelStyle}>Emergency Phone</label>
            <input style={inputStyle} value={clientData.emergencyPhone} onChange={e => setClientData({ ...clientData, emergencyPhone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Medical History</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          <div>
            <label style={labelStyle}>Known Allergies</label>
            <input style={inputStyle} value={clientData.allergies} onChange={e => setClientData({ ...clientData, allergies: e.target.value })} placeholder="List any allergies" />
          </div>
          <div>
            <label style={labelStyle}>Chronic Conditions</label>
            <input style={inputStyle} value={clientData.chronicConditions} onChange={e => setClientData({ ...clientData, chronicConditions: e.target.value })} placeholder="List any conditions" />
          </div>
          <div>
            <label style={labelStyle}>Current Medications</label>
            <input style={inputStyle} value={clientData.currentMedications} onChange={e => setClientData({ ...clientData, currentMedications: e.target.value })} placeholder="List medications" />
          </div>
          <div>
            <label style={labelStyle}>Previous Surgeries</label>
            <input style={inputStyle} value={clientData.previousSurgeries} onChange={e => setClientData({ ...clientData, previousSurgeries: e.target.value })} placeholder="List any surgeries" />
          </div>
          <div>
            <label style={labelStyle}>Skin Type (Fitzpatrick)</label>
            <select style={inputStyle} value={clientData.skinType} onChange={e => setClientData({ ...clientData, skinType: e.target.value })}>
              <option value="">Select</option>
              {['Type I', 'Type II', 'Type III', 'Type IV', 'Type V', 'Type VI'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleClientSubmit} style={{ padding: '10px 24px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          Submit Form
        </button>
      </div>
    </div>
  )

  const renderConsentForm = () => {
    const formName = formTemplates.find(f => f.id === activeForm)?.name || 'Consent Form'
    const treatmentType = formName.replace(' Consent Form', '')

    return (
      <div style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <button onClick={() => setActiveForm(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}><ArrowLeft size={18} color="#6B7280" /></button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111' }}>{formName}</h2>
        </div>

        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '24px' }}>
          {/* Clinic header */}
          <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #E5E7EB' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#111' }}>Arna Clinic - Skin & Hair</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>INFORMED CONSENT FOR {treatmentType.toUpperCase()} TREATMENT</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Patient Name *</label>
              <input style={inputStyle} value={consentData.patientName} onChange={e => setConsentData({ ...consentData, patientName: e.target.value })} placeholder="Enter patient name" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={consentData.date} onChange={e => setConsentData({ ...consentData, date: e.target.value })} />
            </div>
          </div>

          <div style={{ marginBottom: '20px', padding: '16px', background: '#F9FAFB', borderRadius: '8px', fontSize: '13px', color: '#374151', lineHeight: '1.8' }}>
            <p style={{ margin: '0 0 10px' }}>I, the undersigned, hereby consent to undergo <strong>{treatmentType}</strong> treatment at Arna Clinic. I acknowledge the following:</p>
            <ol style={{ margin: 0, paddingLeft: '20px' }}>
              <li>The nature, purpose, and expected outcomes of the {treatmentType.toLowerCase()} treatment have been explained to me.</li>
              <li>I understand the potential risks, side effects, and complications associated with this procedure.</li>
              <li>Alternative treatments have been discussed with me, and I have chosen to proceed with this treatment.</li>
              <li>I have had the opportunity to ask questions and all my questions have been answered satisfactorily.</li>
              <li>I understand that results may vary and no guarantees have been made regarding the outcome.</li>
              <li>I consent to before and after photographs being taken for my medical records.</li>
            </ol>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { key: 'understand' as const, label: 'I understand the nature and purpose of the treatment' },
              { key: 'risks' as const, label: 'I acknowledge the potential risks and side effects' },
              { key: 'alternatives' as const, label: 'I have been informed about alternative treatments' },
              { key: 'consent' as const, label: 'I hereby give my informed consent for the procedure *' },
            ].map(item => (
              <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consentData[item.key]}
                  onChange={e => setConsentData({ ...consentData, [item.key]: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#111' }}
                />
                {item.label}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...labelStyle, marginBottom: '8px' }}>Patient Signature *</label>
            <SignaturePad onSave={setSignatureData} />
          </div>

          <button onClick={handleConsentSubmit} style={{ padding: '10px 24px', background: '#111', color: 'white', border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
            Sign & Submit Consent
          </button>
        </div>
      </div>
    )
  }

  if (activeForm === 'ft1') return <div style={{ padding: '28px 32px' }}>{renderClientDataForm()}</div>
  if (activeForm && activeForm !== 'ft1') return <div style={{ padding: '28px 32px' }}>{renderConsentForm()}</div>

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Forms & Consents</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Manage clinic forms, consent documents, and patient signatures</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {formTemplates.map(form => (
          <div key={form.id} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {submitted.includes(form.id) ? <CheckCircle size={20} color="#10B981" /> : <FileText size={20} color="#6B7280" />}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111' }}>{form.name}</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#6B7280' }}>{form.description}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {submitted.includes(form.id) && (
                <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: '#D1FAE5', color: '#065F46' }}>Submitted</span>
              )}
              <button
                onClick={() => {
                  setActiveForm(form.id)
                  if (form.id !== 'ft1') {
                    setConsentData({ patientName: '', date: '', understand: false, risks: false, alternatives: false, consent: false })
                    setSignatureData(null)
                  }
                }}
                style={{ padding: '7px 16px', background: 'white', color: '#111', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
