import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { isApiError } from '../api/api-error'
import { toast } from '../ui/toast'

/**
 * Đưa lỗi server lên form:
 * - 400 có errors theo field → setError đúng ô (đổi tên field server → field form qua fieldMap)
 * - 409 (trùng, hết chỗ…) → toast
 * - lỗi khác → lỗi chung của form (root.server)
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldMap: Record<string, Path<T>> = {},
) {
  if (isApiError(error) && error.code === 'conflict') {
    toast(error.message, 'error')
    return
  }
  const fieldErrors = isApiError(error) ? Object.entries(error.fieldErrors) : []
  let focused = false
  for (const [serverField, message] of fieldErrors) {
    const field = fieldMap[serverField] ?? (serverField as Path<T>)
    setError(field, { type: 'server', message }, { shouldFocus: !focused })
    focused = true
  }
  if (fieldErrors.length === 0) {
    setError('root.server', { type: 'server', message: error instanceof Error ? error.message : 'Đã có lỗi xảy ra.' })
  }
}
