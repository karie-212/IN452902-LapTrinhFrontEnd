'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { isApiError } from '../shared/api/api-error'
import { Toaster } from '../shared/ui/Toaster'

// Client Component bọc ngoài: TanStack Query + Toaster cho các phần tương tác.
// useState(() => new QueryClient()) → mỗi trình duyệt một QueryClient, không chia sẻ giữa các request trên server.
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: (count, error) => !(isApiError(error) && error.status >= 400 && error.status < 500) && count < 2,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}
