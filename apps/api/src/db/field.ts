import { serial, timestamp } from 'drizzle-orm/pg-core'

export const id = serial('id').primaryKey()
export const createdAt = timestamp('created_at', { withTimezone: true })
  .notNull()
  .defaultNow()
export const updatedAt = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => new Date())
