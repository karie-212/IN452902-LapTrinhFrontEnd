'use client'

import { useActionState } from 'react'
import { FormField, inputClass } from '../../../shared/ui/FormField'
import { buttonClass } from '../../../shared/ui/button-styles'
import { loginAction, type LoginState } from '../actions'

const initialState: LoginState = {}

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  // [kết quả lần gửi trước, hàm gắn vào <form action>, đang gửi?]
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
      {state.message && (
        <p role="alert" className="rounded-sm bg-warning-soft px-4 py-3 font-semibold text-danger">
          {state.message}
        </p>
      )}
      <input type="hidden" name="redirect" value={redirectTo} />
      <FormField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-msg"
          className={inputClass}
        />
      </FormField>
      <FormField id="password" label="Mật khẩu" error={errors.password}>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby="password-msg"
          className={inputClass}
        />
      </FormField>
      <button type="submit" disabled={isPending} className={buttonClass('primary', 'justify-self-start')}>
        {isPending ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>
    </form>
  )
}
