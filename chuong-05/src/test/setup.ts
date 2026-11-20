// Thêm matcher như toBeInTheDocument(), toHaveAttribute() cho expect của Vitest
import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { useAuthStore } from '../features/auth/store'
import { useToastStore } from '../shared/ui/toast'
import { server } from './msw/server'

// MSW chặn request ở tầng network: axios gửi thật, MSW trả lời thay server.
// 'error': request nào không có handler thì test fail ngay — tránh gọi nhầm ra mạng.
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => {
  server.resetHandlers()
  useAuthStore.getState().clear()
  useToastStore.setState({ toasts: [] })
})
afterAll(() => server.close())
