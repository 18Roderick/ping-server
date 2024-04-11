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
    return this.serverService.getUserServers(user.idUser);
  }

  @Get(':id')
  getServer(@Param('id') idServer: string, @GetUser() user: User) {
    return this.serverService.getServer(user.idUser, idServer);
  }

  @Post()
  createServer(@Body() serverDto: CreateServerDto, @GetUser() user: User) {
    return this.serverService.create(serverDto, user.idUser);
  }

  @Put()
  UpdateServer(serverDto: UpdateServerDto, @GetUser() user: User) {
    return this.serverService.updateUserServer(serverDto, user.idUser);
  }

  @Delete(':id')
  removeTaskJob(@Param('id') idServer: string, @GetUser() user: User) {
    return this.serverService.deleteServer(idServer, user.idUser);
  }
}
