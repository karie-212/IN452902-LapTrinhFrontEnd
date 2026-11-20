import Link from 'next/link'
import { buttonClass } from './button-styles'

type PaginationProps = {
  page: number
  totalPages: number
  hrefFor: (page: number) => string // trang là một phần của URL → dùng <Link>, render được trên server
}

export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Phân trang" className="mt-8 flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={buttonClass('secondary')}>
          ← Trang trước
        </Link>
      ) : (
        <span className={buttonClass('secondary', 'pointer-events-none opacity-40')}>← Trang trước</span>
      )}
      <span className="text-sm text-ink-muted">
        Trang {page}/{totalPages}
      </span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={buttonClass('secondary')}>
          Trang sau →
        </Link>
      ) : (
        <span className={buttonClass('secondary', 'pointer-events-none opacity-40')}>Trang sau →</span>
      )}
    </nav>
  )
}
