import { request, type Page } from '@playwright/test'

export const API_URL = 'http://localhost:4000'

// Gọi thẳng mock API để chuẩn bị dữ liệu — test không phụ thuộc ngày chạy hay dữ liệu cũ
export async function createMemberAccount() {
  const api = await request.newContext({ baseURL: API_URL })
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`
  const member = {
    studentId: suffix.slice(-10).padStart(10, '0'),
    name: 'Sinh viên E2E',
    email: `e2e-${suffix}@sv.dthu.edu.vn`,
    password: 'Member@123',
  }
  const res = await api.post('/api/auth/register', { data: member })
  if (!res.ok()) throw new Error(`Tạo tài khoản thất bại: ${res.status()}`)
  await api.dispose()
  return member
}

// Tạo một sự kiện 30 ngày nữa, còn nhiều chỗ (dùng tài khoản admin của mock)
export async function createUpcomingEvent(title: string) {
  const api = await request.newContext({ baseURL: API_URL })
  const login = await api.post('/api/auth/login', { data: { email: 'admin@dthu.edu.vn', password: 'Admin@123' } })
  const { accessToken } = (await login.json()) as { accessToken: string }
  const res = await api.post('/api/events', {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      name: title,
      description: 'Sự kiện do test e2e tạo.',
      clubId: '11111111-1111-4111-8111-000000000001',
      location: 'Phòng máy A3.201',
      startTime: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      capacity: 100,
    },
  })
  const event = (await res.json()) as { id: string }
  await api.dispose()
  return event
}

export async function login(page: Page, email: string, password: string) {
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mật khẩu').fill(password)
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
}
