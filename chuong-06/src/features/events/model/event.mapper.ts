import type { CreateEventDto, EventDto, EventQueryDto } from '../dto/event.dto'
import type { EventItem, EventQuery } from './event'
import type { EventFormInput, EventFormValues } from './event-form.schema'

// Mapper: chỗ DUY NHẤT biết tên trường của server. Đổi backend → chỉ sửa DTO + mapper.
export function toEvent(dto: EventDto): EventItem {
  return {
    id: dto.id,
    title: dto.name,
    description: dto.description,
    clubId: dto.clubId,
    location: dto.location,
    startAt: new Date(dto.startTime),
    capacity: dto.capacity,
    registeredCount: dto.registeredCount,
    createdAt: new Date(dto.createdAt),
  }
}

export function toCreateEventDto(values: EventFormValues): CreateEventDto {
  return {
    name: values.title.trim(),
    description: values.description.trim(),
    clubId: values.clubId,
    location: values.location.trim(),
    startTime: values.startAt.toISOString(),
    capacity: values.capacity,
  }
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
