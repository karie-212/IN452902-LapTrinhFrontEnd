import Link from 'next/link'
import { logoutAction } from '../actions'
import { getSession } from '../session.server'

const linkClass =
  'flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold text-white hover:bg-white/12 sm:px-4 sm:text-base'

// Server Component async: đọc cookie → phải đặt trong <Suspense> (xem layout.tsx)
export async function UserNav() {
  const session = await getSession()

  if (!session) {
    return (
      <Link href="/login" className={linkClass}>
        Đăng nhập
      </Link>
    )
  }

  return (
    <>
      <Link href="/my-events" className={linkClass}>
        Sự kiện của tôi
      </Link>
      {session.role === 'Admin' && (
        <Link href="/admin/events" className={linkClass}>
          Quản trị
        </Link>
      )}
      <form action={logoutAction}>
        <button type="submit" className={linkClass} title={session.email}>
          Đăng xuất
        </button>
      </form>
    </>
  )
}
