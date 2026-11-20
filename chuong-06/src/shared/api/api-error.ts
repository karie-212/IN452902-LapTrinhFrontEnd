import { z } from 'zod'

// Mọi lỗi HTTP trong ứng dụng đều được chuẩn hoá về ApiError — component chỉ cần
// đọc error.message (câu tiếng Việt cho người dùng) và error.fieldErrors (lỗi theo ô).
export type ApiErrorCode =
  | 'network'
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'unprocessable'
  | 'server'
  | 'invalid_response'
  | 'unknown'

export type FieldErrors = Record<string, string>

const DEFAULT_MESSAGES: Record<ApiErrorCode, string> = {
  network: 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.',
  bad_request: 'Dữ liệu gửi lên chưa hợp lệ.',
  unauthorized: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  forbidden: 'Bạn không có quyền thực hiện thao tác này.',
  not_found: 'Không tìm thấy dữ liệu yêu cầu.',
  conflict: 'Dữ liệu bị trùng hoặc xung đột.',
  unprocessable: 'Dữ liệu không xử lý được.',
  server: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.',
  invalid_response: 'Dữ liệu máy chủ trả về không đúng định dạng.',
  unknown: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
}

export class ApiError extends Error {
  readonly status: number // 0 = không nhận được response
  readonly code: ApiErrorCode
  readonly fieldErrors: FieldErrors

  constructor(init: { status: number; code: ApiErrorCode; message?: string; fieldErrors?: FieldErrors }) {
    super(init.message ?? DEFAULT_MESSAGES[init.code])
    this.name = 'ApiError'
    this.status = init.status
    this.code = init.code
    this.fieldErrors = init.fieldErrors ?? {}
  }
}

// ProblemDetails (RFC 9457) — dạng lỗi của mock API và ASP.NET Core.
// looseObject: giữ các trường lạ, vì mỗi backend có thể gửi thêm (traceId…)
const problemDetailsSchema = z.looseObject({
  title: z.string().optional(),
  detail: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
})

function codeFromStatus(status: number | undefined): ApiErrorCode {
  if (!status) return 'network'
  if (status === 400) return 'bad_request'
  if (status === 401) return 'unauthorized'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'not_found'
  if (status === 409) return 'conflict'
  if (status === 422) return 'unprocessable'
  if (status >= 500) return 'server'
  return 'unknown'
}

/**
 * Hàm dùng chung cho mọi đường HTTP (interceptor axios ở Ch5, serverFetch ở Ch6):
 * nhận mã trạng thái + body lỗi → ApiError.
 */
export function toApiError(status: number | undefined, body: unknown): ApiError {
  const code = codeFromStatus(status)
  const parsed = problemDetailsSchema.safeParse(body)
  const problem = parsed.success ? parsed.data : {}

  const fieldErrors: FieldErrors = {}
  for (const [field, messages] of Object.entries(problem.errors ?? {})) {
    if (messages[0]) fieldErrors[field] = messages[0]
  }

  // Lỗi 5xx: không đưa chi tiết kỹ thuật của server ra giao diện
  const message = code === 'server' || code === 'network' ? undefined : problem.detail

  return new ApiError({ status: status ?? 0, code, message, fieldErrors })
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

// Thông báo hiển thị được cho mọi loại lỗi (ApiError, Error thường, giá trị lạ)
export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return DEFAULT_MESSAGES.unknown
}
