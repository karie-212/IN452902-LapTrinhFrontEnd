import { useNavigate } from 'react-router'
import { useClubs } from '../../features/clubs/hooks/use-clubs'
import { EventForm } from '../../features/events/components/EventForm'
import { useCreateEvent } from '../../features/events/hooks/use-events'
import { PageContainer } from '../../shared/ui/PageContainer'
import { Spinner } from '../../shared/ui/Spinner'
import { toast } from '../../shared/ui/toast'

export function AdminEventCreatePage() {
  const navigate = useNavigate()
  const clubs = useClubs()
  const createEvent = useCreateEvent()

  return (
    <PageContainer narrow>
      <h1 className="mb-6">Tạo sự kiện</h1>
      {clubs.isPending ? (
        <Spinner />
      ) : (
        <EventForm
          clubs={clubs.data ?? []}
          submitLabel="Tạo sự kiện"
          onSubmit={async (values) => {
            const created = await createEvent.mutateAsync(values)
            toast(`Đã tạo "${created.title}".`, 'success')
            navigate('/admin/events')
          }}
        />
      )}
    </PageContainer>
  )
}
