import axios from 'axios'
import { toApiError } from './api-error'

// axios phía TRÌNH DUYỆT: gọi BFF cùng origin (/api/...). Token nằm trong cookie httpOnly,
// trình duyệt tự gửi kèm — JavaScript không đọc được token (an toàn hơn Ch05),
// nên không còn interceptor gắn Bearer; chỉ còn chuẩn hoá lỗi bằng toApiError như Ch05.
export const httpClient = axios.create({ timeout: 10_000 })

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error) || !axios.isAxiosError(error)) throw error
    // 401 (cookie hết hạn) → ApiError 'unauthorized': "Phiên đăng nhập đã hết hạn…"
    throw toApiError(error.response?.status, error.response?.data)
  },
)
