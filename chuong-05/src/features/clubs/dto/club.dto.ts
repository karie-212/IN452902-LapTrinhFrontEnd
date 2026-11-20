import { z } from 'zod'

export const clubDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  presidentId: z.uuid().nullable(),
  createdAt: z.iso.datetime(),
})

export type ClubDto = z.infer<typeof clubDtoSchema>
