import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

export const connection = globalForDb.conn ?? postgres(process.env.DATABASE_URL);
if (process.env.NODE_ENV !== 'production') globalForDb.conn = connection;

export const db = drizzle(connection, { schema });

export type DB =  PostgresJsDatabase<typeof schema>;
