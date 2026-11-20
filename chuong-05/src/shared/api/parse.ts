import type { z } from 'zod'
import { ApiError } from './api-error'

// Kiểm tra JSON server trả về bằng schema Zod. Sai hình dạng → ApiError 'invalid_response'
// (giao diện báo lỗi rõ ràng thay vì vỡ ở chỗ đọc field undefined).
export function parseResponse<T extends z.ZodType>(schema: T, data: unknown): z.output<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    console.error('Response sai contract:', result.error.issues)
    throw new ApiError({ status: 200, code: 'invalid_response' })
  }
  return result.data
}
