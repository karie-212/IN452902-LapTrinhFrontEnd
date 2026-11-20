import axios from 'axios'
import { http, HttpResponse } from 'msw/http'
import { describe, expect, it, vi } from 'vitest'
import { API } from '../../test/msw/fixtures'
import { server } from '../../test/msw/server'
import { ApiError } from './api-error'
import { setupInterceptors } from './interceptors'

const BASE = API

// Mỗi test dùng một axios instance riêng để không ảnh hưởng httpClient thật
function makeClient() {
  return axios.create({ baseURL: BASE })
}

describe('setupInterceptors', () => {
  it('gắn header Authorization: Bearer <token> vào mọi request', async () => {
    let authHeader: string | null = null
    server.use(
      http.get(`${BASE}/api/members/me`, ({ request }) => {
        authHeader = request.headers.get('Authorization')
        return HttpResponse.json({ ok: true })
      }),
    )
    const client = makeClient()
    setupInterceptors(client, { getToken: () => 'abc.def.ghi', onLogout: vi.fn() })

    await client.get('/api/members/me')
    expect(authHeader).toBe('Bearer abc.def.ghi')
  })

  it('401 khi đang đăng nhập → gọi onLogout và ném ApiError', async () => {
    server.use(
      http.get(`${BASE}/api/registrations/me`, () =>
        HttpResponse.json({ status: 401, title: 'Chưa đăng nhập' }, { status: 401 }),
      ),
    )
    const onLogout = vi.fn()
    const client = makeClient()
    setupInterceptors(client, { getToken: () => 'expired-token', onLogout })

    const error = await client.get('/api/registrations/me').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect((error as ApiError).code).toBe('unauthorized')
    expect(onLogout).toHaveBeenCalledOnce()
  })

  it('★ 401 → refresh đúng một lần cho nhiều request cùng lúc, rồi gửi lại request', async () => {
    let token = 'old'
    server.use(
      http.get(`${BASE}/api/data/:n`, ({ request, params }) =>
        request.headers.get('Authorization') === 'Bearer new'
          ? HttpResponse.json({ n: params.n })
          : HttpResponse.json({ status: 401 }, { status: 401 }),
      ),
    )
    const refresh = vi.fn(async () => {
      token = 'new'
      return token
    })
    const onLogout = vi.fn()
    const client = makeClient()
    setupInterceptors(client, { getToken: () => token, onLogout, refresh })

    const [a, b] = await Promise.all([client.get('/api/data/1'), client.get('/api/data/2')])
    expect(a.data).toEqual({ n: '1' })
    expect(b.data).toEqual({ n: '2' })
    expect(refresh).toHaveBeenCalledOnce()
    expect(onLogout).not.toHaveBeenCalled()
  })
})
