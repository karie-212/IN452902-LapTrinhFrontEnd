import type { ReactNode } from 'react'

export function PageContainer({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return (
    <div className={`mx-auto w-full px-4 py-8 sm:px-6 ${narrow ? 'max-w-narrow' : 'max-w-page'}`}>{children}</div>
  )
}
