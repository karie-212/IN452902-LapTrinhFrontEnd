import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { LoginForm } from '../features/auth/components/LoginForm'
import { PageContainer } from '../shared/ui/PageContainer'

// Chỉ cho chuyển tiếp tới đường dẫn nội bộ (tránh ?redirect=https://trang-la.com)
function safeRedirect(value: string | null): string {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/'
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const justRegistered = (location.state as { registered?: boolean } | null)?.registered

  return (
    <PageContainer narrow>
      <h1>Đăng nhập</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-primary underline underline-offset-4">
          Tạo tài khoản
        </Link>
      </p>
      {justRegistered && (
        <p role="status" className="mb-4 rounded-sm bg-surface-muted px-4 py-3 font-semibold text-success">
          Tạo tài khoản thành công. Hãy đăng nhập.
        </p>
      )}
      <LoginForm onSuccess={() => navigate(safeRedirect(searchParams.get('redirect')), { replace: true })} />
    </PageContainer>
  )
}
