import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { GetUser } from 'src/auth/decorators';
import { Users } from '@prisma/client';

@ApiTags('servers')
@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}
  @Get()
  getServer(@GetUser() user: Users) {
    return this.serverService.getUserServers(user.idUser);
  }

  @Post()
  createServer(@Body() serverDto: CreateServerDto, @GetUser() user: Users) {
    return this.serverService.create(serverDto, user.idUser);
  }

  @Put()
  UpdateServer(serverDto: UpdateServerDto, @GetUser() user: Users) {
    return this.serverService.updateUserServer(serverDto, user.idUser);
  }

  @Delete(':id')
  removeTaskJob(@Param('id') idServer: string, @GetUser() user: Users) {
    return this.serverService.deleteServer(idServer, user.idUser);
  }
}
