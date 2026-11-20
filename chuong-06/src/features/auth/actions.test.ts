// @vitest-environment node
import { http, HttpResponse } from 'msw/http'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { API, problem } from '../../test/msw/fixtures'
import { server } from '../../test/msw/server'
import { memberToken } from '../../test/jwt'

// Giả lập các API chỉ có khi Next chạy thật: cookies() và redirect()
const cookieStore = { set: vi.fn(), delete: vi.fn(), get: vi.fn() }
vi.mock('next/headers', () => ({ cookies: async () => cookieStore }))
vi.mock('next/navigation', () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`) // redirect thật cũng "ném" để dừng hàm
  },
}))

const { loginAction } = await import('./actions')

function form(data: Record<string, string>) {
  const fd = new FormData()
  for (const [k, v] of Object.entries(data)) fd.set(k, v)
  return fd
}

describe('loginAction (Server Action)', () => {
  beforeEach(() => {
    server.use(
      http.post(`${API}/api/auth/login`, async ({ request }) => {
        const body = (await request.json()) as { password: string }
        return body.password === 'Member@123'
          ? HttpResponse.json({ accessToken: memberToken, tokenType: 'Bearer' })
          : HttpResponse.json(problem(401, 'Email hoặc mật khẩu không đúng.'), { status: 401 })
      }),
    )
  })

  it('email sai định dạng → trả lỗi theo ô, không gọi API', async () => {
    const state = await loginAction({}, form({ email: 'khong-phai-email', password: '' }))
    expect(state.fieldErrors).toEqual({ email: 'Email chưa đúng định dạng.', password: 'Nhập mật khẩu.' })
    expect(cookieStore.set).not.toHaveBeenCalled()
  })

  it('sai mật khẩu → trả thông báo của server, giữ lại email đã nhập', async () => {
    const state = await loginAction({}, form({ email: 'sv1@dthu.edu.vn', password: 'sai' }))
    expect(state).toMatchObject({ message: 'Email hoặc mật khẩu không đúng.', values: { email: 'sv1@dthu.edu.vn' } })
    expect(cookieStore.set).not.toHaveBeenCalled()
  })

  it('đúng → đặt cookie httpOnly chứa token rồi chuyển về trang redirect (chỉ đường dẫn nội bộ)', async () => {
    await expect(
      loginAction({}, form({ email: 'sv1@dthu.edu.vn', password: 'Member@123', redirect: '/my-events' })),
    ).rejects.toThrow('REDIRECT:/my-events')
    expect(cookieStore.set).toHaveBeenCalledWith('eduhub_token', memberToken, expect.objectContaining({ httpOnly: true, sameSite: 'lax', path: '/' }))

    await expect(
      loginAction({}, form({ email: 'sv1@dthu.edu.vn', password: 'Member@123', redirect: 'https://trang-la.com' })),
    ).rejects.toThrow('REDIRECT:/')
  })
})
