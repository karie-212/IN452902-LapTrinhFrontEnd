import { MyRegistrationList } from '../features/registrations/components/MyRegistrationList'
import { useMyRegistrations } from '../features/registrations/hooks/use-registrations'
import { ErrorState } from '../shared/ui/ErrorState'
import { PageContainer } from '../shared/ui/PageContainer'
import { Spinner } from '../shared/ui/Spinner'

export function MyEventsPage() {
  const registrations = useMyRegistrations()
  return (
    <PageContainer narrow>
      <h1>Sự kiện của tôi</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">
        Các sự kiện bạn đã đăng ký. Đến nơi, đưa mã check-in cho ban tổ chức.
      </p>
      {registrations.isPending ? (
        <Spinner />
      ) : registrations.isError ? (
        <ErrorState error={registrations.error} onRetry={() => registrations.refetch()} />
      ) : (
        <MyRegistrationList registrations={registrations.data} />
      )}
    </PageContainer>
  )
}
