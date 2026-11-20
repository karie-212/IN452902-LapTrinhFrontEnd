import { useState } from 'react'
import { Link } from 'react-router'
import hero from '../assets/hero.svg'
import { ClubCard } from '../components/ClubCard'
import { EventList } from '../components/EventList'
import { clubs, events } from '../data'

export function HomePage() {
  // Lấy "bây giờ" một lần khi trang mở; render phải thuần nên không gọi new Date() trực tiếp
  const [now] = useState(() => new Date())
  // TODO(ch4-T2): chỉ lấy 3 sự kiện sắp tới gần nhất (gợi ý: filterEvents(...) rồi slice)
  const upcoming = events

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
            Nơi sinh viên Trường Đại học Đồng Tháp tìm câu lạc bộ hợp sở thích, xem lịch sự kiện của cả
            trường và đăng ký tham gia chỉ trong vài bước.
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
              Trở thành thành viên
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
        <EventList events={upcoming} now={now} />
      </section>

      <section aria-labelledby="tieu-de-clb" className="mx-auto w-full max-w-page px-4 pt-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="tieu-de-clb">Câu lạc bộ</h2>
          <Link to="/clubs" className="text-primary underline underline-offset-4">
            Tất cả câu lạc bộ →
          </Link>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
          {clubs.slice(0, 3).map((club) => (
            <li key={club.id}>
              <ClubCard club={club} eventCount={events.filter((e) => e.clubId === club.id).length} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
