import 'server-only'
import type { z } from 'zod'
import { env } from '../config/env'
import { toApiError } from './api-error'
import { parseResponse } from './parse'

type Query = Record<string, string | number | undefined>

type ServerFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  query?: Query
  body?: unknown
  token?: string // access token đọc từ cookie httpOnly
}

// Gọi EduHub API từ SERVER bằng fetch. Lỗi đi qua CÙNG hàm toApiError với axios ở trình duyệt,
// nên thông báo lỗi giống hệt nhau dù dữ liệu lấy ở server hay client.
export async function serverFetch<T extends z.ZodType>(path: string, schema: T, options?: ServerFetchOptions): Promise<z.output<T>>
export async function serverFetch(path: string, schema?: undefined, options?: ServerFetchOptions): Promise<void>
export async function serverFetch(path: string, schema?: z.ZodType, options: ServerFetchOptions = {}) {
  // TODO(ch6-T1): viết serverFetch. Test: src/shared/api/server-fetch.test.ts
  //  1. url = new URL(path, env.API_URL); thêm options.query vào url.searchParams (bỏ giá trị undefined hoặc '')
  //  2. fetch(url, { method, headers: Accept + Content-Type (khi có body) + Authorization: Bearer <token> (khi có token),
  //     body: JSON.stringify(options.body), signal: AbortSignal.timeout(10_000) })
  //     fetch ném lỗi (API tắt, quá giờ) → throw toApiError(undefined, undefined)
  //  3. !res.ok → đọc body JSON (có thể rỗng) → throw toApiError(res.status, body)  ← CÙNG hàm với axios ở Ch05
  //  4. Không có schema hoặc 204 → return undefined; còn lại → return parseResponse(schema, await res.json())
  void [path, schema, options, env, toApiError, parseResponse]
  throw new Error('TODO(ch6-T1): viết serverFetch')
}
