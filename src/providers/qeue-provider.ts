import { Config } from '@/config/config';
import { RegisterQueueOptions } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

interface ConfigQeue {
  prefix?: string;
}

export const BullMqProviderQeue =
  (options?: ConfigQeue) =>
  async (config: ConfigService<Config>): Promise<RegisterQueueOptions> => {
    const host: string = config.get('REDIS_HOST');
    const port: number = config.get('REDIS_PORT');
    return {
      prefix: options?.prefix ?? '{#MONITOR}',
      connection: {
        host,
        port,
      },
    };
  };
