'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { isApiError } from '../../shared/api/api-error'
import { serverFetch } from '../../shared/api/server-fetch'
import { getSession } from '../auth/session.server'
import { eventDtoSchema } from './dto/event.dto'
import { eventFormSchema, type EventFormInput } from './model/event-form.schema'
import { eventFormFieldFromDto, toCreateEventDto } from './model/event.mapper'

export type EventFormState = {
  message?: string
  fieldErrors?: Partial<Record<keyof EventFormInput, string>>
  values?: Record<string, string>
}

// TODO(ch6-T6): Server Action tạo sự kiện (form: features/events/components/EventForm.tsx)
//  1. Kiểm tra quyền: (await getSession())?.role === 'Admin', nếu không → return { message: 'Chỉ Admin được tạo sự kiện.' }
//     (Server Action gọi được bằng POST trực tiếp — không chỉ dựa vào proxy.ts)
//  2. Đọc 6 ô từ formData; kiểm tra bằng eventFormSchema (schema Ch05). Hai lưu ý:
//     capacity là chuỗi → Number(...); startAt "2027-01-09T08:00" không có múi giờ → gắn ":00+07:00" (server chạy UTC)
//     Sai → return { fieldErrors (z.flattenError), values }
//  3. serverFetch('/api/events', eventDtoSchema, { method: 'POST', body: toCreateEventDto(data), token: session.token })
//     ApiError 400 → đổi tên field server → tên ô form bằng eventFormFieldFromDto; return { message, fieldErrors, values }
//  4. updateTag('events') rồi redirect('/admin/events')
// Kiểm chứng: e2e/admin.spec.ts
export async function createEventAction(_prev: EventFormState, formData: FormData): Promise<EventFormState> {
  void [formData, redirect, z, isApiError, eventDtoSchema, eventFormSchema, eventFormFieldFromDto, toCreateEventDto]
  return { message: 'TODO(ch6-T6): viết createEventAction' }
}

// Mẫu: Server Action xoá sự kiện (kiểm quyền → gọi API → updateTag)
export async function deleteEventAction(eventId: string): Promise<void> {
  const session = await getSession()
  if (session?.role !== 'Admin') throw new Error('Chỉ Admin được xoá sự kiện.')
  await serverFetch(`/api/events/${eventId}`, undefined, { method: 'DELETE', token: session.token })
  updateTag('events')
}
