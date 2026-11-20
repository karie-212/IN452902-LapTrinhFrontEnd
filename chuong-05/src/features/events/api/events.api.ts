import { httpClient } from '../../../shared/api/http-client'
import { pagedSchema, type Paged } from '../../../shared/api/pagination'
import { parseResponse } from '../../../shared/api/parse'
import { eventDtoSchema } from '../dto/event.dto'
import type { EventItem, EventQuery } from '../model/event'
import type { EventFormValues } from '../model/event-form.schema'
import { toCreateEventDto, toEvent, toEventQueryDto } from '../model/event.mapper'

// Tầng api: biết URL và DTO; trả về MODEL cho tầng hook. Không biết gì về React.
export const eventsApi = {
  // TODO(ch5-T3): GET /api/events với params = toEventQueryDto(query), truyền signal để huỷ được.
  //   Kiểm tra res.data bằng parseResponse(pagedSchema(eventDtoSchema), …) rồi map items bằng toEvent.
  //   Mẫu: clubsApi.list trong features/clubs/api/clubs.api.ts
  async list(query: EventQuery, signal?: AbortSignal): Promise<Paged<EventItem>> {
    void [query, signal, httpClient, pagedSchema, parseResponse, eventDtoSchema, toEventQueryDto]
    throw new Error('TODO(ch5-T3): viết eventsApi.list')
  },

  // TODO(ch5-T3): GET /api/events/{id} → parseResponse(eventDtoSchema, …) → toEvent
  async getById(id: string, signal?: AbortSignal): Promise<EventItem> {
    void [id, signal]
    throw new Error('TODO(ch5-T3): viết eventsApi.getById')
  },

  // TODO(ch5-T6): POST /api/events, body = toCreateEventDto(values); server trả 201 + EventDto → toEvent
  async create(values: EventFormValues): Promise<EventItem> {
    void [values, toCreateEventDto, toEvent]
    throw new Error('TODO(ch5-T6): viết eventsApi.create')
  },

  // TODO(ch5-T6): PUT /api/events/{id}, body = toCreateEventDto(values); server trả 204 (không có body)
  async update(id: string, values: EventFormValues): Promise<void> {
    void [id, values]
    throw new Error('TODO(ch5-T6): viết eventsApi.update')
  },

  // TODO(ch5-T6): DELETE /api/events/{id} (204)
  async remove(id: string): Promise<void> {
    void id
    throw new Error('TODO(ch5-T6): viết eventsApi.remove')
  },
}
