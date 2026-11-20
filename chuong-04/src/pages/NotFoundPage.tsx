import { Link } from 'react-router'
import { PageContainer } from '../components/PageContainer'

// TODO(ch4-T3): gắn trang này vào route "*" trong app/router.tsx,
//  và dùng lại ở EventDetailPage khi không tìm thấy sự kiện.
export function NotFoundPage({ message = 'Trang bạn tìm không tồn tại hoặc đã được chuyển đi.' }) {
  return (
    <PageContainer narrow>
      <p className="text-6xl font-bold text-accent-strong">404</p>
      <h1 className="mt-2">Không tìm thấy trang</h1>
      <p className="mt-3 mb-6 text-lg text-ink-muted">{message}</p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-2 font-semibold text-on-primary hover:bg-primary-hover"
      >
        Về trang chủ
      </Link>
    </PageContainer>
  )
}
