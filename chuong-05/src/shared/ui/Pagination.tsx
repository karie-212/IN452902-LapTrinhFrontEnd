import { Button } from './Button'

type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Phân trang" className="mt-8 flex items-center justify-center gap-4">
      <Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Trang trước
      </Button>
      <span className="text-sm text-ink-muted">
        Trang {page}/{totalPages}
      </span>
      <Button variant="secondary" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Trang sau →
      </Button>
    </nav>
  )
}
