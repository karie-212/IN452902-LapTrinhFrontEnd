import type { ReactNode } from 'react'

export const inputClass =
  'min-h-11 w-full rounded-sm border border-line bg-bg px-3 py-2 focus-visible:border-accent-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/35 aria-invalid:border-danger'

type FormFieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

// Nhãn + ô nhập + dòng lỗi/gợi ý. Ô nhập nên có aria-describedby={`${id}-msg`}.
export function FormField({ id, label, error, hint, required = true, children }: FormFieldProps) {
  return (
    <div className="grid content-start gap-1">
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      <small id={`${id}-msg`} className={error ? 'text-sm font-semibold text-danger' : 'text-sm text-ink-muted'}>
        {error ?? hint}
      </small>
    </div>
  )
}
