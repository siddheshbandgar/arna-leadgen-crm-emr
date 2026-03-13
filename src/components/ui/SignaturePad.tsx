import { useRef, useEffect, useState } from 'react'

interface SignaturePadProps {
  onSave?: (dataUrl: string) => void
  savedSignature?: string
}

export default function SignaturePad({ onSave, savedSignature }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#111111'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (savedSignature) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = savedSignature
      setIsEmpty(false)
      setSaved(true)
    }
  }, [savedSignature])

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: ((e as MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as MouseEvent).clientY - rect.top) * scaleY,
    }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true
    setSaved(false)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsEmpty(false)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return
    e.preventDefault()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const endDraw = () => {
    isDrawingRef.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    setSaved(false)
  }

  const save = () => {
    const canvas = canvasRef.current!
    const dataUrl = canvas.toDataURL('image/png')
    onSave?.(dataUrl)
    setSaved(true)
  }

  return (
    <div>
      <div style={{ border: '1px solid #D1D5DB', borderRadius: '8px', background: '#FAFAFA', overflow: 'hidden', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          style={{ display: 'block', width: '100%', height: '150px', cursor: 'crosshair' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {isEmpty && (
          <div style={{ position: 'absolute', pointerEvents: 'none', color: '#9CA3AF', fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            Sign here
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
        <button type="button" onClick={clear} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Clear</button>
        <button type="button" onClick={save} disabled={isEmpty} style={{ padding: '6px 14px', fontSize: '13px', background: isEmpty ? '#9CA3AF' : '#111111', color: 'white', border: 'none', borderRadius: '6px', cursor: isEmpty ? 'default' : 'pointer' }}>Save Signature</button>
        {saved && <span style={{ fontSize: '13px', color: '#10B981', fontWeight: '500' }}>Signature saved</span>}
      </div>
    </div>
  )
}
