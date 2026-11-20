import { NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router'
import logo from '../assets/logo.svg'
import { useCurrentMember, useLogout, useSessionRestore } from '../features/auth/hooks/use-auth'
import { ThemeToggle } from './ThemeToggle'

const publicItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/events', label: 'Sự kiện', end: false },
  { to: '/clubs', label: 'Câu lạc bộ', end: false },
]

// NavLink tự đặt aria-current="page" và cho biết isActive khi URL khớp
function navLinkClass({ isActive }: { isActive: boolean }) {
  const base =
    'flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 sm:text-base'
  return isActive ? `${base} bg-accent text-navy` : `${base} text-white hover:bg-white/12`
}

export function RootLayout() {
  useSessionRestore() // mở trang → thử khôi phục đăng nhập bằng cookie refresh
  const member = useCurrentMember()
  const logout = useLogout()
  const navigate = useNavigate()

  const navItems = [
    ...publicItems,
    ...(member ? [{ to: '/my-events', label: 'Sự kiện của tôi', end: false }] : []),
    ...(member?.role === 'Admin' ? [{ to: '/admin/events', label: 'Quản trị', end: false }] : []),
    ...(member ? [] : [{ to: '/login', label: 'Đăng nhập', end: false }]),
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#noi-dung"
        className="absolute top-2 left-2 z-50 -translate-y-[200%] rounded-sm bg-accent px-4 py-2 font-semibold text-navy transition-transform focus-visible:translate-y-0"
      >
        Bỏ qua, đến nội dung chính
      </a>

      <header className="z-10 bg-header text-white shadow-md sm:sticky sm:top-0">
        <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <NavLink to="/" className="inline-flex items-center gap-2 text-lg font-bold">
            <img src={logo} alt="" width={36} height={36} className="size-9" />
            <span>
              Edu<span className="text-accent">Hub</span>
            </span>
          </NavLink>
          <div className="flex flex-wrap items-center gap-1">
            <nav aria-label="Điều hướng chính">
              <ul className="flex flex-wrap gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} end={item.end} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            {member && (
              <button
                type="button"
                onClick={() => logout.mutate(undefined, { onSettled: () => navigate('/') })}
                className="flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold text-white hover:bg-white/12 sm:px-4 sm:text-base"
                title={member.email}
              >
                Đăng xuất ({member.name.split(' ').at(-1)})
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="noi-dung" className="flex-1">
        {/* Trang con của route hiện tại hiện ở đây */}
        <Outlet />
      </main>

      <footer className="mt-16 bg-header py-8 text-sm text-[#c9d6ea]">
        <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-4 sm:px-6 lg:flex-row lg:flex-wrap lg:justify-between">
          <p>EduHub Web · Trường Đại học Đồng Tháp · 783 Phạm Hữu Lầu, Cao Lãnh, Đồng Tháp</p>
          <p>
            Liên hệ:{' '}
            <a className="text-accent underline" href="mailto:eduhub@dthu.edu.vn">
              eduhub@dthu.edu.vn
            </a>
          </p>
          <p className="opacity-80">Bài thực hành môn IN4529 — Lập trình Front End.</p>
        </div>
      </footer>
      {/* Chuyển trang thì cuộn lên đầu, bấm Back thì về đúng chỗ cũ */}
      <ScrollRestoration />
    </div>
  )
}
