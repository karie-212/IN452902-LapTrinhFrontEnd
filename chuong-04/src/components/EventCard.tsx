import { Link } from 'react-router'
import { findClub, getClubImage } from '../data'
import { isAlmostFull, seatsLeft } from '../lib/events'
import { formatEventTime } from '../lib/format'
import type { EventItem } from '../types'

type EventCardProps = {
  event: EventItem
  past?: boolean // sự kiện đã diễn ra → làm mờ, không hiện số chỗ
}

export function EventCard({ event, past = false }: EventCardProps) {
  const club = findClub(event.clubId)
  const left = seatsLeft(event)
  const hot = !past && isAlmostFull(event)
  const full = !past && left === 0

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-surface shadow-sm transition duration-250 hover:-translate-y-1 hover:shadow-lg ${
        hot ? 'border-warning ring-1 ring-warning' : 'border-line'
      } ${past ? 'opacity-70' : ''}`}
    >
      <img
        src={getClubImage(event.clubId)}
        alt={`Biểu tượng ${club?.name ?? 'câu lạc bộ'}`}
        width={640}
        height={360}
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 px-6 pt-4 pb-6">
        <p className="flex flex-wrap items-center gap-2">
          {club && (
            <span className="rounded-full bg-surface-muted px-3 py-0.5 text-sm font-semibold text-primary">
              {club.name}
            </span>
          )}
          {hot && <Badge tone="warning">Sắp hết chỗ</Badge>}
          {full && <Badge tone="danger">Hết chỗ</Badge>}
          {past && <Badge tone="muted">Đã diễn ra</Badge>}
        </p>
        <h3 className="text-lg leading-tight font-bold">
          {/* after:absolute after:inset-0 → link phủ cả card, bấm đâu cũng mở */}
          <Link
            to={`/events/${event.id}`}
            className="text-ink group-hover:text-primary after:absolute after:inset-0"
          >
            {event.name}
          </Link>
        </h3>
        <p className="text-sm text-ink-muted">
          <time dateTime={event.startTime} className="font-semibold text-ink">
            {formatEventTime(event.startTime)}
          </time>{' '}
          · {event.location}
        </p>
        <p className="line-clamp-3 text-ink-muted">{event.description}</p>
        {!past && (
          <p
            className={`mt-auto border-t border-dashed border-line pt-3 text-sm font-semibold ${
              hot || full ? 'text-warning' : 'text-success'
            }`}
          >
            Còn {left}/{event.capacity} chỗ
          </p>
        )}
      </div>
    </article>
  )
}

const badgeTones = {
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-warning-soft text-danger',
  muted: 'bg-surface-muted text-ink-muted',
}

function Badge({ tone, children }: { tone: keyof typeof badgeTones; children: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-bold tracking-wide uppercase ${badgeTones[tone]}`}
    >
      {tone === 'warning' && (
        <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-current" />
      )}
      {children}
    </span>
  )
}
