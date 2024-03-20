import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { WORKERTYPE, Prisma, Servers } from '@prisma/client';
import { TaskService } from '@/task/task.service';
import { DrizzleDb } from '@/db';
import { eq, or, and, SQL } from 'drizzle-orm';
import { pings, servers, tasks, users } from '@/db/schemas';

/**
 TODO: Create validations for repeted urls and ips
 TODO: Create Background jobs  fors the servers
 */

@Injectable()
export class ServerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TaskService,
    @Inject('DB') private readonly db: DrizzleDb,
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

    const serverExist = await this.db
      .select({
        idUser: users.idUser,
        idServer: servers.idServer,
      })
      .from(users)
      .innerJoin(servers, eq(users.idUser, servers.idUser))
      .where(
        and(
          or(eq(servers.ip, serverDto.ip), eq(servers.url, serverDto.url)),
          eq(servers.idUser, idUser),
        ),
      )
      .limit(1);

    if (serverExist.length) throw new BadRequestException('Server already exists');

    const created = await this.prismaService.servers.create({ data: serverRequest });

    await this.db.insert(servers).values({
      url: serverDto.url,
      title: serverDto.title,
      description: serverDto.description,
      ip: serverDto.ip,
      workerType: serverDto.ip ? WORKERTYPE.SERVER : WORKERTYPE.URL,
      idUser: serverExist[0].idUser,
    });

    if (created) {
      await this.taskService.addPingServerTask({
        idServer: created.idServer,
        idUser: created.idUser,
      });
    }

    return created;
  }

  async getUserServers(userId: string) {
    return this.db.query.servers.findMany({
      where: eq(servers.idUser, userId),
    });
  }

  async getServer(serverId: string) {
    return this.db
      .select()
      .from(servers)
      .leftJoin(tasks, eq(tasks.idServer, servers.idServer))
      .leftJoin(pings, eq(pings.idServer, servers.idServer))
      .where(eq(servers.idServer, serverId));
  }

  async updateUserServer(serverDto: UpdateServerDto, idUser: string) {
    const equalWhere = and(eq(servers.idServer, serverDto.idServer), eq(servers.idUser, idUser));

    const server = await this.db.select().from(servers).where(equalWhere).limit(1);

    if (server.length < 1) {
      throw new BadRequestException('Server not found');
    }

    const updated = await this.db
      .update(servers)
      .set({
        idServer: serverDto.idServer,
        url: serverDto.url,
        title: serverDto.title,
        description: serverDto.description,
        ip: serverDto.ip,
        workerType: serverDto.ip ? WORKERTYPE.SERVER : WORKERTYPE.URL,
      })
      .where(equalWhere);

    if (updated[0].affectedRows === 0) {
      throw new BadRequestException('Server not found');
    }

    return this.db.select().from(servers).where(equalWhere);
  }

  async deleteServer(idServer: string, idUser: string) {
    const equalWhere = and(eq(servers.idServer, idServer), eq(servers.idUser, idUser));

    //TODO: stop pings
    //chnage status of the task

    await this.db.delete(servers).where(equalWhere);
  }

  async pingServer(idServer: string) {
    return this.db.select().from(pings).where(eq(pings.idServer, idServer));
  }
}
