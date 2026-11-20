import { NextResponse, type NextRequest } from 'next/server'
import { decodeSession, TOKEN_COOKIE } from './features/auth/session'

// proxy.ts (Next 16, trước đây là middleware.ts): chạy TRƯỚC khi render route.
// Chặn sớm các trang cần đăng nhập. Đây chỉ là lớp chặn giao diện —
// Server Action và API vẫn tự kiểm tra quyền.
// TODO(ch6-T4): chặn trang cần đăng nhập. Test: src/proxy.test.ts
//  - session = decodeSession(request.cookies.get(TOKEN_COOKIE)?.value, Date.now())
//  - chưa đăng nhập → NextResponse.redirect tới /login?redirect=<pathname + search>
//  - /admin/* mà role khác 'Admin' → NextResponse.rewrite(new URL('/forbidden', request.url))
//  - còn lại → NextResponse.next()
export function proxy(request: NextRequest) {
  void [request, decodeSession, TOKEN_COOKIE]
  return NextResponse.next()
}

// matcher phải là hằng số (Next đọc lúc build) — đã khai báo sẵn
export const config = {
  matcher: ['/my-events/:path*', '/admin/:path*'],
}
