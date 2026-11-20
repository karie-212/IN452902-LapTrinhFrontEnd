import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Paged } from '../../../shared/api/pagination'
import { eventsApi } from '../api/events.api'
import type { EventItem, EventQuery } from '../model/event'
import type { EventFormValues } from '../model/event-form.schema'

// Query key factory: mọi key của sự kiện sinh ra từ một chỗ → invalidate không gõ nhầm
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (query: EventQuery) => [...eventKeys.lists(), query] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
}

// TODO(ch5-T4): viết useEvents và useEvent bằng useQuery (mẫu: useClubs trong features/clubs/hooks/use-clubs.ts)
//  - useEvents: queryKey eventKeys.list(query); queryFn ({ signal }) => eventsApi.list(query, signal);
//    placeholderData: keepPreviousData (import từ @tanstack/react-query) để chuyển trang không nhấp nháy
//  - useEvent: queryKey eventKeys.detail(id); queryFn gọi eventsApi.getById(id, signal)
// Test: use-events.test.tsx
export function useEvents(query: EventQuery) {
  return useQuery({
    queryKey: eventKeys.list(query),
    queryFn: (): Promise<Paged<EventItem>> => Promise.reject(new Error('TODO(ch5-T4): viết useEvents')),
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: (): Promise<EventItem> => Promise.reject(new Error('TODO(ch5-T4): viết useEvent')),
  })
}

// TODO(ch5-T6): sau khi tạo/sửa/xoá thành công, dữ liệu sự kiện trong cache đã cũ.
//   Thêm onSuccess: () => queryClient.invalidateQueries({ queryKey: eventKeys.all }) cho cả 3 mutation dưới đây.
//   (Mẫu: useRegisterForEvent trong features/registrations/hooks/use-registrations.ts)
export function useCreateEvent() {
  const queryClient = useQueryClient()
  void queryClient
  return useMutation({
    mutationFn: (values: EventFormValues) => eventsApi.create(values),
  })
}

export function useUpdateEvent(id: string) {
  const queryClient = useQueryClient()
  void queryClient
  return useMutation({
    mutationFn: (values: EventFormValues) => eventsApi.update(id, values),
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  void queryClient
  return useMutation({
    mutationFn: (id: string) => eventsApi.remove(id),
  })
}
