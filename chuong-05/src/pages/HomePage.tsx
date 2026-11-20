import { useState } from 'react'
import { Link } from 'react-router'
import hero from '../assets/hero.svg'
import { ClubCard } from '../features/clubs/components/ClubCard'
import { useClubs } from '../features/clubs/hooks/use-clubs'
import { EventList } from '../features/events/components/EventList'
import { useEvents } from '../features/events/hooks/use-events'
import { ErrorState } from '../shared/ui/ErrorState'
import { Spinner } from '../shared/ui/Spinner'

export function HomePage() {
  // "Bây giờ" lấy một lần khi mở trang → query key ổn định, không gọi API liên tục
  const [now] = useState(() => new Date())
  const upcoming = useEvents({ from: now, page: 1, pageSize: 3 })
  const clubs = useClubs()

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
            <p className="flex flex-wrap gap-3">
              <Link
                to="/events"
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-2 font-semibold text-navy hover:bg-[#5ee0e5]"
              >
                Xem lịch sự kiện
              </Link>
              <Link
                to="/register"
                className="inline-flex min-h-11 items-center rounded-full border-2 border-current px-6 py-2 font-semibold hover:bg-white/12"
              >
                Tạo tài khoản
              </Link>
            </p>
          </div>
          <img
            src={hero}
            alt="Minh hoạ ba sinh viên đứng cạnh bảng CLB và bảng Sự kiện"
            width={1200}
            height={500}
            className="rounded-md shadow-lg"
          />
        </section>
      </div>

      <section aria-labelledby="su-kien-sap-toi" className="mx-auto w-full max-w-page px-4 pt-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="su-kien-sap-toi">Sự kiện sắp tới</h2>
          <Link to="/events" className="text-primary underline underline-offset-4">
            Xem tất cả sự kiện →
          </Link>
        </div>
        {upcoming.isPending ? (
          <Spinner />
        ) : upcoming.isError ? (
          <ErrorState error={upcoming.error} onRetry={() => upcoming.refetch()} />
        ) : (
          <EventList events={upcoming.data.items} clubs={clubs.data ?? []} now={now} />
        )}
      </section>

      <section aria-labelledby="tieu-de-clb" className="mx-auto w-full max-w-page px-4 pt-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="tieu-de-clb">Câu lạc bộ</h2>
          <Link to="/clubs" className="text-primary underline underline-offset-4">
            Tất cả câu lạc bộ →
          </Link>
        </div>
        {clubs.isSuccess && (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-6">
            {clubs.data.slice(0, 3).map((club) => (
              <li key={club.id}>
                <ClubCard club={club} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
