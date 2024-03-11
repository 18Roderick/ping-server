import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './services/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { EventsModule } from './events/events.module';
import { Config, config } from './config/config';
import { LogsService } from './logs/logs.service';
import { LogsModule } from './logs/logs.module';

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
    ServerModule,
    UserModule,
    AuthModule,
    PrismaModule,
    TaskModule,
    EventsModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogsService],
})
export class AppModule {}
