import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import Patients from './pages/Patients'
import PatientProfile from './pages/PatientProfile'
import Appointments from './pages/Appointments'
import FormsAndConsents from './pages/FormsAndConsents'
import Prescriptions from './pages/Prescriptions'
import Billing from './pages/Billing'
import Campaigns from './pages/Campaigns'
import AIAgents from './pages/AIAgents'
import Channels from './pages/Channels'
import WATemplates from './pages/WATemplates'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="forms" element={<FormsAndConsents />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="billing" element={<Billing />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="ai-agents" element={<AIAgents />} />
          <Route path="channels" element={<Channels />} />
          <Route path="wa-templates" element={<WATemplates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
