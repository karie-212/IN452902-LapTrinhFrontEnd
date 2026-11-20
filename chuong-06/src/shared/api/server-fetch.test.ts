// @vitest-environment node
import { http, HttpResponse } from 'msw/http'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { API, problem } from '../../test/msw/fixtures'
import { server } from '../../test/msw/server'
import { ApiError } from './api-error'
import { serverFetch } from './server-fetch'

const pingSchema = z.object({ ok: z.boolean() })

describe('serverFetch', () => {
  it('GET thành công: ghép query, gắn Bearer, kiểm tra JSON bằng Zod', async () => {
    let seen: { url: string; auth: string | null } | undefined
    server.use(
      http.get(`${API}/api/ping`, ({ request }) => {
        seen = { url: request.url, auth: request.headers.get('Authorization') }
        return HttpResponse.json({ ok: true })
      }),
    )
    const data = await serverFetch('/api/ping', pingSchema, { query: { q: 'hien mau', page: 2, clubId: '' }, token: 'abc' })
    expect(data).toEqual({ ok: true })
    expect(seen?.url).toBe(`${API}/api/ping?q=hien+mau&page=2`) // bỏ tham số rỗng
    expect(seen?.auth).toBe('Bearer abc')
  })

  it('lỗi HTTP → ApiError qua CÙNG hàm toApiError với axios (404 dùng detail của server)', async () => {
    server.use(http.get(`${API}/api/events/x`, () => HttpResponse.json(problem(404, 'Không tìm thấy sự kiện.'), { status: 404 })))
    const error = await serverFetch('/api/events/x', pingSchema).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 404, code: 'not_found', message: 'Không tìm thấy sự kiện.' })
  })

  it('400 → fieldErrors; JSON sai contract → invalid_response', async () => {
    server.use(
      http.post(`${API}/api/events`, () =>
        HttpResponse.json(problem(400, 'Có trường không hợp lệ.', { name: ['Tên sự kiện là bắt buộc.'] }), { status: 400 }),
      ),
      http.get(`${API}/api/ping`, () => HttpResponse.json({ ok: 'yes' })),
    )
    const badRequest = await serverFetch('/api/events', pingSchema, { method: 'POST', body: {} }).catch((e: unknown) => e)
    expect(badRequest).toMatchObject({ code: 'bad_request', fieldErrors: { name: 'Tên sự kiện là bắt buộc.' } })

    const invalid = await serverFetch('/api/ping', pingSchema).catch((e: unknown) => e)
    expect(invalid).toMatchObject({ code: 'invalid_response' })
  })

  it('API không chạy → ApiError network', async () => {
    server.use(http.get(`${API}/api/ping`, () => HttpResponse.error()))
    const error = await serverFetch('/api/ping', pingSchema).catch((e: unknown) => e)
    expect(error).toMatchObject({ status: 0, code: 'network' })
  })
})
