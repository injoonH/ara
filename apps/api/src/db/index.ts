import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as authSchema from '@/db/schema/auth'
import * as boardSchema from '@/db/schema/board'
import { env } from '@/env'

export const queryClient = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

export const db = drizzle(queryClient, {
  schema: { ...authSchema, ...boardSchema },
})
