import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useClubs } from '../features/clubs/hooks/use-clubs'
import { getClubImage } from '../features/clubs/model/club'
import { useEvent } from '../features/events/hooks/use-events'
import { isPast, seatsLeft } from '../features/events/model/event'
import { RegisterEventButton } from '../features/registrations/components/RegisterEventButton'
import { isApiError } from '../shared/api/api-error'
import { formatDateTime } from '../shared/lib/format'
import { ErrorState } from '../shared/ui/ErrorState'
import { PageContainer } from '../shared/ui/PageContainer'
import { Spinner } from '../shared/ui/Spinner'
import { NotFoundPage } from './NotFoundPage'

export function EventDetailPage() {
  const { eventId = '' } = useParams()
  const event = useEvent(eventId)
  const clubs = useClubs()
  const [now] = useState(() => new Date())

  if (event.isPending) return <Spinner label="Đang tải sự kiện…" />
  if (event.isError) {
    if (isApiError(event.error) && event.error.code === 'not_found') {
      return <NotFoundPage message="Không tìm thấy sự kiện này. Có thể đường dẫn đã sai." />
    }
    return (
      <PageContainer narrow>
        <ErrorState error={event.error} onRetry={() => event.refetch()} />
      </PageContainer>
    )
  }

  const e = event.data
  const club = clubs.data?.find((c) => c.id === e.clubId)
  const left = seatsLeft(e)
  const past = isPast(e, now)

  return (
    <PageContainer>
      <article className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-x-8">
        <header className="lg:col-span-2">
          <Link to="/events" className="text-primary underline underline-offset-4">
            ← Quay lại lịch sự kiện
          </Link>
          <h1 className="mt-3">{e.title}</h1>
          {club && (
            <p className="mt-2 text-ink-muted">
              Do <strong className="text-ink">{club.name}</strong> tổ chức
            </p>
          )}
        </header>

        <div className="grid gap-6">
          <img
            src={getClubImage(e.clubId)}
            alt={`Biểu tượng ${club?.name ?? 'câu lạc bộ'}`}
            width={640}
            height={360}
            className="aspect-video w-full rounded-md object-cover"
          />
          <section aria-labelledby="noi-dung-su-kien">
            <h2 id="noi-dung-su-kien" className="mb-3">
              Nội dung
            </h2>
            <p>{e.description}</p>
          </section>
        </div>

        <section
          aria-labelledby="thong-tin"
          className="self-start rounded-md border border-line bg-surface p-6 shadow-md lg:sticky lg:top-24"
        >
          <h2 id="thong-tin" className="mb-4 text-xl">
            Thông tin chung
          </h2>
          <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold">Thời gian</dt>
            <dd>
              <time dateTime={e.startAt.toISOString()}>{formatDateTime(e.startAt)}</time>
            </dd>
            <dt className="font-semibold">Địa điểm</dt>
            <dd>{e.location}</dd>
            <dt className="font-semibold">Số chỗ</dt>
            <dd>
              {e.capacity} (còn {left} chỗ)
            </dd>
          </dl>
          {past ? (
            <p className="font-semibold text-ink-muted">Sự kiện đã diễn ra.</p>
          ) : (
            <RegisterEventButton eventId={e.id} disabled={left === 0} />
          )}
        </section>
      </article>
    </PageContainer>
  )
}
