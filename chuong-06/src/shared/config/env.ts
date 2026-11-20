import 'server-only'
import { z } from 'zod'

// Biến môi trường phía SERVER (không có tiền tố NEXT_PUBLIC_ → không lọt xuống trình duyệt).
// Trình duyệt không cần biết URL API: nó gọi BFF cùng origin (/api/...), BFF gọi tiếp API_URL.
const envSchema = z.object({
  API_URL: z.url({ error: 'API_URL phải là URL, ví dụ http://localhost:4000' }).default('http://localhost:4000'),
})

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  throw new Error(`Cấu hình .env sai:\n${z.prettifyError(parsed.error)}`)
}

export const env = {
  API_URL: parsed.data.API_URL.replace(/\/+$/, ''),
}
