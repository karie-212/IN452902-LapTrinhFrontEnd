import { ClubCard } from '../features/clubs/components/ClubCard'
import { useClubs } from '../features/clubs/hooks/use-clubs'
import { ErrorState } from '../shared/ui/ErrorState'
import { PageContainer } from '../shared/ui/PageContainer'
import { Spinner } from '../shared/ui/Spinner'

export function ClubsPage() {
  const clubs = useClubs()

  return (
    <PageContainer>
      <h1>Câu lạc bộ</h1>
      {clubs.isPending ? (
        <Spinner />
      ) : clubs.isError ? (
        <ErrorState error={clubs.error} onRetry={() => clubs.refetch()} />
      ) : (
        <>
          <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
            {clubs.data.length} câu lạc bộ đang hoạt động tại Trường Đại học Đồng Tháp.
          </p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-6">
            {clubs.data.map((club) => (
              <li key={club.id}>
                <ClubCard club={club} />
              </li>
            ))}
          </ul>
        </>
      )}
    </PageContainer>
  )
}
