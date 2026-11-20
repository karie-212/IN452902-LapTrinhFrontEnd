import Link from 'next/link'
import { buttonClass } from '../shared/ui/button-styles'
import { PageContainer } from '../shared/ui/PageContainer'

export default function NotFound() {
  return (
    <PageContainer narrow>
      <p className="text-6xl font-bold text-accent-strong">404</p>
      <h1 className="mt-2">Không tìm thấy trang</h1>
      <p className="mt-3 mb-6 text-lg text-ink-muted">Trang bạn tìm không tồn tại hoặc đã được chuyển đi.</p>
      <Link href="/" className={buttonClass()}>
        Về trang chủ
      </Link>
    </PageContainer>
  )
}
