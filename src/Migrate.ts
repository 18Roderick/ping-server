import { Effect } from 'effect';
import { NodeRuntime } from '@effect/platform-node';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { AppConfig, AppConfigLive } from '@/Config';
import * as schema from '@/Db/schemas';

const program = Effect.gen(function* () {
  const config = yield* AppConfig;
  const connection = postgres(config.databaseUrl, { ssl: true, max: 1 });
  const db = drizzle(connection, { schema });

  yield* Effect.promise(() => migrate(db, { migrationsFolder: 'drizzle' }));
  yield* Effect.promise(() => connection.end());
});

NodeRuntime.runMain(program.pipe(Effect.provide(AppConfigLive)));
