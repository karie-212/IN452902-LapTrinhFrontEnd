import { ClubCard } from '../components/ClubCard'
import { PageContainer } from '../components/PageContainer'
import { clubs, events } from '../data'

export function ClubsPage() {
  return (
    <PageContainer>
      <h1>Câu lạc bộ</h1>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        {clubs.length} câu lạc bộ đang hoạt động tại Trường Đại học Đồng Tháp.
      </p>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
        {clubs.map((club) => (
          <li key={club.id}>
            <ClubCard club={club} eventCount={events.filter((e) => e.clubId === club.id).length} />
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
