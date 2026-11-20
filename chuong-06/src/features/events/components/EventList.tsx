import { EmptyState } from '../../../shared/ui/EmptyState'
import type { Club } from '../../clubs/model/club'
import { isPast, type EventItem } from '../model/event'
import { EventCard } from './EventCard'

type EventListProps = {
  events: EventItem[]
  clubs: Club[]
  now: Date
}

export function EventList({ events, clubs, now }: EventListProps) {
  if (events.length === 0) {
    return <EmptyState>Không có sự kiện nào phù hợp. Thử từ khoá khác hoặc chọn &quot;Tất cả CLB&quot;.</EmptyState>
  }
  const clubById = new Map(clubs.map((club) => [club.id, club]))
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-6">
      {events.map((event) => (
        <li key={event.id} className="grid">
          <EventCard event={event} club={clubById.get(event.clubId)} past={isPast(event, now)} />
        </li>
      ))}
    </ul>
  )
}
