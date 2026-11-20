import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { applyServerErrors } from '../../../shared/lib/form-errors'
import { Button } from '../../../shared/ui/Button'
import { FormField, inputClass } from '../../../shared/ui/FormField'
import { useRegisterAccount } from '../hooks/use-auth'
import { registerSchema, type RegisterValues } from '../model/auth.schema'
import type { Member } from '../model/member'

const fields = [
  { name: 'studentId', label: 'Mã số sinh viên', type: 'text', autoComplete: 'off', hint: 'Gồm đúng 10 chữ số.' },
  { name: 'name', label: 'Họ và tên', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'password', label: 'Mật khẩu', type: 'password', autoComplete: 'new-password', hint: 'Tối thiểu 8 ký tự.' },
  { name: 'confirmPassword', label: 'Nhập lại mật khẩu', type: 'password', autoComplete: 'new-password' },
] as const

export function RegisterForm({ onSuccess }: { onSuccess: (member: Member) => void }) {
  const registerAccount = useRegisterAccount()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { studentId: '', name: '', email: '', password: '', confirmPassword: '' },
  })

  const submit = handleSubmit(async (values) => {
    try {
      onSuccess(await registerAccount.mutateAsync(values))
    } catch (error) {
      applyServerErrors(error, setError) // 400 → đúng ô; 409 email trùng → toast
    }
  })

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
      {errors.root?.server && (
        <p role="alert" className="rounded-sm bg-warning-soft px-4 py-3 font-semibold text-danger">
          {errors.root.server.message}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <FormField key={f.name} id={f.name} label={f.label} error={errors[f.name]?.message} hint={'hint' in f ? f.hint : undefined}>
            <input
              id={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              {...register(f.name)}
              aria-invalid={Boolean(errors[f.name])}
              aria-describedby={`${f.name}-msg`}
              className={inputClass}
            />
          </FormField>
        ))}
      </div>
      <Button type="submit" disabled={isSubmitting} className="justify-self-start">
        {isSubmitting ? 'Đang gửi…' : 'Tạo tài khoản'}
      </Button>
    </form>
  )
}
