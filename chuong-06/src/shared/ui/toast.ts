import { create } from 'zustand'

// Thông báo nổi (toast) — trạng thái giao diện nên đặt ở Zustand
export type ToastTone = 'success' | 'error' | 'info'
export type Toast = { id: number; tone: ToastTone; message: string }

type ToastState = {
  toasts: Toast[]
  dismiss: (id: number) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

let nextId = 1

// Gọi được ở bất kỳ đâu (kể cả ngoài component, vd. trong onError của mutation)
export function toast(message: string, tone: ToastTone = 'info') {
  const id = nextId++
  useToastStore.setState((s) => ({ toasts: [...s.toasts, { id, tone, message }] }))
  setTimeout(() => useToastStore.getState().dismiss(id), 5000)
}
