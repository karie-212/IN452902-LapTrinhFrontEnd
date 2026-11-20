import { z } from 'zod'

// EventDto: đúng tên trường và kiểu mà server gửi về (contract mock API)
export const eventDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  clubId: z.uuid(),
  location: z.string(),
  startTime: z.iso.datetime(), // chuỗi ISO-8601 UTC, vd. "2026-12-19T01:00:00.000Z"
  capacity: z.int().positive(),
  createdAt: z.iso.datetime(),
  registeredCount: z.int().nonnegative(),
})

export type EventDto = z.infer<typeof eventDtoSchema>

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
