import { Outlet } from 'react-router'
import type { Role } from '../model/member'

// TODO(ch5-T5): route bảo vệ
//   - const session = useSessionRestore(); const member = useAuthStore((s) => s.member)
//   - chưa có member và session.isPending → <Spinner label="Đang kiểm tra đăng nhập…" />
//   - chưa đăng nhập → <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />
//   - có role mà member.role khác → <ErrorState error={new Error('Bạn không có quyền vào trang này.')} />
//   - còn lại → <Outlet />
// Test: src/pages/pages.test.tsx ("chưa đăng nhập mở /my-events → chuyển sang /login…")
export function ProtectedRoute({ role }: { role?: Role }) {
  void role
  return <Outlet />
}
