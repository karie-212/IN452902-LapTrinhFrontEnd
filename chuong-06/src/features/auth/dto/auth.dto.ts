import { z } from 'zod'

// DTO = hình dạng JSON đúng như server gửi (contract mock API)
export const tokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  tokenType: z.literal('Bearer'),
})

export const memberDtoSchema = z.object({
  id: z.uuid(),
  studentId: z.string(),
  name: z.string(),
  email: z.email(),
  role: z.enum(['Member', 'Admin']),
  joinedAt: z.iso.datetime(),
})

export type MemberDto = z.infer<typeof memberDtoSchema>

export type LoginRequestDto = { email: string; password: string }
export type RegisterRequestDto = { studentId: string; name: string; email: string; password: string }
