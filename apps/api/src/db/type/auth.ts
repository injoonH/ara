import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import {
  authGroup,
  authKaist,
  authPermission,
  authUser,
} from '@/db/schema/auth'

export const authUserInsertSchema = createInsertSchema(authUser, {
  username: (schema) => schema.username.min(5),
  displayName: (schema) => schema.displayName.min(5),
  email: (schema) => schema.email.email(),
})
export type AuthUserInsertSchema = z.infer<typeof authUserInsertSchema>

export const authKaistInsertSchema = createInsertSchema(authKaist, {
  email: (schema) => schema.email.email(),
})
export type AuthKaistInsertSchema = z.infer<typeof authKaistInsertSchema>

export const authGroupInsertSchema = createInsertSchema(authGroup, {
  name: (schema) => schema.name.min(2),
})
export type AuthGroupInsertSchema = z.infer<typeof authGroupInsertSchema>

export const authPermissionInsertSchema = createInsertSchema(authPermission, {
  name: (schema) => schema.name.min(2),
  code: (schema) => schema.code.min(2),
})
export type AuthPermissionInsertSchema = z.infer<
  typeof authPermissionInsertSchema
>
