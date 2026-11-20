import { Spinner } from '../../../../shared/ui/Spinner'

// loading.tsx = <Suspense> bọc quanh page.tsx: hiện ngay khi chuyển trang, nội dung thật stream tới sau
export default function Loading() {
  return <Spinner label="Đang tải sự kiện…" />
}
