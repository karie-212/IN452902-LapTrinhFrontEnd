import 'server-only'
import { cookies } from 'next/headers'
import { decodeSession, TOKEN_COOKIE, type Session } from './session'

// Đọc phiên đăng nhập trong Server Component / Server Action / Route Handler.
// cookies() là dữ liệu theo request → component gọi hàm này phải nằm trong <Suspense>.
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  return decodeSession(cookieStore.get(TOKEN_COOKIE)?.value)
}
