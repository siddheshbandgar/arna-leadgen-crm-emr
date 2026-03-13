const treatmentColors: Record<string, { bg: string; text: string }> = {
  'Laser': { bg: '#DBEAFE', text: '#1D4ED8' },
  'Botox': { bg: '#EDE9FE', text: '#6D28D9' },
  'Chemical Peel': { bg: '#FEF3C7', text: '#92400E' },
  'Acne': { bg: '#FEE2E2', text: '#991B1B' },
  'Hair PRP': { bg: '#D1FAE5', text: '#065F46' },
  'Fillers': { bg: '#FCE7F3', text: '#9D174D' },
  'Consultation': { bg: '#F3F4F6', text: '#374151' },
}

interface TagBadgeProps {
  label: string
  onClick?: () => void
  active?: boolean
}

export default function TagBadge({ label, onClick, active }: TagBadgeProps) {
  const colors = treatmentColors[label] || { bg: '#F3F4F6', text: '#374151' }
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '999px',
        fontSize: '12px', fontWeight: '500', cursor: onClick ? 'pointer' : 'default',
        backgroundColor: active ? colors.text : colors.bg,
        color: active ? 'white' : colors.text,
        border: `1.5px solid ${active ? colors.text : 'transparent'}`,
        transition: 'all 0.15s',
      }}
    >
      {label}
    </span>
  )
}
