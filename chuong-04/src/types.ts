// Kiểu dữ liệu giữ đúng tên trường của contract mock API (ClubDto, EventDto).
// Ch05 thay dữ liệu tĩnh bằng API thật mà không phải đổi component.

export type Club = {
  id: string
  name: string
  description: string
  presidentId: string | null
  createdAt: string // ISO-8601 UTC
}

export type EventItem = {
  id: string
  name: string
  description: string
  clubId: string
  location: string
  startTime: string // ISO-8601 UTC
  capacity: number
  createdAt: string
  registeredCount: number
}

// Bộ lọc trên trang Sự kiện: '' nghĩa là "không lọc"
export type EventFilter = {
  query: string
  clubId: string
  includePast: boolean // false → ẩn sự kiện đã diễn ra
}
