import { describe, expect, it } from 'vitest'
import { fakeJwt, memberToken } from '../../test/jwt'
import { decodeSession } from './session'

describe('decodeSession', () => {
  it('đọc payload JWT → phiên đăng nhập', () => {
    expect(decodeSession(memberToken)).toMatchObject({ email: 'sv1@dthu.edu.vn', role: 'Member' })
  })

  it('token hết hạn (khi truyền now), sai vai trò hoặc rác → null', () => {
    const expired = fakeJwt({ sub: 'x', email: 'a@b.vn', role: 'Member', exp: 1_000 })
    expect(decodeSession(expired, Date.now())).toBeNull()
    expect(decodeSession(fakeJwt({ sub: 'x', email: 'a@b.vn', role: 'Root', exp: 4_102_444_800 }))).toBeNull()
    expect(decodeSession('khong-phai-jwt')).toBeNull()
    expect(decodeSession(undefined)).toBeNull()
  })
})
