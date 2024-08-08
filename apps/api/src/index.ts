import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { env } from '@/env'
import auth from '@/route/auth'
import board from '@/route/board'

const app = new Hono({ strict: false })

app.use(logger())

const routes = app.route('/auth', auth).route('/boards', board)
export type AppType = typeof routes

serve({
  fetch: app.fetch,
  port: env.API_PORT,
})
