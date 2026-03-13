export interface BillingRecord {
  id: string;
  date: string;
  patient: string;
  patientId: string;
  doctor: string;
  type: 'Consultation' | 'Service' | 'Medicine';
  description: string;
  amount: number;
  pointsUsed: number;
  netAmount: number;
  paymentMethod: 'Cash' | 'UPI' | 'Card';
  status: 'Paid' | 'Pending';
  items?: string[];
}

export const billingRecords: BillingRecord[] = [
  { id: 'br1', date: '13 Mar 2026', patient: 'Priya Sharma', patientId: 'p1', doctor: 'Dr. Mounika Ketha', type: 'Consultation', description: 'Consultation', amount: 700, pointsUsed: 0, netAmount: 700, paymentMethod: 'UPI', status: 'Paid' },
  { id: 'br2', date: '13 Mar 2026', patient: 'Rahul Mehta', patientId: 'p2', doctor: 'Dr. Mounika Ketha', type: 'Consultation', description: 'Consultation', amount: 700, pointsUsed: 0, netAmount: 700, paymentMethod: 'Cash', status: 'Paid' },
  { id: 'br3', date: '13 Mar 2026', patient: 'Ananya Reddy', patientId: 'p3', doctor: 'Dr. Mounika Ketha', type: 'Consultation', description: 'Consultation', amount: 700, pointsUsed: 0, netAmount: 700, paymentMethod: 'Card', status: 'Pending' },
  { id: 'br4', date: '13 Mar 2026', patient: 'Sneha Kulkarni', patientId: 'p5', doctor: 'Dr. Mounika Ketha', type: 'Service', description: 'Botox (Forehead)', amount: 15000, pointsUsed: 5000, netAmount: 10000, paymentMethod: 'Card', status: 'Paid' },
  { id: 'br5', date: '10 Mar 2026', patient: 'Priya Sharma', patientId: 'p1', doctor: 'Dr. Mounika Ketha', type: 'Service', description: 'Chemical Peel #2', amount: 3500, pointsUsed: 0, netAmount: 3500, paymentMethod: 'UPI', status: 'Paid' },
  { id: 'br6', date: '8 Mar 2026', patient: 'Rahul Mehta', patientId: 'p2', doctor: 'Dr. Mounika Ketha', type: 'Service', description: 'Laser Session #4', amount: 2500, pointsUsed: 0, netAmount: 2500, paymentMethod: 'UPI', status: 'Paid' },
  { id: 'br7', date: '10 Mar 2026', patient: 'Priya Sharma', patientId: 'p1', doctor: 'Dr. Mounika Ketha', type: 'Medicine', description: 'Adapalene, Azelaic Acid, Sunscreen', amount: 1280, pointsUsed: 0, netAmount: 1280, paymentMethod: 'UPI', status: 'Paid', items: ['Adapalene 0.1% Gel', 'Azelaic Acid 20% Cream', 'Sunscreen SPF 50+'] },
  { id: 'br8', date: '8 Mar 2026', patient: 'Rahul Mehta', patientId: 'p2', doctor: 'Dr. Mounika Ketha', type: 'Medicine', description: 'Minoxidil, Biotin', amount: 800, pointsUsed: 0, netAmount: 800, paymentMethod: 'Cash', status: 'Paid', items: ['Minoxidil 5% Solution', 'Biotin 10mg Tablets'] },
];
