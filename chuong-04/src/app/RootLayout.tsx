import { Link, Outlet, ScrollRestoration } from 'react-router'
import logo from '../assets/logo.svg'
import { ThemeToggle } from '../components/ThemeToggle'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/events', label: 'Sự kiện' },
  { to: '/clubs', label: 'Câu lạc bộ' },
  { to: '/register', label: 'Đăng ký thành viên' },
]

const navLinkClass =
  'flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/12 sm:px-4 sm:text-base'

// TODO(ch4-T3): đổi <Link> trong menu thành <NavLink> để link của trang hiện tại
//  được tô nền accent (bg-accent text-navy) và có aria-current="page".
//  Gợi ý: className của NavLink nhận hàm ({ isActive }) => '…'; "Trang chủ" cần prop end.

export function RootLayout() {
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
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold">
            <img src={logo} alt="" width={36} height={36} className="size-9" />
            <span>
              Edu<span className="text-accent">Hub</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-1">
            <nav aria-label="Điều hướng chính">
              <ul className="flex flex-wrap gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={navLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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
