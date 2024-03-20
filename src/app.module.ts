import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { EventsModule } from './events/events.module';
import { Config, config } from './config/config';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';

import * as schema from '@/db/schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: config }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService<Config>) => {
        const host: string = config.get('REDIS_HOST');
        const port: number = config.get('REDIS_PORT');
        return { redis: { host, port } };
      },
      inject: [ConfigService],
    }),
    DrizzleMySqlModule.registerAsync({
      tag: 'DB',
      useFactory() {
        return {
          mysql: {
            connection: 'pool',
            config: {
              uri: process.env.DATABASE_URL,
            },
          },
          config: { schema: { ...schema }, mode: 'default' },
        };
      },
    }),
    ScheduleModule.forRoot(),
    ServerModule,
    UserModule,
    AuthModule,
    TaskModule,
    EventsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
