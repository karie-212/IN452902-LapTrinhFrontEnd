import { z } from 'zod'

// EventDto: đúng tên trường và kiểu mà server gửi về (contract mock API — xem mock-api/README.md)
export type EventDto = {
  id: string
  name: string
  description: string
  clubId: string
  location: string
  startTime: string // chuỗi ISO-8601 UTC, vd. "2026-12-19T01:00:00.000Z"
  capacity: number
  createdAt: string
  registeredCount: number
}

// TODO(ch5-T3): viết schema Zod cho EventDto (xem mẫu clubDtoSchema trong features/clubs/dto/club.dto.ts):
//   id, clubId: z.uuid(); startTime, createdAt: z.iso.datetime(); capacity: z.int().positive();
//   registeredCount: z.int().nonnegative(); còn lại z.string().
//   Xong thì có thể thay kiểu EventDto ở trên bằng: export type EventDto = z.infer<typeof eventDtoSchema>
// Test: event.mapper.test.ts ("eventDtoSchema chặn JSON sai contract")
export const eventDtoSchema: z.ZodType<EventDto> = z.any()

// Body của POST/PUT /api/events
export type CreateEventDto = {
  name: string
  description: string
  clubId: string
  location: string
  startTime: string
  capacity: number
}

// Tham số query của GET /api/events
export type EventQueryDto = {
  q?: string
  clubId?: string
  from?: string
  page: number
  pageSize: number
}
