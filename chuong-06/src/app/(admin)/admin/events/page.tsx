import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getClubs } from '../../../../features/clubs/api/clubs.server'
import { getEvents } from '../../../../features/events/api/events.server'
import { DeleteEventButton } from '../../../../features/events/components/DeleteEventButton'
import { totalPages } from '../../../../shared/api/pagination'
import { formatDateTime } from '../../../../shared/lib/format'
import { buttonClass } from '../../../../shared/ui/button-styles'
import { PageContainer } from '../../../../shared/ui/PageContainer'
import { Pagination } from '../../../../shared/ui/Pagination'
import { Spinner } from '../../../../shared/ui/Spinner'

export const metadata: Metadata = { title: 'Quản lý sự kiện' }

export default function AdminEventsPage({ searchParams }: PageProps<'/admin/events'>) {
  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1>Quản lý sự kiện</h1>
        <Link href="/admin/events/new" className={buttonClass()}>
          + Tạo sự kiện
        </Link>
      </div>
      <Suspense fallback={<Spinner />}>
        <EventsTable searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  )
}

async function EventsTable({ searchParams }: Pick<PageProps<'/admin/events'>, 'searchParams'>) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  // Mới tạo lên đầu bảng: lấy theo thời gian bắt đầu, 20 dòng mỗi trang
  const [events, clubs] = await Promise.all([getEvents({ page, pageSize: 20 }), getClubs()])

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted">
            <tr>
              <th className="p-3">Tên sự kiện</th>
              <th className="p-3">CLB</th>
              <th className="p-3">Thời gian</th>
              <th className="p-3">Đăng ký</th>
              <th className="p-3">
                <span className="sr-only">Thao tác</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.items.map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="p-3 font-semibold">
                  <Link href={`/events/${e.id}`} className="hover:text-primary">
                    {e.title}
                  </Link>
                </td>
                <td className="p-3">{clubs.find((c) => c.id === e.clubId)?.name}</td>
                <td className="p-3 whitespace-nowrap">{formatDateTime(e.startAt)}</td>
                <td className="p-3">
                  {e.registeredCount}/{e.capacity}
                </td>
                <td className="p-3 text-right">
                  <DeleteEventButton eventId={e.id} title={e.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages(events)} hrefFor={(p) => `/admin/events?page=${p}`} />
    </>
  )
}
