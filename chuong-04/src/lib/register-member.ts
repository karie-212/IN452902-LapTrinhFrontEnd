// Logic form "Đăng ký thành viên" — tách khỏi component để dễ đọc và dễ test.
// Ch04 chưa có server: lưu vào localStorage và giả lập mạng chậm.

export type MemberInput = {
  studentId: string
  name: string
  email: string
  clubId: string
}

export type FieldErrors = Partial<Record<keyof MemberInput, string>>

export type RegisterState =
  | { status: 'idle' }
  | { status: 'error'; message: string; errors: FieldErrors; values: MemberInput }
  | { status: 'success'; member: MemberInput }

export const initialRegisterState: RegisterState = { status: 'idle' }

export const STORAGE_KEY = 'eduhub-members'

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Action cho useActionState: nhận state cũ + FormData, trả state mới.
// TODO(ch4-T5):
//  1. Đọc 4 ô từ formData (studentId, name, email, clubId), cắt khoảng trắng, email viết thường.
//  2. Kiểm tra: MSSV đúng 10 chữ số; họ tên ≥ 2 ký tự; email đúng dạng; đã chọn CLB.
//     Có lỗi → return { status: 'error', message, errors, values } (values để giữ lại giá trị đã nhập).
//  3. await wait(800) — giả lập gửi lên server.
//  4. Đọc danh sách cũ từ localStorage[STORAGE_KEY]; trùng email → lỗi "Email này đã đăng ký."
//  5. Lưu thêm thành viên mới, return { status: 'success', member: values }.
export async function registerMemberAction(
  prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  console.info('TODO(ch4-T5): dữ liệu form', Object.fromEntries(formData))
  return prev
}
