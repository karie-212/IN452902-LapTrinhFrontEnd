import { QueryClient } from '@tanstack/react-query'
import { render, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { AppProviders } from '../app/AppProviders'
import { routes } from '../app/router'
import { httpClient } from '../shared/api/http-client'
import { setupInterceptors } from '../shared/api/interceptors'
import { useAuthStore } from '../features/auth/store'

// Gắn interceptor cho httpClient thật một lần cho mọi test (giống main.tsx)
setupInterceptors(httpClient, {
  getToken: () => useAuthStore.getState().accessToken,
  onLogout: () => useAuthStore.getState().clear(),
})

// Mỗi test một QueryClient mới: cache không rò rỉ giữa các test, lỗi không tự thử lại
export function createTestQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
}

// Render cả ứng dụng ở một URL — dùng cho test trang
export function renderRoute(url: string) {
  const queryClient = createTestQueryClient()
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  render(
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>,
  )
  return { router, queryClient }
}

// Render một hook có QueryClientProvider bao ngoài — dùng cho test hook
export function renderQueryHook<T>(hook: () => T) {
  const queryClient = createTestQueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AppProviders queryClient={queryClient}>{children}</AppProviders>
  )
  return { ...renderHook(hook, { wrapper }), queryClient }
}
