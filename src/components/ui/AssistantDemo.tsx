import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bot, ChevronRight, LoaderCircle, Sparkles, X } from 'lucide-react'

type ChatRole = 'assistant' | 'user' | 'system'

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

interface DemoIntent {
  route: string
  title: string
  steps: string[]
  response: string
}

const quickPrompts = [
  'Today appointments',
  'Open billing',
  'Find Priya Sharma',
  'Consent forms',
]

const baseIntent: DemoIntent = {
  route: '/dashboard',
  title: 'Reviewing the workspace',
  steps: [
    'Scanning the screen',
    'Understanding the request',
    'Preparing the next step',
  ],
  response: 'I am ready. Try appointments, billing, patients, or forms.',
}

function inferIntent(prompt: string): DemoIntent {
  const lower = prompt.toLowerCase()

  if (lower.includes('appointment') || lower.includes('schedule') || lower.includes('calendar')) {
    return {
      route: '/appointments',
      title: 'Opening appointments',
      steps: [
        'Reading the visible schedule',
        'Focusing the schedule',
        'Opening appointments',
      ],
      response: 'Appointments are open.',
    }
  }

  if (lower.includes('patient') || lower.includes('priya') || lower.includes('rahul') || lower.includes('ananya')) {
    return {
      route: '/patients',
      title: 'Locating patient records',
      steps: [
        'Searching the patient list',
        'Matching the record',
        'Opening patients',
      ],
      response: 'Patients are open.',
    }
  }

  if (lower.includes('bill') || lower.includes('invoice') || lower.includes('payment') || lower.includes('revenue')) {
    return {
      route: '/billing',
      title: 'Opening billing',
      steps: [
        'Inspecting payments and invoice context',
        'Preparing billing',
        'Opening billing',
      ],
      response: 'Billing is open.',
    }
  }

  if (lower.includes('lead') || lower.includes('campaign') || lower.includes('marketing')) {
    return {
      route: '/campaigns',
      title: 'Setting up a campaign flow',
      steps: [
        'Reviewing lead and outreach context',
        'Preparing outreach',
        'Opening campaigns',
      ],
      response: 'Campaigns are open.',
    }
  }

  if (lower.includes('consent') || lower.includes('form') || lower.includes('signature')) {
    return {
      route: '/forms',
      title: 'Preparing forms and consents',
      steps: [
        'Reading the active form requirements',
        'Preparing consents',
        'Opening forms',
      ],
      response: 'Forms and consents are open.',
    }
  }

  if (lower.includes('prescription') || lower.includes('medicine') || lower.includes('rx')) {
    return {
      route: '/prescriptions',
      title: 'Opening prescriptions',
      steps: [
        'Reviewing medication-related intent',
        'Preparing prescriptions',
        'Opening prescriptions',
      ],
      response: 'Prescriptions are open.',
    }
  }

  if (lower.includes('setting') || lower.includes('clinic profile') || lower.includes('config')) {
    return {
      route: '/settings',
      title: 'Opening settings',
      steps: [
        'Checking clinic configuration intent',
        'Preparing settings',
        'Opening settings',
      ],
      response: 'Settings are open.',
    }
  }

  if (lower.includes('whatsapp') || lower.includes('template')) {
    return {
      route: '/wa-templates',
      title: 'Opening WhatsApp templates',
      steps: [
        'Understanding the message-template request',
        'Preparing templates',
        'Opening WhatsApp templates',
      ],
      response: 'WhatsApp templates are open.',
    }
  }

  if (lower.includes('channel')) {
    return {
      route: '/channels',
      title: 'Opening channels',
      steps: [
        'Reviewing communication channel intent',
        'Preparing channels',
        'Opening channels',
      ],
      response: 'Channels are open.',
    }
  }

  if (lower.includes('ai agent') || lower.includes('assistant')) {
    return {
      route: '/ai-agents',
      title: 'Opening AI agents',
      steps: [
        'Reviewing assistant-related intent',
        'Preparing AI tools',
        'Opening AI agents',
      ],
      response: 'AI agents are open.',
    }
  }

  return baseIntent
}

function buildMessages(prompt: string, intent: DemoIntent) {
  return [
    {
      id: `system-${Date.now()}`,
      role: 'system' as const,
      text: intent.title,
    },
    {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant' as const,
      text: `Working on "${prompt}".`,
    },
  ]
}

export default function AssistantDemo() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'assistant-welcome',
      role: 'assistant',
      text: 'What do you want to do?',
    },
  ])
  const [screenPulse, setScreenPulse] = useState(false)
  const timersRef = useRef<number[]>([])
  const bodyRef = useRef<HTMLDivElement | null>(null)

  const clearDemoTimers = () => {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current = []
  }

  const closeAssistant = () => {
    clearDemoTimers()
    setIsOpen(false)
    setScreenPulse(false)
    setIsProcessing(false)
    setProcessingStep('')
  }

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isProcessing])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAssistant()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      clearDemoTimers()
    }
  }, [])

  const queueStep = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  const runDemo = (prompt: string) => {
    const trimmed = prompt.trim()
    if (!trimmed || isProcessing) return

    const intent = inferIntent(trimmed)
    clearDemoTimers()
    setIsOpen(true)
    setInput('')
    setIsProcessing(true)
    setScreenPulse(true)
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
      ...buildMessages(trimmed, intent),
    ])

    setProcessingStep(intent.steps[0])

    queueStep(() => {
      setProcessingStep(intent.steps[1] ?? intent.steps[0])
    }, 900)

    queueStep(() => {
      setProcessingStep(intent.steps[2] ?? intent.steps[1] ?? intent.steps[0])
      if (location.pathname !== intent.route) {
        navigate(intent.route)
      }
    }, 1900)

    queueStep(() => {
      setIsProcessing(false)
      setScreenPulse(false)
      setProcessingStep('')
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-result-${Date.now()}`,
          role: 'assistant',
          text: intent.response,
        },
      ])
    }, 3200)
  }

  return (
    <>
      <button
        type="button"
        className={`assistant-launcher ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open assistant"
      >
        <div className="assistant-launcher__icon">
          <Sparkles size={16} color="#0f172a" />
        </div>
      </button>

      <div className={`assistant-screen-glow ${screenPulse ? 'is-active' : ''}`} aria-hidden="true">
        <div className="assistant-screen-glow__beam" />
        <div className="assistant-screen-glow__badge">
          <LoaderCircle size={16} className={screenPulse ? 'assistant-spin' : ''} />
          <span>Reading screen</span>
        </div>
      </div>

      <div className={`assistant-panel-backdrop ${isOpen ? 'is-visible' : ''}`} onClick={closeAssistant} />

      <aside className={`assistant-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="assistant-panel__header">
          <div>
            <p className="assistant-panel__eyebrow">Assistant</p>
            <h2>How can I help?</h2>
          </div>
          <button type="button" className="assistant-icon-button" onClick={closeAssistant} aria-label="Close assistant">
            <X size={18} />
          </button>
        </div>

        <div className="assistant-panel__subheader">
          <div className="assistant-status-pill">
            <Bot size={14} />
            <span>{isProcessing ? 'Working' : 'Ready'}</span>
          </div>
        </div>

        <div ref={bodyRef} className="assistant-panel__messages">
          {messages.map(message => (
            <div key={message.id} className={`assistant-message assistant-message--${message.role}`}>
              <p>{message.text}</p>
            </div>
          ))}

          {isProcessing && (
            <div className="assistant-message assistant-message--assistant">
              <div className="assistant-typing">
                <span />
                <span />
                <span />
              </div>
              <p>{processingStep}</p>
            </div>
          )}
        </div>

        <div className="assistant-panel__prompts">
          {quickPrompts.map(prompt => (
            <button key={prompt} type="button" className="assistant-chip" onClick={() => runDemo(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="assistant-panel__composer"
          onSubmit={event => {
            event.preventDefault()
            runDemo(input)
          }}
        >
          <textarea
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="Type a request..."
            rows={3}
          />
          <button type="submit" disabled={!input.trim() || isProcessing}>
            <span>{isProcessing ? 'Working' : 'Send'}</span>
            <ChevronRight size={16} />
          </button>
        </form>
      </aside>
    </>
  )
}
