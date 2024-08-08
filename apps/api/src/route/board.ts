import { Hono } from 'hono'

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

export default app
