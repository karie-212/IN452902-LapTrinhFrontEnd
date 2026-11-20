import { useToastStore } from './toast'

const tones = {
  success: 'border-success text-success',
  error: 'border-danger text-danger',
  info: 'border-primary text-primary',
}

// Đặt một lần ở gốc ứng dụng; gọi toast('...') ở bất kỳ đâu để hiện thông báo
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)
  return (
    <div aria-live="polite" className="fixed right-4 bottom-4 z-50 grid w-[min(24rem,calc(100vw-2rem))] gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role={t.tone === 'error' ? 'alert' : 'status'}
          className={`flex items-start justify-between gap-3 rounded-md border-l-4 bg-surface p-4 font-semibold shadow-lg ${tones[t.tone]}`}
        >
          <span>{t.message}</span>
          <button type="button" aria-label="Đóng thông báo" onClick={() => dismiss(t.id)} className="text-ink-muted">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
