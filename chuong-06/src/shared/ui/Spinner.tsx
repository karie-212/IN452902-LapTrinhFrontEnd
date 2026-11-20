export function Spinner({ label = 'Đang tải…' }: { label?: string }) {
  return (
    <p role="status" className="flex items-center justify-center gap-3 py-10 text-ink-muted">
      <span aria-hidden="true" className="size-6 animate-spin rounded-full border-3 border-line border-t-primary" />
      {label}
    </p>
  )
}
