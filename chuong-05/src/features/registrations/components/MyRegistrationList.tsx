import { Link } from 'react-router'
import { errorMessage } from '../../../shared/api/api-error'
import { formatDateTime } from '../../../shared/lib/format'
import { Button } from '../../../shared/ui/Button'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { toast } from '../../../shared/ui/toast'
import { useCancelRegistration, useCheckinCode } from '../hooks/use-registrations'
import { statusLabels, type Registration } from '../model/registration'

export function MyRegistrationList({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) {
    return (
      <EmptyState>
        Bạn chưa đăng ký sự kiện nào.{' '}
        <Link to="/events" className="text-primary underline">
          Xem lịch sự kiện
        </Link>
      </EmptyState>
    )
  }
  return (
    <ul className="grid gap-4">
      {registrations.map((r) => (
        <li key={r.id}>
          <RegistrationItem registration={r} />
        </li>
      ))}
    </ul>
  )
}

function RegistrationItem({ registration }: { registration: Registration }) {
  const cancel = useCancelRegistration()
  const checkin = useCheckinCode()
  const { event, status } = registration
  const active = status !== 'Cancelled'

  return (
    <article className={`grid gap-2 rounded-md border border-line bg-surface p-5 ${active ? '' : 'opacity-70'}`}>
      <h3 className="text-lg font-bold">
        {event ? (
          <Link to={`/events/${event.id}`} className="hover:text-primary">
            {event.title}
          </Link>
        ) : (
          'Sự kiện'
        )}
      </h3>
      {event && (
        <p className="text-sm text-ink-muted">
          {formatDateTime(event.startAt)} · {event.location}
        </p>
      )}
      <p className="text-sm">
        Trạng thái: <strong>{statusLabels[status]}</strong>
        {registration.checkedInAt && ' · Đã check-in'}
      </p>
      {active && (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            disabled={checkin.isPending}
            onClick={() => checkin.mutate(registration.id, { onError: (e) => toast(errorMessage(e), 'error') })}
          >
            Lấy mã check-in
          </Button>
          <Button
            variant="ghost"
            disabled={cancel.isPending}
            onClick={() =>
              cancel.mutate(registration.id, {
                onSuccess: () => toast('Đã huỷ đăng ký.', 'info'),
                onError: (e) => toast(errorMessage(e), 'error'),
              })
            }
          >
            Huỷ đăng ký
          </Button>
          {checkin.data && (
            <code className="rounded-sm bg-surface-muted px-3 py-1 font-mono text-sm break-all">{checkin.data}</code>
          )}
        </div>
      )}
    </article>
  )
}
