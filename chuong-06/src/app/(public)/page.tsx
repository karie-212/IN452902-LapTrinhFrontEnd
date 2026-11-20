import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { getClubs } from '../../features/clubs/api/clubs.server'
import { ClubCard } from '../../features/clubs/components/ClubCard'
import { getEvents } from '../../features/events/api/events.server'
import { EventList } from '../../features/events/components/EventList'
import { startOfCurrentHour } from '../../shared/lib/time'
import { Spinner } from '../../shared/ui/Spinner'

// Trang chủ: phần hero là HTML tĩnh (prerender lúc build), hai danh sách stream tới sau.
export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-page px-4 pt-6 sm:px-6">
        <section
          aria-labelledby="tieu-de-chinh"
          className="grid items-center gap-6 rounded-lg bg-linear-135 from-[#003f87] to-navy px-6 py-8 text-white lg:grid-cols-[1.1fr_1fr] lg:p-12 dark:from-[#0a2a57] dark:to-[#000a1a]"
        >
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">Học kỳ I · 2026–2027</p>
            <h1 id="tieu-de-chinh">EduHub Web — Cổng CLB &amp; sự kiện sinh viên</h1>
            <p className="mt-4 mb-6 max-w-[52ch] text-lg opacity-90">
              Nơi sinh viên Trường Đại học Đồng Tháp tìm câu lạc bộ hợp sở thích, xem lịch sự kiện của cả trường và
              đăng ký tham gia chỉ trong vài bước.
            </p>
            <Link
              href="/events"
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-2 font-semibold text-navy hover:bg-[#5ee0e5]"
            >
              Xem lịch sự kiện
            </Link>
          </div>
          <Image
            src="/images/hero.svg"
            alt="Minh hoạ ba sinh viên đứng cạnh bảng CLB và bảng Sự kiện"
            width={1200}
            height={500}
            priority
            unoptimized
            className="rounded-md shadow-lg"
          />
        </section>
      </div>

      <section aria-labelledby="su-kien-sap-toi" className="mx-auto w-full max-w-page px-4 pt-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="su-kien-sap-toi">Sự kiện sắp tới</h2>
          <Link href="/events" className="text-primary underline underline-offset-4">
            Xem tất cả sự kiện →
          </Link>
        </div>
        <Suspense fallback={<Spinner label="Đang tải sự kiện…" />}>
          <UpcomingEvents />
        </Suspense>
      </section>

      <section aria-labelledby="tieu-de-clb" className="mx-auto w-full max-w-page px-4 pt-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="tieu-de-clb">Câu lạc bộ</h2>
          <Link href="/clubs" className="text-primary underline underline-offset-4">
            Tất cả câu lạc bộ →
          </Link>
        </div>
        <Suspense fallback={<Spinner />}>
          <FeaturedClubs />
        </Suspense>
      </section>
    </>
  )
}

async function UpcomingEvents() {
  await connection() // "sắp tới" phụ thuộc thời điểm request → không prerender lúc build
  const now = new Date()
  const [page, clubs] = await Promise.all([getEvents({ from: startOfCurrentHour(now), page: 1, pageSize: 3 }), getClubs()])
  return <EventList events={page.items} clubs={clubs} now={now} />
}

async function FeaturedClubs() {
  await connection() // lấy lúc chạy (không cần mock API chạy khi build), kết quả vẫn được 'use cache'
  const clubs = await getClubs()
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-6">
      {clubs.slice(0, 3).map((club) => (
        <li key={club.id}>
          <ClubCard club={club} />
        </li>
      ))}
    </ul>
  )
}
