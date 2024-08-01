import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  primaryKey,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core'

import { createdAt, id, updatedAt } from '@/db/field'

// User

export const authUser = pgTable('auth_user', {
  id,
  createdAt,
  updatedAt,
  username: varchar('username', { length: 64 }).notNull().unique(),
  displayName: varchar('display_name', { length: 64 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 60 }).notNull(),
})
export const authUserRelations = relations(authUser, ({ many }) => ({
  userGroups: many(authUserGroup),
  userPermissions: many(authUserPermission),
}))

// KAIST

export const authKaist = pgTable('auth_kaist', {
  id,
  createdAt,
  updatedAt,
  uid: varchar('uid', { length: 16 }).notNull().unique(),
  nameKo: varchar('name_ko', { length: 64 }).notNull(),
  nameEn: varchar('name_en', { length: 64 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 16 }).notNull(),
  studentNumber: smallint('student_number').notNull(),
  departmentId: smallint('department_id').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => authUser.id),
})

// Group

export const authGroup = pgTable('auth_group', {
  id,
  name: varchar('name', { length: 64 }).notNull(),
})
export const authGroupRelations = relations(authGroup, ({ many }) => ({
  groupUsers: many(authUserGroup),
  groupPermissions: many(authGroupPermission),
}))

// Permission

export const authPermission = pgTable('auth_permission', {
  id,
  name: varchar('name', { length: 64 }).notNull(),
  code: varchar('code', { length: 64 }).notNull().unique(),
})
export const authPermissionRelations = relations(
  authPermission,
  ({ many }) => ({
    permissionUsers: many(authUserPermission),
    permissioinGroups: many(authGroupPermission),
  }),
)

// Many-to-Many

export const authUserGroup = pgTable(
  'auth_group_auth_user',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => authUser.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => authGroup.id),
    createdAt,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
)
export const authUserGroupRelations = relations(authUserGroup, ({ one }) => ({
  user: one(authUser, {
    fields: [authUserGroup.userId],
    references: [authUser.id],
  }),
  group: one(authGroup, {
    fields: [authUserGroup.groupId],
    references: [authGroup.id],
  }),
}))

export const authUserPermission = pgTable(
  'auth_permission_auth_user',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => authUser.id),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => authPermission.id),
    createdAt,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.permissionId] }),
  }),
)
export const authUserPermissionRelations = relations(
  authUserPermission,
  ({ one }) => ({
    user: one(authUser, {
      fields: [authUserPermission.userId],
      references: [authUser.id],
    }),
    permission: one(authPermission, {
      fields: [authUserPermission.permissionId],
      references: [authPermission.id],
    }),
  }),
)

export const authGroupPermission = pgTable(
  'auth_group_auth_permission',
  {
    groupId: integer('group_id')
      .notNull()
      .references(() => authGroup.id),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => authPermission.id),
    createdAt,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.groupId, t.permissionId] }),
  }),
)
export const authGroupPermissionRelations = relations(
  authGroupPermission,
  ({ one }) => ({
    group: one(authGroup, {
      fields: [authGroupPermission.groupId],
      references: [authGroup.id],
    }),
    permission: one(authPermission, {
      fields: [authGroupPermission.permissionId],
      references: [authPermission.id],
    }),
  }),
)
