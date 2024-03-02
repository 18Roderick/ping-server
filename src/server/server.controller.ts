import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
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
}
