// Model sự kiện dùng trong giao diện. Khác DTO: title thay name, Date thay chuỗi ISO.
// (Đặt tên EventItem để không trùng kiểu Event có sẵn của DOM.)
export type EventItem = {
  id: string
  title: string
  description: string
  clubId: string
  location: string
  startAt: Date
  capacity: number
  registeredCount: number
  createdAt: Date
}

// Bộ lọc trang Sự kiện — giá trị nằm trên URL (?q=&clubId=&page=)
export type EventQuery = {
  q?: string
  clubId?: string
  from?: Date // chỉ lấy sự kiện từ thời điểm này
  page: number
  pageSize: number
}

export function seatsLeft(event: EventItem): number {
  return Math.max(0, event.capacity - event.registeredCount)
}

// "Sắp hết chỗ": còn chỗ nhưng ít hơn 20% sức chứa (quy ước từ Ch02)
export function isAlmostFull(event: EventItem): boolean {
  const left = seatsLeft(event)
  return left > 0 && left < event.capacity * 0.2
}

export function isPast(event: EventItem, now: Date): boolean {
  return event.startAt < now
}
