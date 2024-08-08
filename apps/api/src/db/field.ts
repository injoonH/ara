import { serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const id = serial('id').primaryKey()
export const createdAt = timestamp('created_at', { withTimezone: true })
  .notNull()
  .defaultNow()
export const updatedAt = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => new Date())

export const slug = varchar('slug', { length: 64 }).notNull().unique()
