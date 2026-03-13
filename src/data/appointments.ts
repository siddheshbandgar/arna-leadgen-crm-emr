export interface Appointment {
  id: string;
  date: string;
  time: string;
  patient: string;
  patientId: string;
  phone: string;
  treatment: string;
  treatmentColor: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  doctor: string;
  notes?: string;
}

export const appointments: Appointment[] = [
  { id: 'a1', date: '2026-03-09', time: '17:00', patient: 'Priya Sharma', patientId: 'p1', phone: '+91 98765 43210', treatment: 'Chemical Peel', treatmentColor: '#F59E0B', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a2', date: '2026-03-09', time: '17:30', patient: 'Rahul Mehta', patientId: 'p2', phone: '+91 87654 32109', treatment: 'Acne Treatment', treatmentColor: '#EF4444', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a3', date: '2026-03-10', time: '17:00', patient: 'Ananya Reddy', patientId: 'p3', phone: '+91 76543 21098', treatment: 'Botox', treatmentColor: '#8B5CF6', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a4', date: '2026-03-10', time: '17:30', patient: 'Mohammed Irfan', patientId: 'p4', phone: '+91 65432 10987', treatment: 'Hair PRP', treatmentColor: '#10B981', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a5', date: '2026-03-11', time: '17:00', patient: 'Sneha Kulkarni', patientId: 'p5', phone: '+91 54321 09876', treatment: 'Consultation', treatmentColor: '#6B7280', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a6', date: '2026-03-11', time: '17:30', patient: 'Meera Iyer', patientId: '', phone: '+91 98765 43210', treatment: 'Laser Hair Removal', treatmentColor: '#3B82F6', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a7', date: '2026-03-12', time: '17:00', patient: 'Vikram Rao', patientId: '', phone: '+91 87654 32109', treatment: 'Acne Treatment', treatmentColor: '#EF4444', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a8', date: '2026-03-12', time: '17:30', patient: 'Deepika Joshi', patientId: '', phone: '+91 93456 78901', treatment: 'Chemical Peel', treatmentColor: '#F59E0B', status: 'Completed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a9', date: '2026-03-13', time: '17:00', patient: 'Priya Sharma', patientId: 'p1', phone: '+91 98765 43210', treatment: 'Consultation', treatmentColor: '#6B7280', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a10', date: '2026-03-13', time: '17:30', patient: 'Rahul Mehta', patientId: 'p2', phone: '+91 87654 32109', treatment: 'Laser Session #3', treatmentColor: '#3B82F6', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a11', date: '2026-03-13', time: '18:00', patient: 'Ananya Reddy', patientId: 'p3', phone: '+91 76543 21098', treatment: 'Chemical Peel', treatmentColor: '#F59E0B', status: 'Pending', doctor: 'Dr. Mounika Ketha' },
  { id: 'a12', date: '2026-03-13', time: '18:30', patient: 'Mohammed Irfan', patientId: 'p4', phone: '+91 65432 10987', treatment: 'Follow-up', treatmentColor: '#6B7280', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a13', date: '2026-03-13', time: '19:00', patient: 'Sneha Kulkarni', patientId: 'p5', phone: '+91 54321 09876', treatment: 'Botox', treatmentColor: '#8B5CF6', status: 'Confirmed', doctor: 'Dr. Mounika Ketha', notes: 'Consent form pending' },
  { id: 'a14', date: '2026-03-14', time: '17:00', patient: 'Fatima Khan', patientId: '', phone: '+91 76543 21098', treatment: 'Consultation', treatmentColor: '#6B7280', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a15', date: '2026-03-14', time: '17:30', patient: 'Rohit Verma', patientId: '', phone: '+91 60123 45678', treatment: 'Acne Scar Treatment', treatmentColor: '#EF4444', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a16', date: '2026-03-15', time: '17:00', patient: 'Priya Sharma', patientId: 'p1', phone: '+91 98765 43210', treatment: 'Laser Session #5', treatmentColor: '#3B82F6', status: 'Confirmed', doctor: 'Dr. Mounika Ketha' },
  { id: 'a17', date: '2026-03-15', time: '17:30', patient: 'Nalini Krishnan', patientId: '', phone: '+91 99871 23456', treatment: 'Fillers', treatmentColor: '#EC4899', status: 'Pending', doctor: 'Dr. Mounika Ketha' },
];
