import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateServerDto } from './dto/create-server.dto';
import { WORKERTYPE, Prisma, Servers } from '@prisma/client';

/**
 TODO: Create validations for repeted urls and ips
 TODO: Create Background jobs  fors the servers
 */

@Injectable()
export class ServerService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(serverDto: CreateServerDto, idUser: string): Promise<Servers> {
    const serverRequest: Prisma.ServersCreateInput = {
      url: serverDto.url,
      title: serverDto.title,
      description: serverDto.description,
      ip: serverDto.ip,
      workerType: serverDto.ip ? WORKERTYPE.SERVER : WORKERTYPE.URL,
      Users: {
        connect: { idUser: idUser },
      },
    };
    return this.prismaService.servers.create({ data: serverRequest });
  }

  async getUserServers(id: string) {
    return this.prismaService.servers.findMany({
      where: {
        idUser: id,
      },
    });
  }
}
