import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface Toast { id: string; message: string; type: 'success' | 'info' | 'error' }
interface ToastContextValue { showToast: (message: string, type?: Toast['type']) => void }

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} })
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '12px 16px', borderRadius: '8px', background: t.type === 'success' ? '#111' : t.type === 'error' ? '#EF4444' : '#3B82F6',
            color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '240px',
          }}>
            <span style={{ flex: 1 }}>{t.message}</span>
            <X size={14} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
