import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { isApiError } from '../../../shared/api/api-error'
import { pagedSchema, type Paged } from '../../../shared/api/pagination'
import { serverFetch } from '../../../shared/api/server-fetch'
import { eventDtoSchema } from '../dto/event.dto'
import type { EventItem, EventQuery } from '../model/event'
import { toEvent, toEventQueryDto } from '../model/event.mapper'

// Dùng ở Server Component. DTO, Zod schema, mapper giữ nguyên từ Ch05 — chỉ đổi "đường ống" HTTP.
// TODO(ch6-T2): lấy danh sách sự kiện ở server và lưu cache.
//  - Dòng đầu thân hàm: 'use cache'; rồi cacheLife('minutes') và cacheTag('events')
//  - serverFetch('/api/events', pagedSchema(eventDtoSchema), { query: toEventQueryDto(query) })
//  - map items bằng toEvent (mapper Ch05)
export async function getEvents(query: EventQuery): Promise<Paged<EventItem>> {
  void [query, cacheLife, cacheTag, serverFetch, pagedSchema, eventDtoSchema, toEventQueryDto, toEvent]
  throw new Error('TODO(ch6-T2): viết getEvents')
}

// TODO(ch6-T3): lấy một sự kiện ('use cache', cacheLife('minutes'), cacheTag('events', `event-${id}`)).
//  serverFetch(`/api/events/${id}`, eventDtoSchema) → toEvent. Lỗi ApiError 'not_found' → return null
//  (trang sẽ gọi notFound()); lỗi khác ném tiếp cho error.tsx.
export async function getEvent(id: string): Promise<EventItem | null> {
  void [id, isApiError]
  throw new Error('TODO(ch6-T3): viết getEvent')
}
