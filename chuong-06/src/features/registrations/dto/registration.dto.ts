import { z } from 'zod'
import { memberDtoSchema } from '../../auth/dto/auth.dto'
import { eventDtoSchema } from '../../events/dto/event.dto'

export const registrationStatusSchema = z.enum(['Pending', 'Confirmed', 'Cancelled'])

export const registrationDtoSchema = z.object({
  id: z.uuid(),
  memberId: z.uuid(),
  eventId: z.uuid(),
  registeredAt: z.iso.datetime(),
  status: registrationStatusSchema,
  checkedInAt: z.iso.datetime().nullable(),
  event: eventDtoSchema.optional(), // chỉ có ở GET /api/registrations/me
  member: memberDtoSchema.optional(), // chỉ có ở GET /api/registrations/event/{eventId}
})

export type RegistrationDto = z.infer<typeof registrationDtoSchema>

export const qrTokenSchema = z.object({ qrToken: z.string().min(1) })
