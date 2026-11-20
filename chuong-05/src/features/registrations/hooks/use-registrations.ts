import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../auth/store'
import { eventKeys } from '../../events/hooks/use-events'
import { registrationsApi } from '../api/registrations.api'

export const registrationKeys = {
  all: ['registrations'] as const,
  mine: () => [...registrationKeys.all, 'me'] as const,
  forEvent: (eventId: string) => [...registrationKeys.all, 'event', eventId] as const,
}

export function useMyRegistrations() {
  const isLoggedIn = useAuthStore((s) => s.member !== null)
  return useQuery({
    queryKey: registrationKeys.mine(),
    queryFn: ({ signal }) => registrationsApi.mine(signal),
    enabled: isLoggedIn, // chưa đăng nhập thì không gọi (sẽ bị 401)
  })
}

export function useEventRegistrations(eventId: string) {
  return useQuery({
    queryKey: registrationKeys.forEvent(eventId),
    queryFn: ({ signal }) => registrationsApi.forEvent(eventId, signal),
  })
}

// Đăng ký / huỷ làm đổi registeredCount của sự kiện → làm mới cả cache sự kiện
function useInvalidateAfterChange() {
  const queryClient = useQueryClient()
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: registrationKeys.all }),
      queryClient.invalidateQueries({ queryKey: eventKeys.all }),
    ])
}

export function useRegisterForEvent() {
  const invalidate = useInvalidateAfterChange()
  return useMutation({
    mutationFn: (eventId: string) => registrationsApi.register(eventId),
    onSuccess: invalidate,
  })
}

export function useCancelRegistration() {
  const invalidate = useInvalidateAfterChange()
  return useMutation({
    mutationFn: (id: string) => registrationsApi.cancel(id),
    onSuccess: invalidate,
  })
}

export function useConfirmRegistration() {
  const invalidate = useInvalidateAfterChange()
  return useMutation({
    mutationFn: (id: string) => registrationsApi.confirm(id),
    onSuccess: invalidate,
  })
}

export function useCheckinCode() {
  return useMutation({
    mutationFn: (registrationId: string) => registrationsApi.checkinCode(registrationId),
  })
}
