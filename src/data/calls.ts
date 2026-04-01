export type CallPurpose = 'appointment-reminder' | 'post-treatment' | 'lead-followup' | 'prescription' | 'payment-reminder'
export type CallStatus = 'completed' | 'no-answer' | 'in-progress' | 'scheduled' | 'failed'

export interface TranscriptLine {
  speaker: 'ai' | 'patient'
  text: string
  time: string
}

export interface CallRecord {
  id: string
  patientName: string
  patientPhone: string
  avatar: string
  purpose: CallPurpose
  status: CallStatus
  scheduledAt: string
  duration?: number // seconds
  outcome?: string
  transcript?: TranscriptLine[]
}

export interface CallCampaign {
  id: string
  name: string
  purpose: CallPurpose
  totalCalls: number
  completed: number
  answered: number
  scheduled: number
  createdAt: string
  active: boolean
}

export const purposeLabels: Record<CallPurpose, string> = {
  'appointment-reminder': 'Appointment Reminder',
  'post-treatment': 'Post-Treatment Follow-up',
  'lead-followup': 'Lead Follow-up',
  'prescription': 'Prescription Ready',
  'payment-reminder': 'Payment Reminder',
}

export const purposeColors: Record<CallPurpose, string> = {
  'appointment-reminder': '#3B82F6',
  'post-treatment': '#10B981',
  'lead-followup': '#8B5CF6',
  'prescription': '#F59E0B',
  'payment-reminder': '#EF4444',
}

export const callCampaigns: CallCampaign[] = [
  {
    id: 'cc1',
    name: 'April Appointment Reminders',
    purpose: 'appointment-reminder',
    totalCalls: 48,
    completed: 41,
    answered: 37,
    scheduled: 7,
    createdAt: '2026-04-01',
    active: true,
  },
  {
    id: 'cc2',
    name: 'Post-Laser Follow-ups — March Batch',
    purpose: 'post-treatment',
    totalCalls: 22,
    completed: 22,
    answered: 19,
    scheduled: 0,
    createdAt: '2026-03-28',
    active: false,
  },
  {
    id: 'cc3',
    name: 'New Lead Outreach — Instagram Batch',
    purpose: 'lead-followup',
    totalCalls: 35,
    completed: 29,
    answered: 21,
    scheduled: 6,
    createdAt: '2026-03-31',
    active: true,
  },
  {
    id: 'cc4',
    name: 'Unpaid Invoice Follow-ups',
    purpose: 'payment-reminder',
    totalCalls: 14,
    completed: 14,
    answered: 10,
    scheduled: 0,
    createdAt: '2026-03-29',
    active: false,
  },
]

export const callRecords: CallRecord[] = [
  {
    id: 'c1',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98765 43210',
    avatar: 'PS',
    purpose: 'appointment-reminder',
    status: 'completed',
    scheduledAt: '2026-04-01T09:15:00',
    duration: 68,
    outcome: 'Confirmed appointment for April 3rd',
    transcript: [
      { speaker: 'ai', text: "Hello, this is Arna AI calling on behalf of Arna Skin & Hair Clinic. May I speak with Priya Sharma?", time: '0:00' },
      { speaker: 'patient', text: "Yes, this is Priya.", time: '0:05' },
      { speaker: 'ai', text: "Hi Priya! I'm calling to remind you about your Laser Hair Removal appointment scheduled for this Thursday, April 3rd at 11:00 AM. Will you be able to make it?", time: '0:07' },
      { speaker: 'patient', text: "Yes, I'll be there. Do I need to do anything to prepare?", time: '0:14' },
      { speaker: 'ai', text: "Great! Please avoid sun exposure for 24 hours before your session and come with clean, shaved skin on the treatment area. Avoid any perfumes or lotions on the day of the visit.", time: '0:18' },
      { speaker: 'patient', text: "Okay, got it. Thank you!", time: '0:29' },
      { speaker: 'ai', text: "Perfect! We'll see you Thursday. If you need to reschedule, please call us at 040-12345678. Have a lovely day, Priya!", time: '0:32' },
    ],
  },
  {
    id: 'c2',
    patientName: 'Rahul Mehta',
    patientPhone: '+91 91234 56789',
    avatar: 'RM',
    purpose: 'post-treatment',
    status: 'completed',
    scheduledAt: '2026-04-01T10:30:00',
    duration: 94,
    outcome: 'Patient doing well. No side effects reported.',
    transcript: [
      { speaker: 'ai', text: "Hello, am I speaking with Rahul Mehta?", time: '0:00' },
      { speaker: 'patient', text: "Yes, who is this?", time: '0:04' },
      { speaker: 'ai', text: "Hi Rahul, this is Arna AI from Arna Clinic. I'm calling to check in on you after your Chemical Peel session on March 30th. How are you feeling?", time: '0:06' },
      { speaker: 'patient', text: "I'm doing okay. My face is a bit red but otherwise fine.", time: '0:16' },
      { speaker: 'ai', text: "That's completely normal for the first 48-72 hours. The redness should subside by tomorrow. Are you using the prescribed moisturizer twice daily?", time: '0:22' },
      { speaker: 'patient', text: "Yes, morning and night like they said.", time: '0:31' },
      { speaker: 'ai', text: "Excellent! Please continue avoiding direct sunlight and use SPF 50+ whenever you go out. If the redness gets worse or you notice any unusual irritation, please don't hesitate to call the clinic. Would you like to book your next follow-up session?", time: '0:35' },
      { speaker: 'patient', text: "Sure, maybe in two weeks?", time: '0:52' },
      { speaker: 'ai', text: "I'll have our front desk reach out to schedule that for you. Thank you for your time, Rahul. Take care!", time: '0:55' },
    ],
  },
  {
    id: 'c3',
    patientName: 'Sneha Kapoor',
    patientPhone: '+91 87654 32109',
    avatar: 'SK',
    purpose: 'lead-followup',
    status: 'completed',
    scheduledAt: '2026-04-01T11:00:00',
    duration: 112,
    outcome: 'Interested. Appointment booked for April 5th.',
    transcript: [
      { speaker: 'ai', text: "Hello, may I speak with Sneha Kapoor? This is Arna AI calling from Arna Skin & Hair Clinic.", time: '0:00' },
      { speaker: 'patient', text: "Yes, speaking.", time: '0:06' },
      { speaker: 'ai', text: "Hi Sneha! You recently inquired about our Botox and Anti-Aging treatments on Instagram. I'm calling to answer any questions and help you get started. Do you have a few minutes?", time: '0:08' },
      { speaker: 'patient', text: "Yes, I was curious about the pricing and what to expect.", time: '0:18' },
      { speaker: 'ai', text: "Of course! Our Botox treatment starts at ₹8,000 per session and targets fine lines and wrinkles. The procedure takes about 20-30 minutes with minimal downtime. Results are visible within 3-5 days and last 4-6 months.", time: '0:23' },
      { speaker: 'patient', text: "That sounds good. How do I book a consultation?", time: '0:40' },
      { speaker: 'ai', text: "I'd love to book a free consultation for you with Dr. Mounika. We have slots available this Saturday, April 5th. Would 10 AM or 3 PM work better for you?", time: '0:44' },
      { speaker: 'patient', text: "10 AM works perfectly.", time: '0:56' },
      { speaker: 'ai', text: "Wonderful! I've noted that down. You'll receive a WhatsApp confirmation shortly. Our address is Banjara Hills, Road No. 12, Hyderabad. Is there anything else I can help you with?", time: '0:59' },
    ],
  },
  {
    id: 'c4',
    patientName: 'Amit Desai',
    patientPhone: '+91 99988 77665',
    avatar: 'AD',
    purpose: 'appointment-reminder',
    status: 'no-answer',
    scheduledAt: '2026-04-01T11:45:00',
    duration: 0,
    outcome: 'No answer. SMS fallback sent.',
  },
  {
    id: 'c5',
    patientName: 'Lakshmi Reddy',
    patientPhone: '+91 98000 11223',
    avatar: 'LR',
    purpose: 'payment-reminder',
    status: 'completed',
    scheduledAt: '2026-04-01T12:00:00',
    duration: 52,
    outcome: 'Patient will pay via UPI by end of day.',
    transcript: [
      { speaker: 'ai', text: "Hello, is this Lakshmi Reddy?", time: '0:00' },
      { speaker: 'patient', text: "Yes, that's me.", time: '0:03' },
      { speaker: 'ai', text: "Hi Lakshmi, this is Arna AI from Arna Clinic. I'm calling regarding Invoice #INV-2024 for ₹4,500 dated March 25th, which appears to be pending. I wanted to check if there's anything we can help with.", time: '0:05' },
      { speaker: 'patient', text: "Oh yes, I forgot! I'll pay it today.", time: '0:18' },
      { speaker: 'ai', text: "No worries at all! You can pay via UPI to 9876543210@okaxis or visit the clinic. Would you like me to send the payment link on WhatsApp?", time: '0:23' },
      { speaker: 'patient', text: "Yes please, send it on WhatsApp.", time: '0:34' },
      { speaker: 'ai', text: "Done! You'll receive it shortly. Thank you, Lakshmi. Have a great day!", time: '0:37' },
    ],
  },
  {
    id: 'c6',
    patientName: 'Karan Nair',
    patientPhone: '+91 77777 88888',
    avatar: 'KN',
    purpose: 'post-treatment',
    status: 'scheduled',
    scheduledAt: '2026-04-01T14:30:00',
    outcome: undefined,
  },
  {
    id: 'c7',
    patientName: 'Divya Patel',
    patientPhone: '+91 80000 55555',
    avatar: 'DP',
    purpose: 'lead-followup',
    status: 'scheduled',
    scheduledAt: '2026-04-01T15:00:00',
    outcome: undefined,
  },
  {
    id: 'c8',
    patientName: 'Rohan Gupta',
    patientPhone: '+91 91111 22222',
    avatar: 'RG',
    purpose: 'appointment-reminder',
    status: 'completed',
    scheduledAt: '2026-03-31T10:00:00',
    duration: 45,
    outcome: 'Rescheduled to April 8th.',
    transcript: [
      { speaker: 'ai', text: "Hello, may I speak with Rohan Gupta?", time: '0:00' },
      { speaker: 'patient', text: "Speaking.", time: '0:03' },
      { speaker: 'ai', text: "Hi Rohan! Calling to confirm your Hair PRP appointment tomorrow, April 1st at 2 PM. Are you still available?", time: '0:05' },
      { speaker: 'patient', text: "Actually, I have a work emergency. Can we move it?", time: '0:13' },
      { speaker: 'ai', text: "Of course! I can see availability on April 8th at 11 AM or April 9th at 3 PM. Which works better?", time: '0:18' },
      { speaker: 'patient', text: "April 8th at 11 AM please.", time: '0:28' },
      { speaker: 'ai', text: "Done! Your appointment has been rescheduled to April 8th at 11:00 AM. You'll receive a confirmation on WhatsApp. Thank you, Rohan!", time: '0:32' },
    ],
  },
]

// Demo transcript shown during the live call simulation
export const demoCallScript: { speaker: 'ai' | 'patient'; text: string; delay: number }[] = [
  { speaker: 'ai', text: "Hello, may I speak with Ananya Krishnan? This is Arna AI calling from Arna Skin & Hair Clinic.", delay: 1000 },
  { speaker: 'patient', text: "Yes, this is Ananya.", delay: 3500 },
  { speaker: 'ai', text: "Hi Ananya! I'm calling to remind you about your Hydra Facial appointment scheduled for tomorrow, April 2nd at 2:30 PM. Does that still work for you?", delay: 5000 },
  { speaker: 'patient', text: "Yes, I'll be there!", delay: 9500 },
  { speaker: 'ai', text: "Wonderful! Just a quick note — please come with a clean face and avoid wearing heavy makeup. Would you need directions to the clinic?", delay: 11000 },
  { speaker: 'patient', text: "No, I've been there before. Thanks for the reminder!", delay: 15500 },
  { speaker: 'ai', text: "Perfect! We look forward to seeing you tomorrow. If you need to reach us, call 040-12345678. Have a great day, Ananya!", delay: 18000 },
]
