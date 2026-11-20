// Tạo JWT giả (chữ ký không hợp lệ) để test phần đọc payload
export function fakeJwt(payload: Record<string, unknown>): string {
  const b64 = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString('base64url')
  return `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(payload)}.chu-ky-gia`
}

export const memberToken = fakeJwt({
  sub: '33333333-3333-4333-8333-000000000002',
  email: 'sv1@dthu.edu.vn',
  role: 'Member',
  exp: 4_102_444_800, // năm 2100
})

export const adminToken = fakeJwt({
  sub: '33333333-3333-4333-8333-000000000001',
  email: 'admin@dthu.edu.vn',
  role: 'Admin',
  exp: 4_102_444_800,
})
