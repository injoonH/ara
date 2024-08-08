import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcrypt'
import { Hono } from 'hono'

import { db } from '@/db'
import { authUser } from '@/db/schema/auth'
import { authUserInsertSchema } from '@/db/type/auth'
import { acceptLanguageMiddleware } from '@/middleware/language'

const app = new Hono()
  .use(acceptLanguageMiddleware)
  .post('/signup', zValidator('json', authUserInsertSchema), async (c) => {
    const { password, ...rest } = c.req.valid('json')
    const language = c.get('language')
    const hashedPassword = await bcrypt.hash(password, 12)

    const res = await db
      .insert(authUser)
      .values({ password: hashedPassword, ...rest })
      .returning()
      .onConflictDoNothing()

    if (res.length === 0) {
      const message =
        language === 'ko'
          ? '이미 존재하는 이름이에요.'
          : 'Username already exists.'
      return c.json(message, 409)
    }

    const { password: _, ...userWithoutPassword } = res[0]!
    return c.json(userWithoutPassword, 201)
  })

export default app
