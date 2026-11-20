import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '../../features/auth/components/LoginForm'
import { PageContainer } from '../../shared/ui/PageContainer'

export const metadata: Metadata = { title: 'Đăng nhập' }

export default function LoginPage({ searchParams }: PageProps<'/login'>) {
  return (
    <PageContainer narrow>
      <h1>Đăng nhập</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">
        Tài khoản thử: <code>sv1@dthu.edu.vn</code> / <code>Member@123</code>
      </p>
      <Suspense>
        <LoginFormWithRedirect searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  )
}

async function LoginFormWithRedirect({ searchParams }: Pick<PageProps<'/login'>, 'searchParams'>) {
  const { redirect } = await searchParams
  return <LoginForm redirectTo={typeof redirect === 'string' ? redirect : '/'} />
}
