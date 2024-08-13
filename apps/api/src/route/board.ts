import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { db } from '@/db'
import { acceptLanguageMiddleware } from '@/middleware/language'

const app = new Hono()
  .use(acceptLanguageMiddleware)
  .get('/grouped', async (c) => {
    const groups = await db.query.boardGroup.findMany({
      columns: { createdAt: false },
      with: {
        boards: {
          columns: { createdAt: false, groupId: false },
        },
      },
    })

    const nameKey = c.get('language') === 'ko' ? 'nameKo' : 'nameEn'
    const formattedGroups = groups.map(({ id, boards, ...names }) => ({
      id,
      name: names[nameKey],
      boards: boards.map(({ id, slug, ...names }) => ({
        id,
        slug,
        name: names[nameKey],
      })),
    }))

    return c.json(formattedGroups, 200)
  })
  .get(
    '/slug/:slug',
    zValidator('param', z.object({ slug: z.string() })),
    async (c) => {
      const { slug } = c.req.valid('param')

      const board = await db.query.board.findFirst({
        where: (board, { eq }) => eq(board.slug, slug),
      })

      if (!board) {
        return c.json({ message: 'Not Found' }, 404)
      }

      const nameKey = c.get('language') === 'ko' ? 'nameKo' : 'nameEn'
      return c.json(
        {
          id: board.id,
          slug: board.slug,
          name: board[nameKey],
        },
        200,
      )
    },
  )

export default app
