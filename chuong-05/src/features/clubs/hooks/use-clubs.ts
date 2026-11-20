import { useQuery } from '@tanstack/react-query'
import { clubsApi } from '../api/clubs.api'

export const clubKeys = {
  all: ['clubs'] as const,
  list: () => [...clubKeys.all, 'list'] as const,
}

export function useClubs() {
  return useQuery({
    queryKey: clubKeys.list(),
    queryFn: ({ signal }) => clubsApi.list(signal),
    staleTime: 5 * 60_000, // danh sách CLB ít đổi: 5 phút mới hỏi lại server
  })
}
