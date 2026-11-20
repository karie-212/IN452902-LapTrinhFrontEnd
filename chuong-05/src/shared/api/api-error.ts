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

/**
 * Hàm dùng chung cho mọi đường HTTP (interceptor axios ở Ch5, serverFetch ở Ch6):
 * nhận mã trạng thái + body lỗi → ApiError.
 */
export function toApiError(status: number | undefined, body: unknown): ApiError {
  // TODO(ch5-T1): chuẩn hoá lỗi. Test: api-error.test.ts
  //  1. Đổi status → code: không có status → 'network'; 400 → 'bad_request'; 401 → 'unauthorized';
  //     403 → 'forbidden'; 404 → 'not_found'; 409 → 'conflict'; 422 → 'unprocessable'; ≥ 500 → 'server'; còn lại 'unknown'
  //  2. Đọc body bằng problemDetailsSchema.safeParse(body) (body có thể không phải ProblemDetails)
  //  3. fieldErrors: với mỗi field trong problem.errors, lấy câu lỗi ĐẦU TIÊN
  //  4. message: dùng problem.detail; riêng 'server' và 'network' để undefined (dùng câu mặc định,
  //     không lộ chi tiết kỹ thuật của server)
  void problemDetailsSchema
  void body
  return new ApiError({ status: status ?? 0, code: 'unknown' })
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

// Thông báo hiển thị được cho mọi loại lỗi (ApiError, Error thường, giá trị lạ)
export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return DEFAULT_MESSAGES.unknown
}
