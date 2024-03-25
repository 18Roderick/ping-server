import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { TaskService } from '@/task/task.service';
import { DrizzleDb } from '@/db';
import { eq, or, and, SQL, sql, desc, count, max, avg, min } from 'drizzle-orm';
import { Server, pings, servers, tasks, users } from '@/db/schemas';

/**
 TODO: Create validations for repeted urls and ips
 TODO: Create Background jobs  fors the servers
 */

@Injectable()
export class ServerService {
  constructor(
    private readonly taskService: TaskService,
    @Inject('DB') private readonly db: DrizzleDb,
  ) {}

  async create(serverDto: CreateServerDto, idUser: string): Promise<Server> {
    try {
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
      console.log(serverExist);
      if (serverExist.length) throw new BadRequestException('Server already exists');

      // const created = await this.prismaService.servers.create({ data: serverRequest });

      const created = await this.db.insert(servers).values({
        url: serverDto.url,
        title: serverDto.title,
        description: serverDto.description,
        ip: serverDto.ip,
        workerType: serverDto.ip ? 'SERVER' : 'URL',
        idUser: idUser,
      });

      if (created[0].affectedRows > 0) {
        const serversFind = await this.db.query.servers.findFirst({
          where: and(eq(servers.idUser, idUser), eq(servers.url, serverDto.url)),
        });

        await this.taskService.addPingServerTask({
          idServer: serversFind.idServer,
          idUser: idUser,
        });

        return serversFind;
      }
      console.log(created);
    } catch (error) {
      console.log(error instanceof Error ? error?.message : '');
      throw new InternalServerErrorException(error);
    }
  }

  async getUserServers(userId: string) {
    //get the last ping of the server
    const lastPing = this.db
      .select({
        count: count().as('count'),
        idServer: servers.idServer,
        createdAt: max(pings.createdAt).as('created_at_custom'),
        avg:  sql<number>`round(avg(${pings.avg}),4)`.as("avg"),  //, avg(pings.avg).as('avg'),
        min: min(pings.avg).as('min'),
        max: max(pings.max).as('max'),
      })
      .from(servers)
      .innerJoin(pings, eq(pings.idServer, servers.idServer))
      .where(eq(servers.idUser, userId))
      .groupBy(servers.idServer)
      // .orderBy(desc(pings.createdAt))
      .as('lastping');

    const query = await this.db
      .select({
        idServer: servers.idServer,
        ip: servers.ip,
        url: servers.url,
        title: servers.title,
        status: servers.status,
        idTask: tasks.idTask,
        ping_max: lastPing.max,
        ping_min: lastPing.min,
        ping_avg: lastPing.avg,
      })
      .from(servers)
      .leftJoin(tasks, eq(servers.idServer, tasks.idServer))
      .leftJoin(lastPing, eq(lastPing.idServer, servers.idServer))
      .where(eq(servers.idUser, userId));

    return query;
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
        workerType: serverDto.ip ? 'SERVER' : 'URL',
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
