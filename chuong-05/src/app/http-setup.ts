import { authApi } from '../features/auth/api/auth.api'
import { useAuthStore } from '../features/auth/store'
import { httpClient } from '../shared/api/http-client'
import { setupInterceptors } from '../shared/api/interceptors'

// Nối tầng HTTP (shared) với trạng thái đăng nhập (features/auth).
// Đặt ở app/ để shared/ không phải import ngược lên features/.
export function setupHttp() {
  return setupInterceptors(httpClient, {
    getToken: () => useAuthStore.getState().accessToken,
    onLogout: () => useAuthStore.getState().clear(),
    // ★ access token hết hạn (15 phút) → tự xin token mới bằng cookie refresh
    refresh: async () => {
      const token = await authApi.refresh()
      useAuthStore.getState().setToken(token)
      return token
    },
  })
}
