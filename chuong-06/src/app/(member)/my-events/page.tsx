import type { Metadata } from 'next'
import { MyRegistrationList } from '../../../features/registrations/components/MyRegistrationList'
import { PageContainer } from '../../../shared/ui/PageContainer'

export const metadata: Metadata = { title: 'Sự kiện của tôi' }

// proxy.ts đã chặn người chưa đăng nhập. Danh sách lấy ở trình duyệt (TanStack Query + BFF).
export default function MyEventsPage() {
  return (
    <PageContainer narrow>
      <h1>Sự kiện của tôi</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">Các sự kiện bạn đã đăng ký. Đến nơi, đưa mã check-in cho ban tổ chức.</p>
      <MyRegistrationList />
    </PageContainer>
  )
}
