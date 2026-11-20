import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { cache } from 'react'
import { getSession } from '../../../../features/auth/session.server'
import { getClubs } from '../../../../features/clubs/api/clubs.server'
import { getClubImage } from '../../../../features/clubs/components/club-image'
import { getEvent } from '../../../../features/events/api/events.server'
import { isPast, seatsLeft } from '../../../../features/events/model/event'
import { RegisterEventButton } from '../../../../features/registrations/components/RegisterEventButton'
import { formatDateTime } from '../../../../shared/lib/format'
import { PageContainer } from '../../../../shared/ui/PageContainer'

// Lấy sự kiện; id sai → trang 404 của Next (not-found.tsx).
// React cache: generateMetadata và Page cùng gọi trong một request → chỉ một lần lấy dữ liệu.
const loadEvent = cache(async (id: string) => {
  const event = await getEvent(id)
  // TODO(ch6-T3): không có sự kiện → gọi notFound() (Next hiện app/not-found.tsx) thay cho dòng throw dưới
  if (!event) throw new Error('TODO(ch6-T3): gọi notFound()')
  return event
})

// SEO: mỗi sự kiện một <title>, description, Open Graph riêng — HTML có sẵn từ server
// TODO(ch6-T3): SEO — trả về { title, description, openGraph: { title, description, type: 'article' } }
//   từ dữ liệu sự kiện: const { id } = await params; const event = await loadEvent(id);
//   description = 160 ký tự đầu của event.description. Kiểm chứng: e2e/events.spec.ts (toHaveTitle)
export async function generateMetadata({ params }: PageProps<'/events/[id]'>): Promise<Metadata> {
  void params
  void notFound
  return {}
}

export default async function EventDetailPage({ params }: PageProps<'/events/[id]'>) {
  const { id } = await params
  const [event, clubs, session] = await Promise.all([loadEvent(id), getClubs(), getSession()])
  const club = clubs.find((c) => c.id === event.clubId)
  const left = seatsLeft(event)
  await connection() // so với thời điểm request (không phải lúc prerender)
  const past = isPast(event, new Date())

  return (
    <PageContainer>
      <article className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-x-8">
        <header className="lg:col-span-2">
          <Link href="/events" className="text-primary underline underline-offset-4">
            ← Quay lại lịch sự kiện
          </Link>
          <h1 className="mt-3">{event.title}</h1>
          {club && (
            <p className="mt-2 text-ink-muted">
              Do <strong className="text-ink">{club.name}</strong> tổ chức
            </p>
          )}
        </header>

        <div className="grid gap-6">
          <Image
            src={getClubImage(event.clubId)}
            alt={`Biểu tượng ${club?.name ?? 'câu lạc bộ'}`}
            width={640}
            height={360}
            unoptimized
            className="aspect-video w-full rounded-md object-cover"
          />
          <section aria-labelledby="noi-dung-su-kien">
            <h2 id="noi-dung-su-kien" className="mb-3">
              Nội dung
            </h2>
            <p>{event.description}</p>
          </section>
        </div>

        <section aria-labelledby="thong-tin" className="self-start rounded-md border border-line bg-surface p-6 shadow-md lg:sticky lg:top-24">
          <h2 id="thong-tin" className="mb-4 text-xl">
            Thông tin chung
          </h2>
          <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold">Thời gian</dt>
            <dd>
              <time dateTime={event.startAt.toISOString()}>{formatDateTime(event.startAt)}</time>
            </dd>
            <dt className="font-semibold">Địa điểm</dt>
            <dd>{event.location}</dd>
            <dt className="font-semibold">Số chỗ</dt>
            <dd>
              {event.capacity} (còn {left} chỗ)
            </dd>
          </dl>
          {past ? (
            <p className="font-semibold text-ink-muted">Sự kiện đã diễn ra.</p>
          ) : (
            // Client Component nhỏ ở giữa trang Server Component: chỉ nút này cần JavaScript
            <RegisterEventButton eventId={event.id} isLoggedIn={session !== null} disabled={left === 0} />
          )}
        </section>
      </article>
    </PageContainer>
  )
}
