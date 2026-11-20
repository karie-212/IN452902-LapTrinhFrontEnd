'use client'

import Link from 'next/link'
import { errorMessage } from '../../../shared/api/api-error'
import { formatDateTime } from '../../../shared/lib/format'
import { buttonClass } from '../../../shared/ui/button-styles'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { Spinner } from '../../../shared/ui/Spinner'
import { toast } from '../../../shared/ui/toast'
import { useCancelRegistration, useCheckinCode, useMyRegistrations } from '../hooks/use-registrations'
import { statusLabels, type Registration } from '../model/registration'

// Trang cá nhân, nhiều tương tác → Client Component + TanStack Query (dữ liệu lấy qua BFF)
export function MyRegistrationList() {
  const registrations = useMyRegistrations()

  if (registrations.isPending) return <Spinner />
  if (registrations.isError) {
    return (
      <p role="alert" className="font-semibold text-danger">
        {errorMessage(registrations.error)}
      </p>
    )
  }
  if (registrations.data.length === 0) {
    return (
      <EmptyState>
        Bạn chưa đăng ký sự kiện nào.{' '}
        <Link href="/events" className="text-primary underline">
          Xem lịch sự kiện
        </Link>
      </EmptyState>
    )
  }
  return (
    <ul className="grid gap-4">
      {registrations.data.map((r) => (
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
          <Link href={`/events/${event.id}`} className="hover:text-primary">
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
          <button
            type="button"
            className={buttonClass('secondary')}
            disabled={checkin.isPending}
            onClick={() => checkin.mutate(registration.id, { onError: (e) => toast(errorMessage(e), 'error') })}
          >
            Lấy mã check-in
          </button>
          <button
            type="button"
            className={buttonClass('ghost')}
            disabled={cancel.isPending}
            onClick={() =>
              cancel.mutate(registration.id, {
                onSuccess: () => toast('Đã huỷ đăng ký.', 'info'),
                onError: (e) => toast(errorMessage(e), 'error'),
              })
            }
          >
            Huỷ đăng ký
          </button>
          {checkin.data && <code className="rounded-sm bg-surface-muted px-3 py-1 font-mono text-sm break-all">{checkin.data}</code>}
        </div>
      )}
    </article>
  )
}
