import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { PingsModule } from './pings/pings.module';

@Module({
  controllers: [ServerController],
  providers: [ServerService],
  imports: [PingsModule],
})
export class ServerModule {}
