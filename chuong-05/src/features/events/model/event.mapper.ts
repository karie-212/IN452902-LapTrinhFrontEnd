import type { CreateEventDto, EventDto, EventQueryDto } from '../dto/event.dto'
import type { EventItem, EventQuery } from './event'
import type { EventFormInput, EventFormValues } from './event-form.schema'

// Mapper: chỗ DUY NHẤT biết tên trường của server. Đổi backend → chỉ sửa DTO + mapper.
export function toEvent(dto: EventDto): EventItem {
  // TODO(ch5-T3): DTO → model. name → title; startTime, createdAt (chuỗi ISO) → Date; các trường khác giữ nguyên.
  // Test: event.mapper.test.ts
  void dto
  throw new Error('TODO(ch5-T3): viết toEvent')
}

export function toCreateEventDto(values: EventFormValues): CreateEventDto {
  // TODO(ch5-T3): giá trị form → body gửi server. title → name (trim); startAt (Date) → startTime (toISOString());
  // description, location: trim; clubId, capacity giữ nguyên.
  void values
  throw new Error('TODO(ch5-T3): viết toCreateEventDto')
}

export function toEventQueryDto(query: EventQuery): EventQueryDto {
  return {
    ...(query.q ? { q: query.q } : {}),
    ...(query.clubId ? { clubId: query.clubId } : {}),
    ...(query.from ? { from: query.from.toISOString() } : {}),
    page: query.page,
    pageSize: query.pageSize,
  }
}

// Model → giá trị mặc định của form sửa sự kiện
export function toEventFormInput(event: EventItem): EventFormInput {
  return {
    title: event.title,
    description: event.description,
    clubId: event.clubId,
    location: event.location,
    startAt: toDateTimeLocal(event.startAt),
    capacity: event.capacity,
  }
}

// Date → "YYYY-MM-DDTHH:mm" theo giờ máy, đúng định dạng của <input type="datetime-local">
function toDateTimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// Tên field lỗi server (DTO) → tên ô trong form (model)
export const eventFormFieldFromDto = {
  name: 'title',
  startTime: 'startAt',
  description: 'description',
  clubId: 'clubId',
  location: 'location',
  capacity: 'capacity',
} as const satisfies Record<keyof CreateEventDto, keyof EventFormInput>
