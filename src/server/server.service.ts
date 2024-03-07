import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateServerDto, UpdateServerDto } from './dto/create-server.dto';
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

  async updateUserServer(serverDto: UpdateServerDto, idUser: string) {
    const serverRequest: Prisma.ServersUpdateInput = {
      idServer: serverDto.idServer,
      url: serverDto.url,
      title: serverDto.title,
      description: serverDto.description,
      ip: serverDto.ip,
      workerType: serverDto.ip ? WORKERTYPE.SERVER : WORKERTYPE.URL,
      Users: {
        connect: { idUser: idUser },
      },
    };

    const server = await this.prismaService.servers.findFirst({
      where: {
        idServer: serverDto.idServer,
        idUser: idUser,
      },
    });

    if (!server) {
      throw new BadRequestException('Server not found');
    }

    return this.prismaService.servers.update({
      data: serverRequest,
      where: {
        idServer: serverDto.idServer,
        AND: [
          {
            idUser: idUser,
          },
        ],
      },
    });
  }

  async deleteServer(idServer: string, idUser: string) {
    const server = await this.prismaService.servers.findFirst({
      where: {
        idServer: idServer,
        idUser: idUser,
      },
    });

    if (!server) {
      throw new BadRequestException('Server not found');
    }

    await this.prismaService.servers.delete({
      where: {
        idServer: idServer,
        AND: [{ idUser: idUser }],
      },
    });
  }
}
