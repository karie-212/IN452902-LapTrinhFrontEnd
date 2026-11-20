// @vitest-environment node
import { http, HttpResponse } from 'msw/http'
import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'
import { memberToken } from '../../../test/jwt'
import { API } from '../../../test/msw/fixtures'
import { server } from '../../../test/msw/server'

const revalidateTag = vi.fn()
vi.mock('next/cache', () => ({ revalidateTag: (...args: unknown[]) => revalidateTag(...args) }))

const { GET, POST } = await import('./route')

function call(handler: typeof GET, url: string, init?: { method?: string; body?: string; token?: string }) {
  const request = new NextRequest(`http://localhost:3000${url}`, {
    method: init?.method ?? 'GET',
    body: init?.body,
    headers: { 'Content-Type': 'application/json', ...(init?.token ? { Cookie: `eduhub_token=${init.token}` } : {}) },
  })
  const path = new URL(request.url).pathname.replace(/^\/api\//, '').split('/')
  return handler(request, { params: Promise.resolve({ path }) })
}

describe('BFF /api/[...path]', () => {
  it('chuyển tiếp tới EduHub API, gắn Bearer lấy từ cookie httpOnly, giữ query', async () => {
    let seen: { url: string; auth: string | null } | undefined
    server.use(
      http.get(`${API}/api/registrations/me`, ({ request }) => {
        seen = { url: request.url, auth: request.headers.get('Authorization') }
        return HttpResponse.json([])
      }),
    )
    const res = await call(GET, '/api/registrations/me?x=1', { token: memberToken })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual([])
    expect(seen).toEqual({ url: `${API}/api/registrations/me?x=1`, auth: `Bearer ${memberToken}` })
  })

  it('giữ nguyên mã lỗi của API; đăng ký thành công thì xoá cache "events"', async () => {
    server.use(
      http.post(`${API}/api/registrations`, async ({ request }) => {
        const { eventId } = (await request.json()) as { eventId: string }
        return eventId === 'full'
          ? HttpResponse.json({ status: 409, detail: 'Sự kiện đã hết chỗ.' }, { status: 409 })
          : HttpResponse.json({ id: 'r1' }, { status: 201 })
      }),
    )
    const conflict = await call(POST, '/api/registrations', { method: 'POST', body: '{"eventId":"full"}', token: memberToken })
    expect(conflict.status).toBe(409)
    expect(revalidateTag).not.toHaveBeenCalled()

    const created = await call(POST, '/api/registrations', { method: 'POST', body: '{"eventId":"ok"}', token: memberToken })
    expect(created.status).toBe(201)
    expect(revalidateTag).toHaveBeenCalledWith('events', { expire: 0 })
  })

  it('không mở /api/auth/* qua BFF (đăng nhập đi bằng Server Action)', async () => {
    const res = await call(POST, '/api/auth/login', { method: 'POST', body: '{}' })
    expect(res.status).toBe(404)
  })
})
