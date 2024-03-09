import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { WORKERTYPE, Prisma, Servers } from '@prisma/client';
import { TaskService } from '@/task/task.service';

/**
 TODO: Create validations for repeted urls and ips
 TODO: Create Background jobs  fors the servers
 */

@Injectable()
export class ServerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TaskService,
  ) {}

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

    const serverExist = await this.prismaService.servers.findFirst({
      where: {
        idUser: idUser,
        AND: [
          {
            OR: [
              {
                url: serverDto.url,
              },
              { ip: serverDto.ip },
            ],
          },
        ],
      },
    });

    if (serverExist) throw new BadRequestException('Server already exists');

    const created = await this.prismaService.servers.create({ data: serverRequest });

    if (created) {
      await this.taskService.addPingServerTask({
        idServer: created.idServer,
        idUser: created.idUser,
      });
    }

    return created;
  }

  async getUserServers(userId: string) {
    return this.prismaService.servers.findMany({
      where: {
        idUser: userId,
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

  async pingServer(idServer: string) {
    return this.prismaService.pings.findMany({
      where: {
        serversIdServer: idServer,
      },
    });
  }
}
