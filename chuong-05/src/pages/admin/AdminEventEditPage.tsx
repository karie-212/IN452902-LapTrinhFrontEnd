import { useNavigate, useParams } from 'react-router'
import { useClubs } from '../../features/clubs/hooks/use-clubs'
import { EventForm } from '../../features/events/components/EventForm'
import { useEvent, useUpdateEvent } from '../../features/events/hooks/use-events'
import { toEventFormInput } from '../../features/events/model/event.mapper'
import { ErrorState } from '../../shared/ui/ErrorState'
import { PageContainer } from '../../shared/ui/PageContainer'
import { Spinner } from '../../shared/ui/Spinner'
import { toast } from '../../shared/ui/toast'

export function AdminEventEditPage() {
  const { eventId = '' } = useParams()
  const navigate = useNavigate()
  const event = useEvent(eventId)
  const clubs = useClubs()
  const updateEvent = useUpdateEvent(eventId)

  return (
    <PageContainer narrow>
      <h1 className="mb-6">Sửa sự kiện</h1>
      {event.isPending || clubs.isPending ? (
        <Spinner />
      ) : event.isError ? (
        <ErrorState error={event.error} />
      ) : (
        <EventForm
          clubs={clubs.data ?? []}
          defaultValues={toEventFormInput(event.data)}
          lockClub
          submitLabel="Lưu thay đổi"
          onSubmit={async (values) => {
            await updateEvent.mutateAsync(values)
            toast('Đã lưu thay đổi.', 'success')
            navigate('/admin/events')
          }}
        />
      )}
    </PageContainer>
  )
}
