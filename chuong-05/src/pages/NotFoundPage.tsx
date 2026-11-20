import { ButtonLink } from '../shared/ui/Button'
import { PageContainer } from '../shared/ui/PageContainer'

export function NotFoundPage({ message = 'Trang bạn tìm không tồn tại hoặc đã được chuyển đi.' }) {
  return (
    <PageContainer narrow>
      <p className="text-6xl font-bold text-accent-strong">404</p>
      <h1 className="mt-2">Không tìm thấy trang</h1>
      <p className="mt-3 mb-6 text-lg text-ink-muted">{message}</p>
      <ButtonLink to="/">Về trang chủ</ButtonLink>
    </PageContainer>
  )
}
