import { sql } from 'drizzle-orm';
import { int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const logs = mysqlTable('Logs', {
  id: int('id').autoincrement().primaryKey().notNull(),
  idUser: varchar('idUser', { length: 191 }),
  createdAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  action: varchar('action', { length: 191 }).notNull(),
  errorLevel: mysqlEnum('errorLevel', ['INFO', 'WARNING', 'ERROR', 'CRITICAL'])
    .notNull()
    .default('INFO'),
  description: varchar('description', { length: 191 }).notNull(),
  affectedEntity: varchar('affectedEntity', { length: 191 }),
});
