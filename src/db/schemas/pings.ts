import { datetime, double, mysqlTable, timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { servers } from './server';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const pings = mysqlTable('Pings', {
  idPing: varchar('idPing', { length: 200 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  times: double('times').notNull(),
  packetLoss: double('packetLoss').notNull(),
  min: double('min').notNull(),
  max: double('max').notNull(),
  avg: double('avg').notNull(),
  log: varchar('log', { length: 191 }).notNull(),
  isAlive: tinyint('isAlive').notNull(),
  numericHost: varchar('numericHost', { length: 191 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  idServer: varchar('idServer', { length: 200 })
    .notNull()
    .references(() => servers.idServer, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});


export type PingInsert = typeof pings.$inferInsert;
export type Ping = typeof pings.$inferSelect;
