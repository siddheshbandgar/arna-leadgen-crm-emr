export interface Visit {
  id: string;
  date: string;
  title: string;
  doctor: string;
  complaint: string;
  treatment: string;
  notes: string;
  bill: number;
  billStatus: 'Paid' | 'Pending';
  prescriptionId?: string;
}

export interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  sentViaWA: boolean;
}

export interface Bill {
  id: string;
  date: string;
  type: 'Consultation' | 'Service' | 'Medicine';
  description: string;
  amount: number;
  pointsUsed: number;
  netAmount: number;
  status: 'Paid' | 'Pending';
  paymentMethod?: string;
}

export interface ConsentForm {
  id: string;
  formName: string;
  status: 'Filled' | 'Signed' | 'Pending';
  date?: string;
  signatureData?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  dob: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string;
  chronicConditions: string[];
  medications: string;
  previousSurgeries: string;
  skinType: string;
  treatments: string[];
  loyaltyPoints: number;
  lastVisit: string;
  nextAppointment?: string;
  notes: string;
  visits: Visit[];
  prescriptions: Prescription[];
  bills: Bill[];
  consentForms: ConsentForm[];
}

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@gmail.com',
    age: 32,
    gender: 'Female',
    dob: '15 Mar 1993',
    address: 'Flat 4B, Banjara Hills, Hyderabad - 500034',
    bloodGroup: 'B+',
    emergencyContact: 'Rohan Sharma',
    emergencyPhone: '+91 98765 43211',
    allergies: 'None known',
    chronicConditions: [],
    medications: 'None',
    previousSurgeries: 'None',
    skinType: 'Type III (Fitzpatrick)',
    treatments: ['Laser', 'Chemical Peel'],
    loyaltyPoints: 8200,
    lastVisit: '10 Mar 2026',
    nextAppointment: '15 Mar 2026',
    notes: 'Patient responds well to glycolic acid peels. Sensitive around nasal area. Prefers evening appointments.',
    visits: [
      {
        id: 'v1',
        date: '10 Mar 2026',
        title: 'Chemical Peel Session #2',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Follow-up for pigmentation',
        treatment: '30% Glycolic Acid Peel',
        notes: 'Good response. Mild redness expected for 24hrs. Recommend SPF daily.',
        bill: 3500,
        billStatus: 'Paid',
        prescriptionId: 'rx2',
      },
      {
        id: 'v2',
        date: '25 Feb 2026',
        title: 'Laser Session #4',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Upper lip + underarms hair removal',
        treatment: 'Diode Laser 810nm',
        notes: '4th session. 70% reduction observed. 2 more sessions recommended.',
        bill: 2500,
        billStatus: 'Paid',
      },
      {
        id: 'v3',
        date: '10 Feb 2026',
        title: 'Consultation (First Visit)',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Pigmentation on cheeks, unwanted hair',
        treatment: 'Diagnosis: Melasma Grade II, Hirsutism. Plan: Chemical peels x6, Laser x6',
        notes: 'Started treatment plan. Advised to avoid sun exposure.',
        bill: 700,
        billStatus: 'Paid',
        prescriptionId: 'rx1',
      },
    ],
    prescriptions: [
      {
        id: 'rx1',
        date: '10 Feb 2026',
        doctor: 'Dr. Mounika Ketha',
        medicines: [
          { name: 'Adapalene 0.1% Gel', dosage: 'Pea-sized amount', frequency: 'Once daily at night', duration: '8 weeks' },
          { name: 'Azelaic Acid 20% Cream', dosage: 'Thin layer', frequency: 'Once daily morning', duration: '8 weeks' },
          { name: 'Sunscreen SPF 50+', dosage: 'Generous amount', frequency: 'Every 3 hours outdoors', duration: 'Ongoing' },
          { name: 'Cetaphil Gentle Cleanser', dosage: 'As required', frequency: 'Twice daily', duration: 'Ongoing' },
        ],
        sentViaWA: true,
      },
      {
        id: 'rx2',
        date: '10 Mar 2026',
        doctor: 'Dr. Mounika Ketha',
        medicines: [
          { name: 'Hydroquinone 2% Cream', dosage: 'Thin layer on pigmented area', frequency: 'Once daily night', duration: '6 weeks' },
          { name: 'Kojic Acid Serum', dosage: '2-3 drops', frequency: 'Morning', duration: '6 weeks' },
          { name: 'Sunscreen SPF 50+', dosage: 'Generous amount', frequency: 'Every 3 hours outdoors', duration: 'Ongoing' },
        ],
        sentViaWA: true,
      },
    ],
    bills: [
      { id: 'b1', date: '10 Mar 2026', type: 'Service', description: 'Chemical Peel Session #2', amount: 3500, pointsUsed: 0, netAmount: 3500, status: 'Paid', paymentMethod: 'UPI' },
      { id: 'b2', date: '25 Feb 2026', type: 'Service', description: 'Laser Session #4', amount: 2500, pointsUsed: 500, netAmount: 2000, status: 'Paid', paymentMethod: 'Card' },
      { id: 'b3', date: '10 Feb 2026', type: 'Consultation', description: 'First Visit Consultation', amount: 700, pointsUsed: 0, netAmount: 700, status: 'Paid', paymentMethod: 'Cash' },
      { id: 'b4', date: '10 Feb 2026', type: 'Medicine', description: 'Adapalene + Azelaic Acid + Sunscreen', amount: 850, pointsUsed: 0, netAmount: 850, status: 'Paid', paymentMethod: 'UPI' },
    ],
    consentForms: [
      { id: 'cf1', formName: 'Client Data Form', status: 'Filled', date: '10 Feb 2026' },
      { id: 'cf2', formName: 'Laser Consent Form', status: 'Signed', date: '25 Feb 2026' },
      { id: 'cf3', formName: 'Chemical Peel Consent Form', status: 'Signed', date: '10 Mar 2026' },
      { id: 'cf4', formName: 'Botox Consent Form', status: 'Pending' },
    ],
  },
  {
    id: 'p2',
    name: 'Rahul Mehta',
    phone: '+91 87654 32109',
    email: 'rahul.mehta@gmail.com',
    age: 28,
    gender: 'Male',
    dob: '22 Jul 1997',
    address: 'Madhapur, Hyderabad - 500081',
    bloodGroup: 'O+',
    emergencyContact: 'Kavita Mehta',
    emergencyPhone: '+91 87654 32110',
    allergies: 'Penicillin',
    chronicConditions: ['Mild Acne Vulgaris'],
    medications: 'None currently',
    previousSurgeries: 'None',
    skinType: 'Type IV (Fitzpatrick)',
    treatments: ['Acne', 'Laser'],
    loyaltyPoints: 3400,
    lastVisit: '8 Mar 2026',
    nextAppointment: '13 Mar 2026',
    notes: 'Penicillin allergy documented. Acne responding well to topical retinoids.',
    visits: [
      {
        id: 'v4',
        date: '8 Mar 2026',
        title: 'Acne Follow-up',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Persistent acne on forehead',
        treatment: 'Chemical peel + topical adjustments',
        notes: 'Reducing comedones. Continue current regimen.',
        bill: 1500,
        billStatus: 'Paid',
        prescriptionId: 'rx3',
      },
    ],
    prescriptions: [
      {
        id: 'rx3',
        date: '8 Mar 2026',
        doctor: 'Dr. Mounika Ketha',
        medicines: [
          { name: 'Tretinoin 0.025% Cream', dosage: 'Pea-sized', frequency: 'Once nightly', duration: '12 weeks' },
          { name: 'Benzoyl Peroxide 2.5% Gel', dosage: 'Thin layer', frequency: 'Morning', duration: '8 weeks' },
          { name: 'Niacinamide 10% Serum', dosage: '2-3 drops', frequency: 'Twice daily', duration: 'Ongoing' },
        ],
        sentViaWA: true,
      },
    ],
    bills: [
      { id: 'b5', date: '8 Mar 2026', type: 'Service', description: 'Acne Treatment Session', amount: 1500, pointsUsed: 0, netAmount: 1500, status: 'Paid', paymentMethod: 'UPI' },
      { id: 'b6', date: '8 Mar 2026', type: 'Medicine', description: 'Tretinoin + Benzoyl Peroxide', amount: 800, pointsUsed: 0, netAmount: 800, status: 'Paid', paymentMethod: 'Cash' },
    ],
    consentForms: [
      { id: 'cf5', formName: 'Client Data Form', status: 'Filled', date: '8 Mar 2026' },
    ],
  },
  {
    id: 'p3',
    name: 'Ananya Reddy',
    phone: '+91 76543 21098',
    email: 'ananya.reddy@outlook.com',
    age: 38,
    gender: 'Female',
    dob: '5 Nov 1987',
    address: 'Jubilee Hills, Hyderabad - 500033',
    bloodGroup: 'A+',
    emergencyContact: 'Vikram Reddy',
    emergencyPhone: '+91 76543 21099',
    allergies: 'None known',
    chronicConditions: [],
    medications: 'None',
    previousSurgeries: 'None',
    skinType: 'Type II (Fitzpatrick)',
    treatments: ['Botox', 'Fillers'],
    loyaltyPoints: 12500,
    lastVisit: '5 Mar 2026',
    nextAppointment: '20 Mar 2026',
    notes: 'Premium patient. Prefers Botox for frontalis lines and filler for nasolabial folds.',
    visits: [
      {
        id: 'v5',
        date: '5 Mar 2026',
        title: 'Botox + Filler Session',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Anti-aging treatment',
        treatment: 'Botox 20 units forehead + HA Filler 1ml nasolabial folds',
        notes: 'Excellent outcome. Review in 3 weeks.',
        bill: 25000,
        billStatus: 'Paid',
      },
    ],
    prescriptions: [],
    bills: [
      { id: 'b7', date: '5 Mar 2026', type: 'Service', description: 'Botox + Dermal Filler', amount: 25000, pointsUsed: 2500, netAmount: 22500, status: 'Paid', paymentMethod: 'Card' },
    ],
    consentForms: [
      { id: 'cf6', formName: 'Client Data Form', status: 'Filled', date: '5 Mar 2026' },
      { id: 'cf7', formName: 'Botox Consent Form', status: 'Signed', date: '5 Mar 2026' },
    ],
  },
  {
    id: 'p4',
    name: 'Mohammed Irfan',
    phone: '+91 65432 10987',
    email: 'irfan.m@gmail.com',
    age: 35,
    gender: 'Male',
    dob: '18 Jan 1991',
    address: 'Tolichowki, Hyderabad - 500008',
    bloodGroup: 'AB+',
    emergencyContact: 'Sameena Irfan',
    emergencyPhone: '+91 65432 10988',
    allergies: 'None known',
    chronicConditions: ['Androgenetic Alopecia'],
    medications: 'Minoxidil 5%',
    previousSurgeries: 'None',
    skinType: 'Type V (Fitzpatrick)',
    treatments: ['Hair PRP'],
    loyaltyPoints: 1800,
    lastVisit: '1 Mar 2026',
    nextAppointment: '13 Mar 2026',
    notes: 'Responding well to PRP. Hair density improved 30% after 3 sessions.',
    visits: [
      {
        id: 'v6',
        date: '1 Mar 2026',
        title: 'Hair PRP Session #3',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Hair fall and thinning on crown',
        treatment: 'Platelet Rich Plasma injection scalp',
        notes: 'Good platelet count. 30% improvement in density noted.',
        bill: 8000,
        billStatus: 'Paid',
      },
    ],
    prescriptions: [],
    bills: [
      { id: 'b8', date: '1 Mar 2026', type: 'Service', description: 'Hair PRP Session #3', amount: 8000, pointsUsed: 0, netAmount: 8000, status: 'Paid', paymentMethod: 'UPI' },
    ],
    consentForms: [
      { id: 'cf8', formName: 'Client Data Form', status: 'Filled', date: '1 Mar 2026' },
      { id: 'cf9', formName: 'PRP Consent Form', status: 'Signed', date: '1 Mar 2026' },
    ],
  },
  {
    id: 'p5',
    name: 'Sneha Kulkarni',
    phone: '+91 54321 09876',
    email: 'sneha.kulkarni@yahoo.com',
    age: 29,
    gender: 'Female',
    dob: '30 Sep 1996',
    address: 'Kondapur, Hyderabad - 500084',
    bloodGroup: 'O-',
    emergencyContact: 'Raj Kulkarni',
    emergencyPhone: '+91 54321 09877',
    allergies: 'None known',
    chronicConditions: [],
    medications: 'None',
    previousSurgeries: 'None',
    skinType: 'Type III (Fitzpatrick)',
    treatments: ['Botox'],
    loyaltyPoints: 5000,
    lastVisit: '28 Feb 2026',
    nextAppointment: '13 Mar 2026',
    notes: 'Botox for masseter hypertrophy and forehead lines.',
    visits: [
      {
        id: 'v7',
        date: '28 Feb 2026',
        title: 'Botox Session',
        doctor: 'Dr. Mounika Ketha',
        complaint: 'Forehead wrinkles, jaw tension',
        treatment: 'Botox 25 units forehead + 30 units masseter',
        notes: 'Natural result. Patient satisfied.',
        bill: 15000,
        billStatus: 'Paid',
      },
    ],
    prescriptions: [],
    bills: [
      { id: 'b9', date: '28 Feb 2026', type: 'Service', description: 'Botox (Forehead + Masseter)', amount: 15000, pointsUsed: 5000, netAmount: 10000, status: 'Paid', paymentMethod: 'Card' },
    ],
    consentForms: [
      { id: 'cf10', formName: 'Client Data Form', status: 'Filled', date: '28 Feb 2026' },
      { id: 'cf11', formName: 'Botox Consent Form', status: 'Signed', date: '28 Feb 2026' },
    ],
  },
];
