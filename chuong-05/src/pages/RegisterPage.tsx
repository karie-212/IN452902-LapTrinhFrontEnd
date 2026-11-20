import { Link, useNavigate } from 'react-router'
import { RegisterForm } from '../features/auth/components/RegisterForm'
import { PageContainer } from '../shared/ui/PageContainer'

export function RegisterPage() {
  const navigate = useNavigate()
  return (
    <PageContainer narrow>
      <h1>Tạo tài khoản thành viên</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-primary underline underline-offset-4">
          Đăng nhập
        </Link>
      </p>
      <RegisterForm onSuccess={() => navigate('/login', { state: { registered: true } })} />
    </PageContainer>
  )
}
