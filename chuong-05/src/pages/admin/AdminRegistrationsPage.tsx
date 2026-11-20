import { Link, useParams } from 'react-router'
import { useEvent } from '../../features/events/hooks/use-events'
import { RegistrationTable } from '../../features/registrations/components/RegistrationTable'
import { useEventRegistrations } from '../../features/registrations/hooks/use-registrations'
import { ErrorState } from '../../shared/ui/ErrorState'
import { PageContainer } from '../../shared/ui/PageContainer'
import { Spinner } from '../../shared/ui/Spinner'

export function AdminRegistrationsPage() {
  const { eventId = '' } = useParams()
  const event = useEvent(eventId)
  const registrations = useEventRegistrations(eventId)

  return (
    <PageContainer>
      <Link to="/admin/events" className="text-primary underline underline-offset-4">
        ← Quản lý sự kiện
      </Link>
      <h1 className="mt-3 mb-6">Đăng ký: {event.data?.title ?? '…'}</h1>
      {registrations.isPending ? (
        <Spinner />
      ) : registrations.isError ? (
        <ErrorState error={registrations.error} onRetry={() => registrations.refetch()} />
      ) : (
        <RegistrationTable registrations={registrations.data} />
      )}
    </PageContainer>
  )
}
