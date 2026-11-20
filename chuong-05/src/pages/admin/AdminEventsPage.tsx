import { Link, useSearchParams } from 'react-router'
import { useClubs } from '../../features/clubs/hooks/use-clubs'
import { useDeleteEvent, useEvents } from '../../features/events/hooks/use-events'
import { errorMessage } from '../../shared/api/api-error'
import { totalPages } from '../../shared/api/pagination'
import { formatDateTime } from '../../shared/lib/format'
import { Button, ButtonLink } from '../../shared/ui/Button'
import { ErrorState } from '../../shared/ui/ErrorState'
import { PageContainer } from '../../shared/ui/PageContainer'
import { Pagination } from '../../shared/ui/Pagination'
import { Spinner } from '../../shared/ui/Spinner'
import { toast } from '../../shared/ui/toast'

export function AdminEventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const events = useEvents({ page, pageSize: 10 })
  const clubs = useClubs()
  const deleteEvent = useDeleteEvent()

  function handleDelete(id: string, title: string) {
    if (!window.confirm(`Xoá sự kiện "${title}"? Mọi đăng ký của sự kiện cũng bị xoá.`)) return
    deleteEvent.mutate(id, {
      onSuccess: () => toast('Đã xoá sự kiện.', 'success'),
      onError: (error) => toast(errorMessage(error), 'error'),
    })
  }

  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1>Quản lý sự kiện</h1>
        <ButtonLink to="/admin/events/new">+ Tạo sự kiện</ButtonLink>
      </div>
      {events.isPending ? (
        <Spinner />
      ) : events.isError ? (
        <ErrorState error={events.error} onRetry={() => events.refetch()} />
      ) : (
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
                {events.data.items.map((e) => (
                  <tr key={e.id} className="border-t border-line">
                    <td className="p-3 font-semibold">
                      <Link to={`/events/${e.id}`} className="hover:text-primary">
                        {e.title}
                      </Link>
                    </td>
                    <td className="p-3">{clubs.data?.find((c) => c.id === e.clubId)?.name}</td>
                    <td className="p-3 whitespace-nowrap">{formatDateTime(e.startAt)}</td>
                    <td className="p-3">
                      <Link to={`/admin/events/${e.id}/registrations`} className="text-primary underline">
                        {e.registeredCount}/{e.capacity}
                      </Link>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <ButtonLink variant="ghost" to={`/admin/events/${e.id}/edit`}>
                          Sửa
                        </ButtonLink>
                        <Button variant="ghost" disabled={deleteEvent.isPending} onClick={() => handleDelete(e.id, e.title)}>
                          Xoá
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages(events.data)}
            onChange={(p) => setSearchParams({ page: String(p) })}
          />
        </>
      )}
    </PageContainer>
  )
}
