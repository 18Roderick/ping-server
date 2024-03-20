import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import {
  datetime,
  mysqlEnum,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'Users',
  {
    idUser: varchar('idUser', { length: 200 })
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    lastName: varchar('lastName', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    password: varchar('password', { length: 191 }).notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
    status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
  },
  (table) => {
    return {
      usersEmailKey: unique('Users_email_key').on(table.email),
    };
  },
);

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
