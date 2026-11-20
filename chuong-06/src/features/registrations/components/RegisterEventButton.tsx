'use client'

import Link from 'next/link'
import { errorMessage } from '../../../shared/api/api-error'
import { buttonClass } from '../../../shared/ui/button-styles'
import { toast } from '../../../shared/ui/toast'
import { useCancelRegistration, useMyRegistrations, useRegisterForEvent } from '../hooks/use-registrations'
import { statusLabels } from '../model/registration'

type RegisterEventButtonProps = {
  eventId: string
  isLoggedIn: boolean // Server Component đọc cookie rồi truyền xuống
  disabled?: boolean
}

export function RegisterEventButton({ eventId, isLoggedIn, disabled = false }: RegisterEventButtonProps) {
  const myRegistrations = useMyRegistrations(isLoggedIn)
  const registerForEvent = useRegisterForEvent()
  const cancel = useCancelRegistration()

  if (!isLoggedIn) {
    return (
      <Link href={`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`} className={buttonClass('primary', 'w-full')}>
        Đăng nhập để đăng ký
      </Link>
    )
  }

  const current = myRegistrations.data?.find((r) => r.eventId === eventId && r.status !== 'Cancelled')

  if (current) {
    return (
      <div className="grid gap-2">
        <p role="status" className="font-semibold text-success">
          Bạn đã đăng ký · {statusLabels[current.status]}
        </p>
        <button
          type="button"
          className={buttonClass('secondary')}
          disabled={cancel.isPending}
          onClick={() =>
            cancel.mutate(current.id, {
              onSuccess: () => toast('Đã huỷ đăng ký.', 'info'),
              onError: (error) => toast(errorMessage(error), 'error'),
            })
          }
        >
          {cancel.isPending ? 'Đang huỷ…' : 'Huỷ đăng ký'}
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className={buttonClass('primary', 'w-full')}
      disabled={disabled || registerForEvent.isPending || myRegistrations.isPending}
      onClick={() =>
        registerForEvent.mutate(eventId, {
          onSuccess: () => toast('Đăng ký thành công! Xem ở "Sự kiện của tôi".', 'success'),
          onError: (error) => toast(errorMessage(error), 'error'), // 409 → toast
        })
      }
    >
      {registerForEvent.isPending ? 'Đang đăng ký…' : 'Đăng ký tham gia'}
    </button>
  )
}
