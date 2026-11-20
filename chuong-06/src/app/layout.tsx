import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { UserNav } from '../features/auth/components/UserNav'
import './globals.css'
import { Providers } from './providers'

// next/font tải font lúc build và tự host cùng trang (không gọi Google khi người dùng mở web)
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-be-vietnam-pro',
})

export const metadata: Metadata = {
  title: { default: 'EduHub Web', template: '%s · EduHub Web' },
  description: 'Cổng câu lạc bộ và sự kiện sinh viên Trường Đại học Đồng Tháp.',
}

const navLink =
  'flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold text-white hover:bg-white/12 sm:px-4 sm:text-base'

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <header className="z-10 bg-header text-white shadow-md sm:sticky sm:top-0">
            <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
              <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
                <Image src="/images/logo.svg" alt="" width={36} height={36} unoptimized className="size-9" />
                <span>
                  Edu<span className="text-accent">Hub</span>
                </span>
              </Link>
              <nav aria-label="Điều hướng chính" className="flex flex-wrap items-center gap-1">
                <Link href="/" className={navLink}>
                  Trang chủ
                </Link>
                <Link href="/events" className={navLink}>
                  Sự kiện
                </Link>
                <Link href="/clubs" className={navLink}>
                  Câu lạc bộ
                </Link>
                {/* Phần phụ thuộc cookie: stream tới sau, phần còn lại của header nằm sẵn trong HTML tĩnh */}
                <Suspense fallback={<span className="min-h-11 w-24" />}>
                  <UserNav />
                </Suspense>
              </nav>
            </div>
          </header>

          <main id="noi-dung" className="flex-1">
            {children}
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
        </Providers>
      </body>
    </html>
  )
}
