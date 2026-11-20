import { isPast } from '../lib/events'
import type { EventItem } from '../types'
import { EventCard } from './EventCard'

type EventListProps = {
  events: EventItem[]
  now: Date
}

export function EventList({ events, now }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-line bg-surface p-8 text-center text-ink-muted">
        Không có sự kiện nào phù hợp. Thử từ khoá khác hoặc chọn "Tất cả CLB".
      </p>
    )
  }

  return (
    // Lưới tự chia cột giống Ch02: mỗi cột ≥ 16rem, đủ chỗ thì thêm cột
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
      {events.map((event) => (
        // key giúp React nhận ra phần tử nào thêm/bớt khi danh sách đổi
        <li key={event.id} className="grid">
          <EventCard event={event} past={isPast(event, now)} />
        </li>
      ))}
    </ul>
  )
}
