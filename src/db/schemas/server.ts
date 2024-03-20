import { datetime, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { users } from './users';
import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';

export const servers = mysqlTable('Servers', {
  idServer: varchar('idServer', { length: 200 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  url: varchar('url', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  description: varchar('description', { length: 191 }),
  title: varchar('title', { length: 191 }).notNull(),
  status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
  workerType: mysqlEnum('workerType', ['SERVER', 'URL']).notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  idUser: varchar('idUser', { length: 200 })
    .notNull()
    .references(() => users.idUser, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export type Server = typeof servers.$inferSelect;
export type ServerInsert = typeof servers.$inferInsert;
