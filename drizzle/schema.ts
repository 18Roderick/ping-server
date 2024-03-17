import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  int,
  varchar,
  datetime,
  mysqlEnum,
  foreignKey,
  double,
  tinyint,
  unique,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const logs = mysqlTable('Logs', {
  id: int('id').autoincrement().notNull(),
  idUser: varchar('idUser', { length: 191 }),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default('CURRENT_TIMESTAMP(3)')
    .notNull(),
  action: varchar('action', { length: 191 }).notNull(),
  errorLevel: mysqlEnum('errorLevel', ['INFO', 'WARNING', 'ERROR', 'CRITICAL']).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  affectedEntity: varchar('affectedEntity', { length: 191 }),
});

export const pings = mysqlTable('Pings', {
  idPing: varchar('idPing', { length: 191 }).notNull(),
  times: double('times').notNull(),
  packetLoss: double('packetLoss').notNull(),
  min: double('min').notNull(),
  max: double('max').notNull(),
  avg: double('avg').notNull(),
  log: varchar('log', { length: 191 }).notNull(),
  isAlive: tinyint('isAlive').notNull(),
  numericHost: varchar('numericHost', { length: 191 }).notNull(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default('CURRENT_TIMESTAMP(3)')
    .notNull(),
  serversIdServer: varchar('serversIdServer', { length: 191 }).references(() => servers.idServer, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
});

export const servers = mysqlTable('Servers', {
  idServer: varchar('idServer', { length: 191 }).notNull(),
  url: varchar('url', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  description: varchar('description', { length: 191 }),
  title: varchar('title', { length: 191 }).notNull(),
  status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
  workerType: mysqlEnum('workerType', ['SERVER', 'URL']).notNull(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default('CURRENT_TIMESTAMP(3)')
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  idUser: varchar('idUser', { length: 191 }).references(() => users.idUser, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
});

export const tasks = mysqlTable('Tasks', {
  idTask: varchar('idTask', { length: 191 }).notNull(),
  idJob: varchar('idJob', { length: 191 }).notNull(),
  log: varchar('log', { length: 191 }).notNull(),
  type: mysqlEnum('type', ['UNDEFINED', 'SERVER', 'BACKGROUND', 'SUMMARY', 'ADMIN', 'DAILY'])
    .default('UNDEFINED')
    .notNull(),
  cron: varchar('cron', { length: 191 }).notNull(),
  status: mysqlEnum('status', ['RUNNING', 'STOPPED', 'DELETED', 'WAITING'])
    .default('RUNNING')
    .notNull(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default('CURRENT_TIMESTAMP(3)')
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  serversIdServer: varchar('serversIdServer', { length: 191 }).references(() => servers.idServer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  retriesFailed: int('retriesFailed').default(0).notNull(),
});

export const users = mysqlTable(
  'Users',
  {
    idUser: varchar('idUser', { length: 191 }).notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    lastName: varchar('lastName', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    password: varchar('password', { length: 191 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default('CURRENT_TIMESTAMP(3)')
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
  },
  (table) => {
    return {
      usersEmailKey: unique('Users_email_key').on(table.email),
    };
  },
);
