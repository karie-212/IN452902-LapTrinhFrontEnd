'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { isApiError } from '../../shared/api/api-error'
import { serverFetch } from '../../shared/api/server-fetch'
import { tokenResponseSchema } from './dto/auth.dto'
import { loginSchema } from './model/auth.schema'
import { decodeSession, TOKEN_COOKIE } from './session'

export type LoginState = {
  message?: string
  fieldErrors?: { email?: string; password?: string }
  values?: { email: string }
}

// Chỉ chuyển tiếp tới đường dẫn nội bộ (chặn ?redirect=https://trang-la.com)
function safeRedirect(value: FormDataEntryValue | null): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/'
}

// TODO(ch6-T4): Server Action đăng nhập (dùng với useActionState trong LoginForm). Test: actions.test.ts
//  1. Lấy email, password từ formData; kiểm tra bằng loginSchema.safeParse (schema Ch05).
//     Sai → return { fieldErrors: { email, password } (câu lỗi đầu tiên, dùng z.flattenError), values: { email } }
//  2. serverFetch('/api/auth/login', tokenResponseSchema, { method: 'POST', body }) → accessToken.
//     ApiError → return { message: error.message, values: { email } }
//  3. (await cookies()).set(TOKEN_COOKIE, accessToken, { httpOnly: true, sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production', path: '/', expires: decodeSession(accessToken)?.expiresAt })
//  4. redirect(safeRedirect(formData.get('redirect'))) — đặt NGOÀI try/catch vì redirect() "ném" để điều hướng
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  void [formData, cookies, redirect, z, isApiError, serverFetch, tokenResponseSchema, loginSchema, decodeSession, TOKEN_COOKIE, safeRedirect]
  return { message: 'TODO(ch6-T4): viết loginAction' }
}

// TODO(ch6-T4): xoá cookie TOKEN_COOKIE rồi redirect('/')
export async function logoutAction(): Promise<void> {}
