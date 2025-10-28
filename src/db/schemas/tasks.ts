import { createId } from '@paralleldrive/cuid2';
import { servers } from './server';
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { tableCreator } from '../table-creator';

export const tasks = tableCreator('tasks', {
  id_task: varchar('id_task', { length: 200 })
    .primaryKey()
    .$defaultFn(() => createId()),
  id_job: varchar('id_job', { length: 300 }).notNull(),
  log: varchar('log', { length: 500 }).notNull(),
  type: text('type', { enum: ['undefined', 'server', 'background', 'summary', 'admin', 'daily'] })
    .default('undefined')
    .notNull(),
  cron: varchar('cron', { length: 191 }).notNull(),
  status: text('status', { enum: ['running', 'stopped', 'deleted', 'waiting'] })
    .default('running')
    .notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  id_server: varchar('id_server', { length: 200 }).references(() => servers.id_server),
  retries_failed: integer('retries_failed').default(0).notNull(),
});
