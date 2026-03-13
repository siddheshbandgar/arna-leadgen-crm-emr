export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  interest: string;
  status: 'New' | 'Contacted' | 'Booked' | 'Visited' | 'Converted' | 'Lost';
  date: string;
  aiSummary: string;
  tags: string[];
}

export const leads: Lead[] = [
  { id: 'l1', name: 'Meera Iyer', phone: '+91 98765 43210', source: 'Instagram Ad', interest: 'Laser Hair Removal', status: 'New', date: '13 Mar 2026', aiSummary: 'Meera inquired about laser hair removal pricing through Instagram. She is comparing with 2 other clinics. Budget-conscious but quality-oriented. Follow up with a consultation offer.', tags: ['Instagram Lead', 'Laser Interest'] },
  { id: 'l2', name: 'Vikram Rao', phone: '+91 87654 32109', source: 'Facebook Ad', interest: 'Acne Treatment', status: 'Contacted', date: '12 Mar 2026', aiSummary: 'Vikram reached out via Facebook after seeing before/after acne results. Has tried multiple OTC products without success. Ready to book a consultation.', tags: ['Facebook Lead', 'Acne Interest'] },
  { id: 'l3', name: 'Fatima Khan', phone: '+91 76543 21098', source: 'Google', interest: 'Consultation', status: 'Booked', date: '11 Mar 2026', aiSummary: 'Fatima found the clinic via Google search. Looking for a general skin consultation. Appointment booked for next week.', tags: ['Google Lead'] },
  { id: 'l4', name: 'Arjun Desai', phone: '+91 65432 10987', source: 'Instagram Ad', interest: 'Botox', status: 'Visited', date: '10 Mar 2026', aiSummary: 'Arjun visited after Instagram inquiry about Botox. Had consultation, received quote. Decision pending.', tags: ['Instagram Lead', 'Botox Interest'] },
  { id: 'l5', name: 'Lakshmi Nair', phone: '+91 54321 09876', source: 'Walk-in', interest: 'Hair Fall', status: 'Converted', date: '9 Mar 2026', aiSummary: 'Lakshmi walked in after seeing the clinic. Immediate interest in hair fall treatment. Converted to patient after first consultation.', tags: ['Walk-in', 'Hair Interest'] },
  { id: 'l6', name: 'Deepika Joshi', phone: '+91 93456 78901', source: 'Instagram Ad', interest: 'Chemical Peel', status: 'New', date: '13 Mar 2026', aiSummary: 'Interested in brightening peels for dull skin.', tags: ['Instagram Lead', 'Peel Interest'] },
  { id: 'l7', name: 'Suresh Patel', phone: '+91 82345 67890', source: 'Google', interest: 'Mole Removal', status: 'Contacted', date: '12 Mar 2026', aiSummary: 'Inquired about mole removal procedure and recovery time.', tags: ['Google Lead'] },
  { id: 'l8', name: 'Kavya Menon', phone: '+91 71234 56789', source: 'Facebook Ad', interest: 'Botox', status: 'Lost', date: '5 Mar 2026', aiSummary: 'Was interested but chose a competitor clinic. May re-engage in 3 months.', tags: ['Facebook Lead', 'Botox Interest'] },
  { id: 'l9', name: 'Rohit Verma', phone: '+91 60123 45678', source: 'Practo', interest: 'Acne Scars', status: 'Booked', date: '11 Mar 2026', aiSummary: 'Found clinic on Practo, interested in acne scar treatment.', tags: ['Practo Lead', 'Acne Interest'] },
  { id: 'l10', name: 'Nalini Krishnan', phone: '+91 99871 23456', source: 'Walk-in', interest: 'Anti-aging', status: 'Visited', date: '8 Mar 2026', aiSummary: 'Walk-in for anti-aging consultation. Interested in combination treatment.', tags: ['Walk-in', 'Anti-aging'] },
];
