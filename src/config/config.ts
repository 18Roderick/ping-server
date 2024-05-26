import { z } from 'zod';

export const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  //converts the string to a number
  PORT: z.coerce.number().positive(),
  REDIS_URL: z.string().url(),
  REDIS_PORT: z.coerce.number().positive(),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string().optional(),
  JWT_SECRET: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>) => {
  const result = configSchema.parse(config);
  return result;
};
