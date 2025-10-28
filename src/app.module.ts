import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { EventsModule } from './events/events.module';
import { type Config, config } from './config/config';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { DemoModule } from './demo/demo.module';

import * as schema from '@/db/schemas';
import { BullMqProviderQeue } from './providers/qeue-provider';
import { QeueManagerModule } from './task/qeue-manager';
import { QueuePingModule } from './task/qeue-ping/queueping.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: config }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService<Config>) => {
        const host: string = config.get<string>('REDIS_HOST') as string;
        const port: number = config.get<number>('REDIS_PORT') as number;
        return {
          // prefix: options?.prefix ?? '{#MONITOR}',
          connection: {
            host,
            port,
          },
        };
      },
      inject: [ConfigService],
    }),
    DrizzlePostgresModule.registerAsync({
      tag: 'DB',
      useFactory() {
        return {
          postgres: {
            url: process.env.DATABASE_URL as string,
            ssl: true,
          },
          config: { schema: { ...schema }, logger: false },
        };
      },
    }),
    ScheduleModule.forRoot(),
    ServerModule,
    UserModule,
    AuthModule,
    QeueManagerModule,
    QueuePingModule,
    TaskModule,
    EventsModule,
    JobsModule,
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
