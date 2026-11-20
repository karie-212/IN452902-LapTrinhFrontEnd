import { errorMessage } from '../api/api-error'
import { Button } from './Button'

type ErrorStateProps = {
  error: unknown
  onRetry?: () => void
}

// Hiển thị lỗi đã chuẩn hoá (ApiError.message là câu tiếng Việt cho người dùng)
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="grid justify-items-center gap-3 rounded-md border border-danger/40 bg-warning-soft p-8 text-center">
      <p className="font-semibold text-danger">{errorMessage(error)}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  )
}
