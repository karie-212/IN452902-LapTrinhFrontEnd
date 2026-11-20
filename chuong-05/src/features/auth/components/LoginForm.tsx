import { useForm } from 'react-hook-form'
import { Button } from '../../../shared/ui/Button'
import { FormField, inputClass } from '../../../shared/ui/FormField'
import type { LoginValues } from '../model/auth.schema'
import type { Member } from '../model/member'

// TODO(ch5-T5): hoàn thiện form đăng nhập (mẫu: RegisterForm.tsx cùng thư mục)
//   - useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: … }) để Zod kiểm tra trước khi gửi
//   - const login = useLogin(); trong submit: onSuccess(await login.mutateAsync(values))
//   - lỗi server: applyServerErrors(error, setError) → 401 hiện ở errors.root.server
//   - nút gửi: disabled khi isSubmitting, chữ "Đang đăng nhập…"
// Test: src/pages/pages.test.tsx ("đăng nhập sai → hiện lỗi của server…")
export function LoginForm({ onSuccess }: { onSuccess: (member: Member) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues: { email: '', password: '' } })

  const submit = handleSubmit(async (values) => {
    void values
    void onSuccess
  })

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
      {errors.root?.server && (
        <p role="alert" className="rounded-sm bg-warning-soft px-4 py-3 font-semibold text-danger">
          {errors.root.server.message}
        </p>
      )}
      <FormField id="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-msg"
          className={inputClass}
        />
      </FormField>
      <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="password-msg"
          className={inputClass}
        />
      </FormField>
      <Button type="submit" className="justify-self-start">
        Đăng nhập
      </Button>
    </form>
  )
}
