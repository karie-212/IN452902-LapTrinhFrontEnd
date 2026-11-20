import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { ApiError, toApiError } from './api-error'

export type AuthHooks = {
  getToken: () => string | null
  onLogout: () => void
  // ★ Có hàm refresh thì gặp 401 sẽ xin access token mới rồi gửi lại request
  refresh?: () => Promise<string>
}

// AxiosError → ApiError. Request bị huỷ (AbortController) thì giữ nguyên để TanStack Query tự xử lý.
export function normalizeAxiosError(error: unknown): unknown {
  if (error instanceof ApiError || axios.isCancel(error)) return error
  if (axios.isAxiosError(error)) return toApiError(error.response?.status, error.response?.data)
  return error
}

/**
 * Gắn interceptor vào một axios instance. Trả về hàm gỡ interceptor (dùng trong test).
 */
export function setupInterceptors(client: AxiosInstance, hooks: AuthHooks): () => void {
  // TODO(ch5-T2): gắn interceptor. Test: interceptors.test.ts (2 test đầu)
  //  1. client.interceptors.request.use(config => …): có hooks.getToken() thì
  //     config.headers.set('Authorization', `Bearer ${token}`)
  //  2. client.interceptors.response.use(response => response, async (error) => …):
  //     - đổi lỗi bằng normalizeAxiosError(error)
  //     - nếu là ApiError 401, đang có token và KHÔNG phải URL /api/auth/* (isAuthUrl) → hooks.onLogout()
  //     - throw lỗi đã chuẩn hoá
  //  3. Trả về hàm gỡ interceptor (interceptors.request.eject(id), interceptors.response.eject(id))
  // ★ TODO(ch5-T7): nếu có hooks.refresh, gặp 401 mà canRetry(...) đúng thì thử
  //     createRefreshHandler(client, hooks.refresh) trước khi đăng xuất.
  void client
  void hooks
  return () => {}
}

export function isAuthUrl(url: string | undefined): boolean {
  return url?.startsWith('/api/auth/') ?? false
}

// ---------- ★ Refresh token + hàng đợi (mở rộng, rubric không bắt buộc) ----------

const retried = new WeakSet<InternalAxiosRequestConfig>()

export function canRetry(config: InternalAxiosRequestConfig | undefined, status: number | undefined): boolean {
  return (
    status === 401 &&
    config !== undefined &&
    !retried.has(config) && // mỗi request chỉ thử lại một lần
    !isAuthUrl(config.url) // không refresh cho chính login/refresh/logout
  )
}

export function createRefreshHandler(client: AxiosInstance, refresh: () => Promise<string>) {
  // ★ TODO(ch5-T7): nhiều request cùng gặp 401 → chỉ gọi refresh() MỘT lần.
  //  - giữ một biến pending: Promise<string> | null; chưa có thì pending = refresh().finally(() => pending = null)
  //  - chờ token mới, đánh dấu retried.add(config), gắn header Bearer mới, gửi lại: client.request(config)
  return async (config: InternalAxiosRequestConfig) => {
    void client
    void refresh
    void retried
    void config
    throw new Error('TODO(ch5-T7)')
  }
}
