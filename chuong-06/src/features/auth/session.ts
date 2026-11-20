import type { Role } from './model/member'

// Tên cookie httpOnly giữ access token (do Server Action đăng nhập đặt)
export const TOKEN_COOKIE = 'eduhub_token'

export type Session = {
  token: string
  memberId: string
  email: string
  role: Role
  expiresAt: Date
}

// Đọc payload JWT (KHÔNG kiểm chữ ký) — chỉ để giao diện biết ai đang đăng nhập.
// Quyền thật do API kiểm tra chữ ký ở mỗi request. Dùng được cả trong proxy.ts.
// now: truyền vào để kiểm hạn (proxy.ts). Khi render không truyền, vì cookie đã hết hạn
// cùng lúc với token và Cache Components không cho gọi Date.now() lúc prerender.
export function decodeSession(token: string | undefined, now?: number): Session | null {
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as {
      sub?: string
      email?: string
      role?: string
      exp?: number
    }
    if (!payload.sub || !payload.email || !payload.exp) return null
    if (payload.role !== 'Member' && payload.role !== 'Admin') return null
    if (now !== undefined && payload.exp * 1000 <= now) return null // hết hạn
    return {
      token,
      memberId: payload.sub,
      email: payload.email,
      role: payload.role,
      expiresAt: new Date(payload.exp * 1000),
    }
  } catch {
    return null
  }
}
