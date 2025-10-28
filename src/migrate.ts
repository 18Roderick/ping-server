import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connection, db } from './db';

(async () => {
  await migrate(db, { migrationsFolder: 'drizzle' });
  await connection.end(); // Remember to close the db connection
})();
