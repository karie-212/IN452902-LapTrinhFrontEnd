'use client'

import { buttonClass } from '../shared/ui/button-styles'
import { PageContainer } from '../shared/ui/PageContainer'

// error.tsx bắt lỗi khi render route (vd. API tắt). Phải là Client Component.
// Ở bản production, Next ẩn chi tiết lỗi server → chỉ hiện câu chung.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PageContainer narrow>
      <div role="alert" className="grid justify-items-start gap-4 rounded-md border border-danger/40 bg-warning-soft p-8">
        <h1 className="text-2xl">Không tải được dữ liệu</h1>
        <p>{process.env.NODE_ENV === 'development' ? error.message : 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.'}</p>
        <button type="button" onClick={reset} className={buttonClass('secondary')}>
          Thử lại
        </button>
      </div>
    </PageContainer>
  )
}
