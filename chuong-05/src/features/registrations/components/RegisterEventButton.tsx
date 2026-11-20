import { useLocation } from 'react-router'
import { errorMessage } from '../../../shared/api/api-error'
import { Button, ButtonLink } from '../../../shared/ui/Button'
import { toast } from '../../../shared/ui/toast'
import { useCurrentMember } from '../../auth/hooks/use-auth'
import { useCancelRegistration, useMyRegistrations, useRegisterForEvent } from '../hooks/use-registrations'
import { statusLabels } from '../model/registration'

type RegisterEventButtonProps = {
  eventId: string
  disabled?: boolean // hết chỗ hoặc đã diễn ra
}

export function RegisterEventButton({ eventId, disabled = false }: RegisterEventButtonProps) {
  const member = useCurrentMember()
  const location = useLocation()
  const myRegistrations = useMyRegistrations()
  const registerForEvent = useRegisterForEvent()
  const cancel = useCancelRegistration()

  if (!member) {
    return (
      <ButtonLink to={`/login?redirect=${encodeURIComponent(location.pathname)}`} className="w-full">
        Đăng nhập để đăng ký
      </ButtonLink>
    )
  }

  const current = myRegistrations.data?.find((r) => r.eventId === eventId && r.status !== 'Cancelled')

  if (current) {
    return (
      <div className="grid gap-2">
        <p role="status" className="font-semibold text-success">
          Bạn đã đăng ký · {statusLabels[current.status]}
        </p>
        <Button
          variant="secondary"
          disabled={cancel.isPending}
          onClick={() =>
            cancel.mutate(current.id, {
              onSuccess: () => toast('Đã huỷ đăng ký.', 'info'),
              onError: (error) => toast(errorMessage(error), 'error'),
            })
          }
        >
          {cancel.isPending ? 'Đang huỷ…' : 'Huỷ đăng ký'}
        </Button>
      </div>
    )
  }

  return (
    <Button
      className="w-full"
      disabled={disabled || registerForEvent.isPending || myRegistrations.isPending}
      onClick={() =>
        registerForEvent.mutate(eventId, {
          onSuccess: () => toast('Đăng ký thành công! Xem ở "Sự kiện của tôi".', 'success'),
          // 409 "Bạn đã đăng ký" / "Sự kiện đã hết chỗ" → toast
          onError: (error) => toast(errorMessage(error), 'error'),
        })
      }
    >
      {registerForEvent.isPending ? 'Đang đăng ký…' : 'Đăng ký tham gia'}
    </Button>
  )
}
