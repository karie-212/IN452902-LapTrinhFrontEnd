import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { getClubs } from '../../../features/clubs/api/clubs.server'
import { getEvents } from '../../../features/events/api/events.server'
import { EventFilters } from '../../../features/events/components/EventFilters'
import { EventList } from '../../../features/events/components/EventList'
import { totalPages } from '../../../shared/api/pagination'
import { startOfCurrentHour } from '../../../shared/lib/time'
import { PageContainer } from '../../../shared/ui/PageContainer'
import { Pagination } from '../../../shared/ui/Pagination'
import { Spinner } from '../../../shared/ui/Spinner'

export const metadata: Metadata = {
  title: 'Lịch sự kiện',
  description: 'Lịch sự kiện của các câu lạc bộ sinh viên Trường Đại học Đồng Tháp, học kỳ I năm học 2026–2027.',
}

const PAGE_SIZE = 9

export default function EventsPage({ searchParams }: PageProps<'/events'>) {
  return (
    <PageContainer>
      <h1>Lịch sự kiện</h1>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        Học kỳ I, năm học 2026–2027. Sự kiện có nhãn <strong>Sắp hết chỗ</strong> chỉ còn dưới 20% số chỗ — đăng ký
        sớm nhé.
      </p>
      {/* searchParams là dữ liệu theo request → đọc bên trong Suspense, phần trên vẫn là HTML tĩnh */}
      <Suspense fallback={<Spinner label="Đang tải sự kiện…" />}>
        <EventsResults searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  )
}

// TODO(ch6-T2): Server Component hiển thị kết quả theo URL /events?q=&clubId=&past=1&page=
//  1. const params = await searchParams; đọc q, clubId, past ('1'), page (mặc định 1)
//  2. await connection() rồi const now = new Date()  (thời điểm request, không phải lúc build)
//  3. Promise.all([getEvents({ q, clubId, from: past ? undefined : startOfCurrentHour(now), page, pageSize: PAGE_SIZE }), getClubs()])
//  4. Render: <EventFilters …/>, <p role="status">Tìm thấy {totalCount} sự kiện</p>, <EventList …/>,
//     <Pagination page totalPages={totalPages(events)} hrefFor={(p) => `/events?…&page=${p}`} />
// Kiểm chứng: e2e/events.spec.ts
async function EventsResults({ searchParams }: Pick<PageProps<'/events'>, 'searchParams'>) {
  void [searchParams, connection, getEvents, getClubs, startOfCurrentHour, totalPages, PAGE_SIZE, EventFilters, EventList, Pagination]
  return <p>TODO(ch6-T2): hiển thị danh sách sự kiện</p>
}
