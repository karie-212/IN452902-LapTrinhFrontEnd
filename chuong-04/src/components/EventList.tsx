import type { EventItem } from '../types'

type EventListProps = {
  events: EventItem[]
  now: Date
}

// TODO(ch4-T2): Render danh sách <EventCard> bằng events.map(...) với key={event.id},
//  truyền past={isPast(event, now)}. Lưới tự chia cột giống .card-grid của Ch02:
//  grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))].
//  Mảng rỗng → hiện "Không có sự kiện nào phù hợp…".
export function EventList({ events, now }: EventListProps) {
  return (
    <p className="rounded-md border border-dashed border-line bg-surface p-8 text-center text-ink-muted">
      TODO(ch4-T2): hiện {events.length} sự kiện (mốc thời gian {now.toLocaleDateString('vi-VN')})
    </p>
  )
}
