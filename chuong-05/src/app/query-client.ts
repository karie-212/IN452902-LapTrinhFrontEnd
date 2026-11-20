import { QueryClient } from '@tanstack/react-query'
import { isApiError } from '../shared/api/api-error'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30 giây coi là "còn tươi", không gọi lại server
        refetchOnWindowFocus: false,
        // Lỗi 4xx (sai dữ liệu, không có quyền, không tìm thấy) thử lại cũng vô ích
        retry: (failureCount, error) =>
          !(isApiError(error) && error.status >= 400 && error.status < 500) && failureCount < 2,
      },
    },
  })
}
