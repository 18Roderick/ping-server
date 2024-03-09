import { z } from 'zod';

export const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  //converts the string to a number
  PORT: z.coerce.number().positive(),
  REDIS_PORT: z.coerce.number().positive(),
  REDIS_HOST: z.string().ip(),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>) => {
  const result = configSchema.parse(config);
  return result;
};
