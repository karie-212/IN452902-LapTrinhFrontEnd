import { useState } from 'react'
import { ClubFilter } from '../features/clubs/components/ClubFilter'
import { useClubs } from '../features/clubs/hooks/use-clubs'
import { EventList } from '../features/events/components/EventList'
import { SearchBar } from '../features/events/components/SearchBar'
import { useEvents } from '../features/events/hooks/use-events'
import { ErrorState } from '../shared/ui/ErrorState'
import { PageContainer } from '../shared/ui/PageContainer'
import { Spinner } from '../shared/ui/Spinner'

const PAGE_SIZE = 9

export function EventsPage() {
  // TODO(ch5-T4): đưa bộ lọc lên URL bằng useSearchParams (react-router):
  //   /events?q=hien+mau&clubId=<id>&past=1&page=2 — dán link vào tab mới phải ra đúng kết quả.
  //   - Đọc q, clubId, past ('1' = hiện cả sự kiện đã qua), page (mặc định 1) từ searchParams
  //   - Gọi useEvents({ q, clubId, from: past ? undefined : now, page, pageSize: PAGE_SIZE })
  //   - SearchBar.onSearch, ClubFilter.onChange, checkbox: cập nhật URL (đổi bộ lọc → bỏ page để về trang 1)
  //   - Dưới danh sách: <Pagination page totalPages={totalPages(events.data)} onChange …/> (shared/ui, shared/api/pagination)
  //   - Khi đang tải trang mới (events.isPlaceholderData) làm mờ danh sách cũ
  // Test: src/pages/pages.test.tsx ("lọc CLB thì URL đổi theo")
  const [now] = useState(() => new Date())
  const events = useEvents({ from: now, page: 1, pageSize: PAGE_SIZE })
  const clubs = useClubs()

  return (
    <PageContainer>
      <h1>Lịch sự kiện</h1>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        Học kỳ I, năm học 2026–2027. Sự kiện có nhãn <strong>Sắp hết chỗ</strong> chỉ còn dưới 20% số chỗ — đăng ký
        sớm nhé.
      </p>

      <div className="mb-6 grid gap-4 rounded-md border border-line bg-surface p-4 sm:grid-cols-[2fr_1fr]">
        <SearchBar defaultValue="" onSearch={() => {}} />
        <ClubFilter clubs={clubs.data ?? []} value="" onChange={() => {}} />
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" checked={false} onChange={() => {}} className="size-4.5 accent-primary" />
          Hiện cả sự kiện đã diễn ra
        </label>
      </div>

      {events.isPending ? (
        <Spinner label="Đang tải sự kiện…" />
      ) : events.isError ? (
        <ErrorState error={events.error} onRetry={() => events.refetch()} />
      ) : (
        <>
          <p role="status" className="mb-4 text-sm text-ink-muted">
            Tìm thấy {events.data.totalCount} sự kiện
          </p>
          <EventList events={events.data.items} clubs={clubs.data ?? []} now={now} />
        </>
      )}
    </PageContainer>
  )
}
