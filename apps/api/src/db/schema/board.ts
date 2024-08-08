import { relations } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

import { createdAt, id, slug } from '@/db/field'

export const boardGroup = pgTable('board_group', {
  id,
  createdAt,
  nameKo: varchar('name_ko', { length: 64 }).notNull(),
  nameEn: varchar('name_en', { length: 64 }).notNull(),
})
export const boardGroupRelations = relations(boardGroup, ({ many }) => ({
  boards: many(board),
}))

export const board = pgTable('board', {
  id,
  createdAt,
  slug,
  nameKo: varchar('name_ko', { length: 64 }).notNull(),
  nameEn: varchar('name_en', { length: 64 }).notNull(),
  groupId: integer('group_id')
    .notNull()
    .references(() => boardGroup.id),
})
export const boardRelations = relations(board, ({ one }) => ({
  group: one(boardGroup, {
    fields: [board.groupId],
    references: [boardGroup.id],
  }),
}))
