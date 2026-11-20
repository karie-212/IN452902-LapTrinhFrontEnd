import { httpClient } from '../../../shared/api/http-client'
import { parseResponse } from '../../../shared/api/parse'
import { memberDtoSchema, tokenResponseSchema, type LoginRequestDto, type RegisterRequestDto } from '../dto/auth.dto'
import { toMember, type Member } from '../model/member'

export const authApi = {
  // TODO(ch5-T5): POST /api/auth/login với body { email, password }.
  //   Kiểm tra res.data bằng tokenResponseSchema, trả về accessToken.
  //   (refresh token server tự đặt vào cookie httpOnly — JS không đọc được, không cần xử lý)
  async login(body: LoginRequestDto): Promise<string> {
    void body
    throw new Error('TODO(ch5-T5): viết authApi.login')
  },

  async register(body: RegisterRequestDto): Promise<Member> {
    const res = await httpClient.post('/api/auth/register', body)
    return toMember(parseResponse(memberDtoSchema, res.data))
  },

  // Dùng cookie refreshToken để xin access token mới
  async refresh(): Promise<string> {
    const res = await httpClient.post('/api/auth/refresh')
    return parseResponse(tokenResponseSchema, res.data).accessToken
  },

  async logout(): Promise<void> {
    await httpClient.post('/api/auth/logout')
  },

  // TODO(ch5-T5): GET /api/members/me → parseResponse(memberDtoSchema, …) → toMember
  async me(): Promise<Member> {
    throw new Error('TODO(ch5-T5): viết authApi.me')
  },
}
