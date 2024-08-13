import { hc } from 'hono/client'

import type { AppType } from '@ara/api'

import { env } from '@/env'

// TODO: I18n
export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL, {
  headers: { 'Accept-Language': 'ko-KR' },
})
