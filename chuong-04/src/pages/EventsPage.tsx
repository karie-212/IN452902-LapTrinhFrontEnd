import { useState } from 'react'
import { EventList } from '../components/EventList'
import { PageContainer } from '../components/PageContainer'
import { events } from '../data'
import { filterEvents } from '../lib/events'

export function EventsPage() {
  const [now] = useState(() => new Date())

  // TODO(ch4-T4):
  //  1. Tạo components/SearchBar.tsx (label "Tìm theo tên") và components/ClubFilter.tsx
  //     (label "Câu lạc bộ", option đầu "Tất cả CLB" có value="") — controlled input:
  //     nhận value + onChange qua props.
  //  2. Ở đây giữ state query, clubId, includePast (checkbox "Hiện cả sự kiện đã diễn ra").
  //  3. visibleEvents là DỮ LIỆU SUY RA từ state: gọi filterEvents ngay lúc render.
  //     Không useEffect, không useState thứ hai chứa danh sách đã lọc.
  //  4. Hiện <p role="status">Tìm thấy N sự kiện</p> phía trên danh sách.
  const visibleEvents = filterEvents(events, { query: '', clubId: '', includePast: false }, now)

  return (
    <PageContainer>
      <h1>Lịch sự kiện</h1>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        Học kỳ I, năm học 2026–2027. Sự kiện có nhãn <strong>Sắp hết chỗ</strong> chỉ còn dưới 20% số chỗ —
        đăng ký sớm nhé.
      </p>

      <search className="mb-6 grid gap-4 rounded-md border border-line bg-surface p-4 sm:grid-cols-[2fr_1fr]">
        {/* TODO(ch4-T4): <SearchBar … /> <ClubFilter … /> và checkbox */}
      </search>

      <EventList events={visibleEvents} now={now} />
    </PageContainer>
  )
}
