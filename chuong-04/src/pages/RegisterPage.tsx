import type { ReactNode } from 'react'
import { PageContainer } from '../components/PageContainer'
import { clubs } from '../data'

const inputClass =
  'min-h-11 w-full rounded-sm border border-line bg-bg px-3 py-2 focus-visible:border-accent-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/35 aria-invalid:border-danger'

// TODO(ch4-T5): biến form tĩnh này thành form dùng Action của React 19:
//  - const [state, formAction, isPending] = useActionState(registerMemberAction, initialRegisterState)
//  - <form action={formAction} noValidate>; state.status === 'error' → hộp role="alert" + lỗi từng ô
//    (truyền error vào <Field>, đặt aria-invalid trên input), giữ giá trị cũ bằng defaultValue
//  - state.status === 'success' → hiện lời chào thay cho form
//  - Nút gửi tách thành component SubmitButton dùng useFormStatus(): "Đang gửi…" + disabled
export function RegisterPage() {
  return (
    <PageContainer narrow>
      <h1>Đăng ký thành viên</h1>
      <p className="mt-3 mb-8 text-lg text-ink-muted">
        Điền thông tin bên dưới. Ô có dấu <span className="text-danger">*</span> là bắt buộc.
      </p>

      <form noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="studentId" label="Mã số sinh viên" hint="Gồm đúng 10 chữ số.">
            <input id="studentId" name="studentId" inputMode="numeric" maxLength={10} autoComplete="off" aria-describedby="studentId-msg" className={inputClass} />
          </Field>
          <Field id="name" label="Họ và tên">
            <input id="name" name="name" autoComplete="name" aria-describedby="name-msg" className={inputClass} />
          </Field>
          <Field id="email" label="Email">
            <input id="email" name="email" type="email" autoComplete="email" placeholder="mssv@sv.dthu.edu.vn" aria-describedby="email-msg" className={inputClass} />
          </Field>
          <Field id="clubId" label="Câu lạc bộ muốn tham gia">
            <select id="clubId" name="clubId" defaultValue="" aria-describedby="clubId-msg" className={inputClass}>
              <option value="">— Chọn CLB —</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center justify-self-start rounded-full bg-primary px-6 py-2 font-semibold text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60"
        >
          Đăng ký
        </button>
      </form>
    </PageContainer>
  )
}

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

// Nhãn + ô nhập + dòng gợi ý/lỗi. Có error thì dòng dưới đổi thành chữ đỏ.
function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="grid content-start gap-1">
      <label htmlFor={id} className="font-semibold">
        {label} <span className="text-danger">*</span>
      </label>
      {children}
      <small id={`${id}-msg`} className={error ? 'text-sm font-semibold text-danger' : 'text-sm text-ink-muted'}>
        {error ?? hint}
      </small>
    </div>
  )
}
