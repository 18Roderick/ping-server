import { Module } from '@nestjs/common';
import { PingsService } from './pings.service';
import { PingsController } from './pings.controller';

@Module({
  controllers: [PingsController],
  providers: [PingsService],
})
export class PingsModule {}
