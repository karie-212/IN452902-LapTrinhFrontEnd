import { create } from 'zustand'
import type { Member } from './model/member'

// Trạng thái đăng nhập (client state) — để ở Zustand, KHÔNG ở TanStack Query.
// Access token chỉ nằm trong bộ nhớ: tải lại trang thì mất, app xin lại bằng cookie refresh.
type AuthState = {
  accessToken: string | null
  member: Member | null
  setToken: (token: string) => void
  setSession: (token: string, member: Member) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  member: null,
  setToken: (accessToken) => set({ accessToken }),
  setSession: (accessToken, member) => set({ accessToken, member }),
  clear: () => set({ accessToken: null, member: null }),
}))
