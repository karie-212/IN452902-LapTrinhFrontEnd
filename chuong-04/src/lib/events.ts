import type { EventFilter, EventItem } from '../types'

export function seatsLeft(event: EventItem): number {
  return Math.max(0, event.capacity - event.registeredCount)
}

// "Sắp hết chỗ": còn chỗ nhưng ít hơn 20% sức chứa (quy ước từ Ch02)
export function isAlmostFull(event: EventItem): boolean {
  const left = seatsLeft(event)
  return left > 0 && left < event.capacity * 0.2
}

export function isPast(event: EventItem, now: Date): boolean {
  return new Date(event.startTime) < now
}

// Hàm thuần: cùng đầu vào → cùng đầu ra. Component gọi trực tiếp lúc render,
// KHÔNG lưu kết quả vào state và KHÔNG cần useEffect.
export function filterEvents(events: EventItem[], filter: EventFilter, now: Date): EventItem[] {
  // Điều kiện đầu tiên đã làm mẫu.
  // TODO(ch4-T4): thêm 2 điều kiện và sắp xếp:
  //  - lọc theo filter.clubId ('' = mọi CLB)
  //  - tìm filter.query trong tên, không phân biệt hoa thường VÀ dấu
  //    (gợi ý: text.normalize('NFD').replace(/\p{Diacritic}/gu, ''), nhớ đổi 'đ' → 'd')
  //  - sắp xếp tăng dần theo startTime bằng toSorted (không sửa mảng gốc)
  //  Kiểm tra bằng src/lib/events.test.ts.
  return events.filter((event) => filter.includePast || !isPast(event, now))
}
