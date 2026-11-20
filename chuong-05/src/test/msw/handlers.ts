// Handler mặc định: giả lập mock API ở tầng network. Test nào cần tình huống khác
// (lỗi 400, 409…) thì ghi đè bằng server.use(...) ngay trong test đó.
import { http, HttpResponse } from 'msw/http'
import { API, clubs, events, member, problem } from './fixtures'

export const handlers = [
  http.get(`${API}/api/clubs`, () => HttpResponse.json(clubs)),

  http.get(`${API}/api/events`, ({ request }) => {
    const url = new URL(request.url)
    const clubId = url.searchParams.get('clubId')
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const filtered = events
      .filter((e) => !clubId || e.clubId === clubId)
      .toSorted((a, b) => a.startTime.localeCompare(b.startTime))
    const items = filtered.slice((page - 1) * pageSize, page * pageSize)
    return HttpResponse.json({ items, totalCount: filtered.length, page, pageSize })
  }),

  http.get(`${API}/api/events/:id`, ({ params }) => {
    const event = events.find((e) => e.id === params.id)
    return event
      ? HttpResponse.json(event)
      : HttpResponse.json(problem(404, `Không tìm thấy sự kiện có id ${String(params.id)}.`), { status: 404 })
  }),

  // Mở trang lần đầu: chưa có cookie refresh → 401 (chưa đăng nhập)
  http.post(`${API}/api/auth/refresh`, () =>
    HttpResponse.json(problem(401, 'Refresh token không hợp lệ hoặc đã hết hạn.'), { status: 401 }),
  ),

  http.post(`${API}/api/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }
    if (body.email === member.email && body.password === 'Member@123') {
      return HttpResponse.json({ accessToken: 'test-access-token', tokenType: 'Bearer' })
    }
    return HttpResponse.json(problem(401, 'Email hoặc mật khẩu không đúng.'), { status: 401 })
  }),

  http.post(`${API}/api/auth/logout`, () => new HttpResponse(null, { status: 204 })),

  http.get(`${API}/api/members/me`, ({ request }) =>
    request.headers.get('Authorization') === 'Bearer test-access-token'
      ? HttpResponse.json(member)
      : HttpResponse.json(problem(401, 'Chưa đăng nhập.'), { status: 401 }),
  ),

  http.get(`${API}/api/registrations/me`, () => HttpResponse.json([])),
]
