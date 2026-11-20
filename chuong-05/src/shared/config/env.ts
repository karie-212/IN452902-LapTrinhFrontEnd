import { z } from 'zod'

// Đọc biến môi trường một lần, kiểm tra bằng Zod: sai thì báo lỗi ngay lúc khởi động
// thay vì để request hỏng ở đâu đó rất khó tìm.
const envSchema = z.object({
  VITE_API_URL: z.url({ error: 'VITE_API_URL phải là URL, ví dụ http://localhost:4000' }).default('http://localhost:4000'),
})

const parsed = envSchema.safeParse(import.meta.env)
if (!parsed.success) {
  throw new Error(`Cấu hình .env sai:\n${z.prettifyError(parsed.error)}`)
}

export const env = {
  API_URL: parsed.data.VITE_API_URL.replace(/\/+$/, ''), // bỏ dấu / cuối
}
