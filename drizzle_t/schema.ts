import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  foreignKey,
  primaryKey,
  varchar,
  double,
  tinyint,
  datetime,
  mysqlEnum,
  bigint,
  unique,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const pings = mysqlTable(
  'Pings',
  {
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
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    serversIdServer: varchar('serversIdServer', { length: 191 }).references(
      () => servers.idServer,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      pingsIdPing: primaryKey({ columns: [table.idPing], name: 'Pings_idPing' }),
    };
  },
);

export const servers = mysqlTable(
  'Servers',
  {
    idServer: varchar('idServer', { length: 191 }).notNull(),
    url: varchar('url', { length: 191 }),
    ip: varchar('ip', { length: 191 }),
    description: varchar('description', { length: 191 }),
    title: varchar('title', { length: 191 }).notNull(),
    status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
    workerType: mysqlEnum('workerType', ['SERVER', 'URL']).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    idUser: varchar('idUser', { length: 191 }).references(() => users.idUser, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      serversIdServer: primaryKey({ columns: [table.idServer], name: 'Servers_idServer' }),
    };
  },
);

export const tasks = mysqlTable(
  'Tasks',
  {
    idTask: varchar('idTask', { length: 191 }).notNull(),
    log: varchar('log', { length: 191 }).notNull(),
    type: mysqlEnum('type', ['UNDEFINED', 'SERVER', 'BACKGROUND', 'SUMMARY', 'ADMIN', 'DAILY'])
      .default('UNDEFINED')
      .notNull(),
    interval: bigint('interval', { mode: 'number' }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      tasksIdTask: primaryKey({ columns: [table.idTask], name: 'Tasks_idTask' }),
    };
  },
);

export const tasksServers = mysqlTable(
  'TasksServers',
  {
    id: varchar('id', { length: 191 }).notNull(),
    serverIdServer: varchar('serverIdServer', { length: 191 })
      .notNull()
      .references(() => servers.idServer, { onDelete: 'restrict', onUpdate: 'cascade' }),
    taskIdTask: varchar('taskIdTask', { length: 191 })
      .notNull()
      .references(() => tasks.idTask, { onDelete: 'restrict', onUpdate: 'cascade' }),
  },
  (table) => {
    return {
      tasksServersId: primaryKey({ columns: [table.id], name: 'TasksServers_id' }),
    };
  },
);

export const users = mysqlTable(
  'Users',
  {
    idUser: varchar('idUser', { length: 191 }).notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    lastName: varchar('lastName', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    password: varchar('password', { length: 191 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    status: mysqlEnum('status', ['ACTIVE', 'INACTIVE']).default('ACTIVE').notNull(),
  },
  (table) => {
    return {
      usersIdUser: primaryKey({ columns: [table.idUser], name: 'Users_idUser' }),
      usersEmailKey: unique('Users_email_key').on(table.email),
    };
  },
);
