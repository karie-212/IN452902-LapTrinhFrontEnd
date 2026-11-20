import { errorMessage } from '../../../shared/api/api-error'
import { formatDateTime } from '../../../shared/lib/format'
import { Button } from '../../../shared/ui/Button'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { toast } from '../../../shared/ui/toast'
import { useConfirmRegistration } from '../hooks/use-registrations'
import { statusLabels, type Registration } from '../model/registration'

// Bảng đăng ký của một sự kiện (Admin): xác nhận đăng ký đang chờ
export function RegistrationTable({ registrations }: { registrations: Registration[] }) {
  const confirm = useConfirmRegistration()
  if (registrations.length === 0) return <EmptyState>Chưa có ai đăng ký sự kiện này.</EmptyState>

  return (
    <div className="overflow-x-auto rounded-md border border-line bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-muted">
          <tr>
            <th className="p-3">Sinh viên</th>
            <th className="p-3">MSSV</th>
            <th className="p-3">Đăng ký lúc</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">
              <span className="sr-only">Thao tác</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => (
            <tr key={r.id} className="border-t border-line">
              <td className="p-3">{r.member?.name ?? r.memberId}</td>
              <td className="p-3">{r.member?.studentId}</td>
              <td className="p-3">{formatDateTime(r.registeredAt)}</td>
              <td className="p-3">
                {statusLabels[r.status]}
                {r.checkedInAt && ' · đã check-in'}
              </td>
              <td className="p-3 text-right">
                {r.status === 'Pending' && (
                  <Button
                    variant="secondary"
                    disabled={confirm.isPending}
                    onClick={() =>
                      confirm.mutate(r.id, {
                        onSuccess: () => toast('Đã xác nhận đăng ký.', 'success'),
                        onError: (e) => toast(errorMessage(e), 'error'),
                      })
                    }
                  >
                    Xác nhận
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
