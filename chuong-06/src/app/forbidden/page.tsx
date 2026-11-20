import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonClass } from '../../shared/ui/button-styles'
import { PageContainer } from '../../shared/ui/PageContainer'

export const metadata: Metadata = { title: 'Không có quyền' }

// proxy.ts rewrite tới đây khi Member mở trang /admin/*
export default function ForbiddenPage() {
  return (
    <PageContainer narrow>
      <p className="text-6xl font-bold text-accent-strong">403</p>
      <h1 className="mt-2">Bạn không có quyền vào trang này</h1>
      <p className="mt-3 mb-6 text-lg text-ink-muted">Trang quản trị chỉ dành cho tài khoản Admin.</p>
      <Link href="/" className={buttonClass()}>
        Về trang chủ
      </Link>
    </PageContainer>
  )
}
