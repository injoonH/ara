import { createMiddleware } from 'hono/factory'

export const acceptLanguageMiddleware = createMiddleware<{
  Variables: { language: 'ko' | 'en' }
}>(async (c, next) => {
  const language = c.req.header('Accept-Language')
  c.set('language', language?.includes('ko') ? 'ko' : 'en')
  await next()
})
