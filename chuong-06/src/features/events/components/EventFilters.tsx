'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import type { Club } from '../../clubs/model/club'

type EventFiltersProps = {
  clubs: Club[]
  q: string
  clubId: string
  past: boolean
}

const fieldClass =
  'min-h-11 w-full rounded-sm border border-line bg-surface px-3 py-2 focus-visible:border-accent-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/35'

// Client Component: chỉ phần cần tương tác (gõ, chọn) chạy ở trình duyệt.
// Đổi bộ lọc = đổi URL → Server Component của trang tự lấy dữ liệu mới.
export function EventFilters({ clubs, q, clubId, past }: EventFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function update(changes: Record<string, string>) {
    const params = new URLSearchParams({ q, clubId, past: past ? '1' : '', ...changes })
    for (const [key, value] of [...params]) if (!value) params.delete(key)
    startTransition(() => router.push(params.size ? `${pathname}?${params}` : pathname))
  }

  return (
    <div className="mb-6 grid gap-4 rounded-md border border-line bg-surface p-4 sm:grid-cols-[2fr_1fr]" aria-busy={isPending}>
      <form
        role="search"
        className="grid gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          update({ q: String(new FormData(e.currentTarget).get('q') ?? '').trim() })
        }}
      >
        <label htmlFor="search" className="font-semibold">
          Tìm theo tên
        </label>
        <div className="flex gap-2">
          <input id="search" name="q" type="search" key={q} defaultValue={q} placeholder="Ví dụ: hiến máu, hackathon…" className={fieldClass} />
          <button type="submit" className="min-h-11 rounded-sm bg-primary px-4 font-semibold text-on-primary hover:bg-primary-hover">
            Tìm
          </button>
        </div>
      </form>
      <div className="grid gap-1">
        <label htmlFor="club-filter" className="font-semibold">
          Câu lạc bộ
        </label>
        {/* Uncontrolled (defaultValue + key): đổi lựa chọn hiện ngay, không chờ server trả trang mới */}
        <select
          id="club-filter"
          key={clubId}
          defaultValue={clubId}
          onChange={(e) => update({ clubId: e.target.value })}
          className={fieldClass}
        >
          <option value="">Tất cả CLB</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2 sm:col-span-2">
        <input
          type="checkbox"
          key={String(past)}
          defaultChecked={past}
          onChange={(e) => update({ past: e.target.checked ? '1' : '' })}
          className="size-4.5 accent-primary"
        />
        Hiện cả sự kiện đã diễn ra
      </label>
    </div>
  )
}
