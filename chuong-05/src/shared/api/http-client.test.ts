import { describe, expect, it } from 'vitest'
import { env } from '../config/env'
import { httpClient } from './http-client'

describe('httpClient', () => {
  it('một instance cấu hình sẵn: baseURL từ env, timeout 10 giây, gửi kèm cookie', () => {
    expect(env.API_URL).toBe('http://localhost:4000')
    expect(httpClient.defaults.baseURL).toBe(env.API_URL)
    expect(httpClient.defaults.timeout).toBe(10_000)
    expect(httpClient.defaults.withCredentials).toBe(true)
  })
})
