import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { adminToken, memberToken } from './test/jwt'
import { config, proxy } from './proxy'

function visit(path: string, token?: string) {
  return proxy(
    new NextRequest(`http://localhost:3000${path}`, { headers: token ? { Cookie: `eduhub_token=${token}` } : {} }),
  )
}

describe('proxy.ts', () => {
  it('chỉ chạy cho khu thành viên và quản trị', () => {
    expect(config.matcher).toEqual(['/my-events/:path*', '/admin/:path*'])
  })

  it('chưa đăng nhập → chuyển sang /login?redirect=<trang đang mở>', () => {
    const res = visit('/my-events?tab=1')
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost:3000/login?redirect=%2Fmy-events%3Ftab%3D1')
  })

  it('Member mở /admin → trang 403; Admin thì cho qua', () => {
    expect(visit('/admin/events', memberToken).headers.get('x-middleware-rewrite')).toBe('http://localhost:3000/forbidden')
    const ok = visit('/admin/events', adminToken)
    expect(ok.headers.get('x-middleware-next')).toBe('1')
  })
})
