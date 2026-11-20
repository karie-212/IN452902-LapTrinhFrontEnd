import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import type { LoginValues, RegisterValues } from '../model/auth.schema'
import type { Member } from '../model/member'
import { useAuthStore } from '../store'

export const authKeys = {
  session: ['auth', 'session'] as const,
}

// Mở/tải lại trang: thử đổi cookie refresh lấy access token mới, rồi đọc thông tin
// người dùng. Dùng useQuery (thay vì useEffect) nên React StrictMode gọi 2 lần
// cũng chỉ có MỘT request — quan trọng vì mỗi refresh token chỉ dùng được một lần.
export function useSessionRestore() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: async (): Promise<Member | null> => {
      try {
        const token = await authApi.refresh()
        useAuthStore.getState().setToken(token)
        const member = await authApi.me()
        useAuthStore.getState().setSession(token, member)
        return member
      } catch {
        return null // chưa đăng nhập
      }
    },
    staleTime: Infinity,
    retry: false,
  })
}

export function useCurrentMember() {
  return useAuthStore((s) => s.member)
}

// TODO(ch5-T5): mutation đăng nhập. Trong mutationFn:
//   1. token = await authApi.login(values)
//   2. useAuthStore.getState().setToken(token) — để request /me ngay sau đó có header Bearer
//   3. member = await authApi.me(); useAuthStore.getState().setSession(token, member); return member
//   4. /me lỗi thì clear() store rồi ném lỗi tiếp
// Test: use-auth.test.tsx
export function useLogin() {
  return useMutation({
    mutationFn: async (values: LoginValues): Promise<Member> => {
      void values
      throw new Error('TODO(ch5-T5): viết useLogin')
    },
  })
}

export function useRegisterAccount() {
  return useMutation({
    mutationFn: ({ studentId, name, email, password }: RegisterValues) =>
      authApi.register({ studentId, name, email, password }),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      useAuthStore.getState().clear()
      queryClient.clear() // xoá cache của người dùng cũ (đăng ký của tôi…)
    },
  })
}
