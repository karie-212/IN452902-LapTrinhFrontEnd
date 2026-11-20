import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { z } from 'zod'
import { serverFetch } from '../../../shared/api/server-fetch'
import { clubDtoSchema } from '../dto/club.dto'
import { toClub, type Club } from '../model/club'

// MẪU cho ch6-T2. 'use cache': kết quả được lưu lại, các request sau dùng lại cho tới khi hết hạn
// hoặc bị xoá bằng tag 'clubs' (revalidateTag/updateTag sau khi admin sửa CLB).
export async function getClubs(): Promise<Club[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('clubs')
  const dtos = await serverFetch('/api/clubs', z.array(clubDtoSchema))
  return dtos.map(toClub)
}
