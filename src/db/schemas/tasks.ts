import { createId } from '@paralleldrive/cuid2';
import { datetime, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { servers } from './server';
import { sql } from 'drizzle-orm';

export const tasks = mysqlTable('Tasks', {
  idTask: varchar('idTask', { length: 200 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  idJob: varchar('idJob', { length: 191 }).notNull(),
  log: varchar('log', { length: 191 }).notNull(),
  type: mysqlEnum('type', ['UNDEFINED', 'SERVER', 'BACKGROUND', 'SUMMARY', 'ADMIN', 'DAILY'])
    .default('UNDEFINED')
    .notNull(),
  cron: varchar('cron', { length: 191 }).notNull(),
  status: mysqlEnum('status', ['RUNNING', 'STOPPED', 'DELETED', 'WAITING'])
    .default('RUNNING')
    .notNull(),
  createdAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  idServer: varchar('idServer', { length: 200 }).references(() => servers.idServer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  retriesFailed: int('retriesFailed').default(0).notNull(),
});
