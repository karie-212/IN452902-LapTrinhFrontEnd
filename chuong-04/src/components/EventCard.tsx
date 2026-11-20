import type { EventItem } from '../types'

type EventCardProps = {
  event: EventItem
  past?: boolean // sự kiện đã diễn ra → làm mờ, không hiện số chỗ
}

// TODO(ch4-T1): Dựng card sự kiện giống .event-card của Ch02 bằng class Tailwind:
//  - Ảnh CLB: getClubImage(event.clubId), alt "Biểu tượng <tên CLB>" (findClub trong ../data)
//  - Nhãn tên CLB; nhãn "Sắp hết chỗ" (isAlmostFull), "Hết chỗ" (seatsLeft = 0), "Đã diễn ra" (past)
//  - Tên sự kiện là <Link to={`/events/${event.id}`}> phủ cả card (after:absolute after:inset-0)
//  - <time dateTime=…>{formatEventTime(event.startTime)}</time> · địa điểm; mô tả
//  - Chưa diễn ra thì có dòng "Còn x/y chỗ" ở đáy card
//  Chạy `npm run test:watch` để xem src/components/EventCard.test.tsx chuyển xanh.
export function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-md border border-line bg-surface p-6">
      <h3 className="text-lg font-bold">{event.name}</h3>
    </article>
  )
}
