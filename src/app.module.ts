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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const host: string = config.get('redis_host');
        const port: number = config.get('redis_port');
        return { redis: { host, port } };
      },
      inject: [ConfigService],
    }),
    ServerModule,
    UserModule,
    AuthModule,
    PrismaModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
