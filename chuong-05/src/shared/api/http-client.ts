import axios from 'axios'
import { env } from '../config/env'

// MỘT axios instance cho cả ứng dụng: baseURL, timeout, cookie đặt ở đúng một chỗ.
// Interceptor (gắn token, chuẩn hoá lỗi) được gắn ở app/http-setup.ts.
// TODO(ch5-T1): cấu hình instance: baseURL = env.API_URL, timeout 10 giây,
// withCredentials: true (để gửi kèm cookie refreshToken). Test: http-client.test.ts
export const httpClient = axios.create({})

void env // xoá dòng này khi đã dùng env ở trên
