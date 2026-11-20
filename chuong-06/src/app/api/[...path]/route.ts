import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { TOKEN_COOKIE } from '../../../features/auth/session'
import { env } from '../../../shared/config/env'

// BFF (Backend For Frontend): trình duyệt gọi /api/... CÙNG origin với trang,
// route này gắn token lấy từ cookie httpOnly rồi chuyển tiếp tới EduHub API.
// Nhờ vậy cookie là first-party, token không bao giờ lộ ra JavaScript.
// TODO(ch6-T5): viết BFF. Test: route.test.ts
//  1. const { path } = await ctx.params; path[0] === 'auth' → trả 404 (đăng nhập đi bằng Server Action)
//  2. target = new URL(`/api/${path.join('/')}`, env.API_URL); giữ query: target.search = request.nextUrl.search
//  3. token = request.cookies.get(TOKEN_COOKIE)?.value → header Authorization: Bearer <token>
//  4. fetch(target, { method, headers, body: (POST/PUT) ? await request.text() : undefined }); lỗi mạng → 503
//  5. Thành công + method khác GET + path[0] === 'registrations' → revalidateTag('events', { expire: 0 })
//  6. Trả new Response(body, { status: upstream.status, headers: { 'Content-Type': … } }) — 204 thì body null
async function proxyToApi(request: NextRequest, ctx: RouteContext<'/api/[...path]'>) {
  void [request, ctx, revalidateTag, TOKEN_COOKIE, env]
  return Response.json({ status: 501, title: 'TODO(ch6-T5): viết BFF' }, { status: 501 })
}

export const GET = proxyToApi
export const POST = proxyToApi
export const PUT = proxyToApi
export const DELETE = proxyToApi
