import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { GetUser } from '@/auth/decorators';
import { User } from '@/db/schemas';

@ApiTags('servers')
@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}
  @Get()
  getServers(@GetUser() user: User) {
    return this.serverService.getUserServers(user.id_user);
  }

  @Get(':id')
  getServer(@Param('id') idServer: string, @GetUser() user: User) {
    return this.serverService.getServer(user.id_user, idServer);
  }

  @Post()
  createServer(@Body() serverDto: CreateServerDto, @GetUser() user: User) {
    return this.serverService.create(serverDto, user.id_user);
  }

  @Put()
  UpdateServer(serverDto: UpdateServerDto, @GetUser() user: User) {
    return this.serverService.updateUserServer(serverDto, user.id_user);
  }

  @Delete(':id')
  removeTaskJob(@Param('id') idServer: string, @GetUser() user: User) {
    return this.serverService.deleteServer(idServer, user.id_user);
  }
}
