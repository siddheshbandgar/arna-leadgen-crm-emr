export interface Campaign {
  id: string;
  name: string;
  segment: string;
  sent: number;
  delivered: number;
  read: number;
  date: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  message: string;
}

export const campaigns: Campaign[] = [
  { id: 'c1', name: 'New Laser Machine Launch', segment: 'Laser patients', sent: 47, delivered: 45, read: 38, date: '10 Mar 2026', status: 'Sent', message: 'Hi {name}, exciting news! We have a new FDA-approved laser at Arna Clinic. As a valued patient, get 20% off your next laser session. Book now!' },
  { id: 'c2', name: 'Summer Skincare Offer', segment: 'All patients', sent: 342, delivered: 330, read: 285, date: '1 Mar 2026', status: 'Sent', message: 'Hi {name}, summer is here! Get your skin summer-ready with our exclusive skincare packages. Limited time offer -- 15% off all services this month.' },
  { id: 'c3', name: 'Botox Special Price', segment: 'Botox patients', sent: 23, delivered: 22, read: 18, date: '15 Feb 2026', status: 'Sent', message: 'Hi {name}, special pricing on Botox this month! Book before March 1 and save Rs.2,000. Your loyalty points make it even sweeter!' },
  { id: 'c4', name: 'Hair Fall Awareness Week', segment: 'Hair PRP patients', sent: 18, delivered: 17, read: 14, date: '1 Feb 2026', status: 'Sent', message: 'Hi {name}, February is Hair Health Month! Get a free scalp analysis with your next PRP session. Use code HAIR2026.' },
  { id: 'c5', name: 'Spring Refresh Package', segment: 'Chemical Peel patients', sent: 0, delivered: 0, read: 0, date: '20 Mar 2026', status: 'Scheduled', message: 'Hi {name}, spring is the perfect time for a fresh glow! Book your Chemical Peel session and earn double loyalty points.' },
];
