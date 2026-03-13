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
  'Show today appointments',
  'Open billing and prepare invoice summary',
  'Find Priya Sharma and show profile',
  'Take me to consent forms',
]

const baseIntent: DemoIntent = {
  route: '/dashboard',
  title: 'Reviewing the workspace',
  steps: [
    'Scanning the current CRM screen',
    'Figuring out the best place to help from',
    'Preparing a demo action flow',
  ],
  response:
    'I reviewed the current workspace and I am ready to help. Try things like "show today appointments", "open billing", or "find a patient".',
}

function inferIntent(prompt: string): DemoIntent {
  const lower = prompt.toLowerCase()

  if (lower.includes('appointment') || lower.includes('schedule') || lower.includes('calendar')) {
    return {
      route: '/appointments',
      title: 'Opening appointments',
      steps: [
        'Reading the visible schedule',
        'Highlighting the appointment workflow',
        'Opening the weekly appointment board',
      ],
      response:
        'I opened the appointments view and focused on the scheduling workflow. In a real version I would also filter or reschedule directly from here.',
    }
  }

  if (lower.includes('patient') || lower.includes('priya') || lower.includes('rahul') || lower.includes('ananya')) {
    return {
      route: '/patients',
      title: 'Locating patient records',
      steps: [
        'Searching the patient list',
        'Matching the most likely patient record',
        'Bringing the patient workspace into view',
      ],
      response:
        'I moved to the patient area so it looks like I found the record for you. For the demo, I stop at navigation instead of editing patient data.',
    }
  }

  if (lower.includes('bill') || lower.includes('invoice') || lower.includes('payment') || lower.includes('revenue')) {
    return {
      route: '/billing',
      title: 'Opening billing',
      steps: [
        'Inspecting payments and invoice context',
        'Preparing a billing-focused view',
        'Switching to the billing workspace',
      ],
      response:
        'Billing is open. For the demo feel, I am pretending I prepared the invoice context and payment summary for you.',
    }
  }

  if (lower.includes('lead') || lower.includes('campaign') || lower.includes('marketing')) {
    return {
      route: '/campaigns',
      title: 'Setting up a campaign flow',
      steps: [
        'Reviewing lead and outreach context',
        'Choosing the campaign workspace',
        'Opening the marketing controls',
      ],
      response:
        'I opened the campaigns area and staged a marketing-style workflow. In a real assistant this could prefill audience filters and message drafts.',
    }
  }

  if (lower.includes('consent') || lower.includes('form') || lower.includes('signature')) {
    return {
      route: '/forms',
      title: 'Preparing forms and consents',
      steps: [
        'Reading the active form requirements',
        'Checking signature and consent context',
        'Opening the forms workspace',
      ],
      response:
        'I opened forms and consents and staged the handoff there. This demo is set up to feel like I am ready to collect signatures next.',
    }
  }

  if (lower.includes('prescription') || lower.includes('medicine') || lower.includes('rx')) {
    return {
      route: '/prescriptions',
      title: 'Opening prescriptions',
      steps: [
        'Reviewing medication-related intent',
        'Switching to the prescription module',
        'Preparing the medication workflow',
      ],
      response:
        'I opened the prescriptions page and prepared the medication workflow. For the demo, I am not generating a real prescription.',
    }
  }

  if (lower.includes('setting') || lower.includes('clinic profile') || lower.includes('config')) {
    return {
      route: '/settings',
      title: 'Opening settings',
      steps: [
        'Checking clinic configuration intent',
        'Finding the settings controls',
        'Opening the configuration screen',
      ],
      response:
        'I opened settings and staged the configuration area for you. This is demo-safe and does not change any stored setup.',
    }
  }

  if (lower.includes('whatsapp') || lower.includes('template')) {
    return {
      route: '/wa-templates',
      title: 'Opening WhatsApp templates',
      steps: [
        'Understanding the message-template request',
        'Finding the template workspace',
        'Opening WhatsApp template controls',
      ],
      response:
        'I opened the WhatsApp templates area so it feels like I am ready to draft or select a message template.',
    }
  }

  if (lower.includes('channel')) {
    return {
      route: '/channels',
      title: 'Opening channels',
      steps: [
        'Reviewing communication channel intent',
        'Finding the channel control center',
        'Opening the channels workspace',
      ],
      response:
        'I opened channels and staged the communication controls. In a real build this could connect live inboxes and channel status.',
    }
  }

  if (lower.includes('ai agent') || lower.includes('assistant')) {
    return {
      route: '/ai-agents',
      title: 'Opening AI agents',
      steps: [
        'Reviewing assistant-related intent',
        'Finding the AI workflow section',
        'Opening the AI agents screen',
      ],
      response:
        'I opened the AI agents area and staged the assistant workflow. Nice meta moment for the demo.',
    }
  }

  return baseIntent
}

function buildMessages(prompt: string, intent: DemoIntent) {
  return [
    {
      id: `system-${Date.now()}`,
      role: 'system' as const,
      text: `Demo mode: ${intent.title}`,
    },
    {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant' as const,
      text: `I understood: "${prompt}". I am taking screen context and handling it for you.`,
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
      text:
        'Ask me to do something in the CRM and I will fake-handle it for the demo. I can open pages, act like I understood the screen, and narrate what I am doing.',
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
          <span>Assistant is reading the screen</span>
        </div>
      </div>

      <div className={`assistant-panel-backdrop ${isOpen ? 'is-visible' : ''}`} onClick={closeAssistant} />

      <aside className={`assistant-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="assistant-panel__header">
          <div>
            <p className="assistant-panel__eyebrow">Demo Assistant</p>
            <h2>Ask it to do something</h2>
          </div>
          <button type="button" className="assistant-icon-button" onClick={closeAssistant} aria-label="Close assistant">
            <X size={18} />
          </button>
        </div>

        <div className="assistant-panel__subheader">
          <div className="assistant-status-pill">
            <Bot size={14} />
            <span>{isProcessing ? 'Taking screen control' : 'Ready for demo commands'}</span>
          </div>
          <p>
            This is intentionally fake automation. It can open relevant pages, narrate actions, and sell the demo experience.
          </p>
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
            placeholder="Type a request like: open billing, show patients, take me to appointments..."
            rows={3}
          />
          <button type="submit" disabled={!input.trim() || isProcessing}>
            <span>{isProcessing ? 'Working...' : 'Send'}</span>
            <ChevronRight size={16} />
          </button>
        </form>
      </aside>
    </>
  )
}
