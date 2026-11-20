'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { registrationsApi } from '../api/registrations.api'

export const registrationKeys = {
  all: ['registrations'] as const,
  mine: () => [...registrationKeys.all, 'me'] as const,
}

export function useMyRegistrations(enabled = true) {
  return useQuery({
    queryKey: registrationKeys.mine(),
    queryFn: ({ signal }) => registrationsApi.mine(signal),
    enabled,
  })
}

// Sau khi đăng ký/huỷ: làm mới cache TanStack (client) VÀ yêu cầu server render lại
// (router.refresh) để số chỗ còn lại do Server Component hiển thị cũng cập nhật.
function useAfterChange() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return async () => {
    await queryClient.invalidateQueries({ queryKey: registrationKeys.all })
    router.refresh()
  }
}

export function useRegisterForEvent() {
  const afterChange = useAfterChange()
  return useMutation({ mutationFn: (eventId: string) => registrationsApi.register(eventId), onSuccess: afterChange })
}

export function useCancelRegistration() {
  const afterChange = useAfterChange()
  return useMutation({ mutationFn: (id: string) => registrationsApi.cancel(id), onSuccess: afterChange })
}

export function useCheckinCode() {
  return useMutation({ mutationFn: (registrationId: string) => registrationsApi.checkinCode(registrationId) })
}
