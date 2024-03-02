import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/*',
  out: './drizzle',
  driver: 'mysql2',
  // schemaFilter: ['ecotria'],
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
