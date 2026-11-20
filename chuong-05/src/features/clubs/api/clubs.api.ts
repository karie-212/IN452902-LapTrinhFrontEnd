import { z } from 'zod'
import { httpClient } from '../../../shared/api/http-client'
import { parseResponse } from '../../../shared/api/parse'
import { clubDtoSchema } from '../dto/club.dto'
import { toClub, type Club } from '../model/club'

export const clubsApi = {
  // GET /api/clubs trả mảng, không phân trang
  async list(signal?: AbortSignal): Promise<Club[]> {
    const res = await httpClient.get('/api/clubs', { signal })
    return parseResponse(z.array(clubDtoSchema), res.data).map(toClub)
  },
}
