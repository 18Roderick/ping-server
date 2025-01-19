import type { Config } from '@/config/config';
import type { RegisterQueueOptions } from '@nestjs/bullmq';
import type { ConfigService } from '@nestjs/config';

interface ConfigQeue {
  prefix?: string;
}

export const BullMqProviderQeue =
  (options?: ConfigQeue) =>
  async (config: ConfigService<Config>): Promise<RegisterQueueOptions> => {
    const host: string = config.get<string>('REDIS_HOST') as string;
    const port: number = config.get<number>('REDIS_PORT') as number;
    return {
      prefix: options?.prefix ?? '{#MONITOR}',
      connection: {
        host,
        port,
      },
    };
  };
