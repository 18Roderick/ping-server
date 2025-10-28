import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PingsService } from './pings.service';

import { UpdatePingDto } from './dto/update-ping.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '@/auth/decorators';
import { JwtAuthGuard } from '@/auth/guards';
import { User } from '@/db/schemas';

@ApiTags('servers')
@UseGuards(JwtAuthGuard)
@Controller('pings')
export class PingsController {
  constructor(private readonly pingsService: PingsService) {}

  @Get(':id')
  findAll(@Param('id') id: string, @GetUser() user: User) {
    return this.pingsService.findAll(id, user.id_user);
  }

  // @Get(':id')
  // findOne(@Param('id') idServer: string) {
  //   return this.pingsService.findOne(idServer);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePingDto: UpdatePingDto) {
    return this.pingsService.update(+id, updatePingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pingsService.remove(+id);
  }
}
