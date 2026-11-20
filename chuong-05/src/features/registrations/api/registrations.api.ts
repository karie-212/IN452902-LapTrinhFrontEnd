import { z } from 'zod'
import { httpClient } from '../../../shared/api/http-client'
import { parseResponse } from '../../../shared/api/parse'
import { qrTokenSchema, registrationDtoSchema } from '../dto/registration.dto'
import { toRegistration, type Registration } from '../model/registration'

export const registrationsApi = {
  // Server lấy memberId từ token, body chỉ cần eventId
  async register(eventId: string): Promise<Registration> {
    const res = await httpClient.post('/api/registrations', { eventId })
    return toRegistration(parseResponse(registrationDtoSchema, res.data))
  },

  async mine(signal?: AbortSignal): Promise<Registration[]> {
    const res = await httpClient.get('/api/registrations/me', { signal })
    return parseResponse(z.array(registrationDtoSchema), res.data).map(toRegistration)
  },

  async forEvent(eventId: string, signal?: AbortSignal): Promise<Registration[]> {
    const res = await httpClient.get(`/api/registrations/event/${eventId}`, { signal })
    return parseResponse(z.array(registrationDtoSchema), res.data).map(toRegistration)
  },

  async cancel(id: string): Promise<void> {
    await httpClient.delete(`/api/registrations/${id}`)
  },

  async confirm(id: string): Promise<void> {
    await httpClient.post(`/api/registrations/${id}/confirm`)
  },

  async checkinCode(id: string): Promise<string> {
    const res = await httpClient.post(`/api/checkins/${id}`)
    return parseResponse(qrTokenSchema, res.data).qrToken
  },
}
