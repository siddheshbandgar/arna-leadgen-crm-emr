import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const weeklyData = [
  { day: 'Mon', appointments: 7 },
  { day: 'Tue', appointments: 9 },
  { day: 'Wed', appointments: 8 },
  { day: 'Thu', appointments: 10 },
  { day: 'Fri', appointments: 6 },
  { day: 'Sat', appointments: 8 },
]

const sourceData = [
  { name: 'Instagram', value: 45 },
  { name: 'Facebook', value: 30 },
  { name: 'Google', value: 15 },
  { name: 'Walk-in', value: 10 },
]
const COLORS = ['#E1306C', '#1877F2', '#4285F4', '#10B981']

const todaySchedule = [
  { time: '5:00 PM', patient: 'Priya Sharma', treatment: 'Consultation', status: 'Confirmed', statusColor: '#10B981' },
  { time: '5:30 PM', patient: 'Rahul Mehta', treatment: 'Laser Session #3', status: 'Confirmed', statusColor: '#10B981' },
  { time: '6:00 PM', patient: 'Ananya Reddy', treatment: 'Chemical Peel', status: 'Pending', statusColor: '#F59E0B' },
  { time: '6:30 PM', patient: 'Mohammed Irfan', treatment: 'Follow-up', status: 'Confirmed', statusColor: '#10B981' },
  { time: '7:00 PM', patient: 'Sneha Kulkarni', treatment: 'Botox', status: 'Consent Pending', statusColor: '#8B5CF6' },
]

const StatCard = ({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: string }) => (
  <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px', flex: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
        <p style={{ margin: '8px 0 4px', fontSize: '28px', fontWeight: '700', color: '#111111' }}>{value}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{subtitle}</p>
      </div>
      <span style={{ fontSize: '24px' }}>{icon}</span>
    </div>
  </div>
)

export default function Dashboard() {
  return (
    <div style={{ padding: '28px 32px', maxWidth: '1400px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111' }}>Dashboard</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>Welcome back, Dr. Mounika. Here's what's happening today.</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Today's Appointments" value="8" subtitle="5 confirmed, 3 pending" icon="📅" />
        <StatCard title="New Leads This Week" value="23" subtitle="+12% from last week" icon="📋" />
        <StatCard title="Active Patients" value="342" subtitle="18 new this month" icon="👥" />
        <StatCard title="Revenue This Month" value="₹2,45,000" subtitle="₹38k from medicines" icon="💰" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Appointments This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
              <Bar dataKey="appointments" fill="#111111" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Lead Sources</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="55%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={true}>
                {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#111' }}>Today's Schedule</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              {['Time', 'Patient', 'Treatment', 'Status'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todaySchedule.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px 12px', fontSize: '14px', fontWeight: '600', color: '#111' }}>{row.time}</td>
                <td style={{ padding: '12px 12px', fontSize: '14px', color: '#111' }}>{row.patient}</td>
                <td style={{ padding: '12px 12px', fontSize: '14px', color: '#374151' }}>{row.treatment}</td>
                <td style={{ padding: '12px 12px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500', background: row.statusColor + '20', color: row.statusColor }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
