import { Link } from 'react-router'
import { PageContainer } from '../components/PageContainer'

// TODO(ch4-T3): Trang chi tiết cho route "events/:eventId".
//  - Đọc eventId bằng useParams(), tìm bằng findEvent(eventId) trong ../data
//  - Không thấy → return <NotFoundPage message="Không tìm thấy sự kiện này…" />
//  - Bố cục 2 cột ở lg giống event-detail.html của Ch02: tiêu đề + "Do <CLB> tổ chức",
//    ảnh CLB, mục "Nội dung", hộp "Thông tin chung" (<dl>: Thời gian, Địa điểm, Số chỗ)
//    dính bên phải (lg:sticky), nút "Đăng ký thành viên để giữ chỗ" → /register
export function EventDetailPage() {
  return (
    <PageContainer>
      <Link to="/events" className="text-primary underline underline-offset-4">
        ← Quay lại lịch sự kiện
      </Link>
      <h1 className="mt-3">TODO(ch4-T3): chi tiết sự kiện</h1>
    </PageContainer>
  )
}
