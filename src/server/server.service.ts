import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { TaskService } from '@/task/task.service';
import { eq, or, and, SQL, sql, desc, count, max, avg, min } from 'drizzle-orm';
import { Server, pings, servers, tasks, users } from '@/db/schemas';
import { DB } from '@/db';
import { QueueManagerService } from '@/task/qeue-manager';
import { InjectDatabase } from '@/db/decorator.provider';

/**
 TODO: Create validations for repeted urls and ips
 TODO: Create Background jobs  fors the servers
 */

@Injectable()
export class ServerService {
  constructor(
    private readonly taskService: QueueManagerService,
    @InjectDatabase() private readonly db: DB,
  ) {}

  async create(serverDto: CreateServerDto, idUser: string): Promise<Server> {
    try {
      console.log(serverDto, idUser);

      const equalWhere = serverDto.ip
        ? and(eq(servers.ip, serverDto.ip), eq(servers.id_user, idUser))
        : and(eq(servers.url, serverDto.url), eq(servers.id_user, idUser));

      const serverExist = await this.db
        .select({
          idUser: users.id_user,
          idServer: servers.id_server,
        })
        .from(users)
        .innerJoin(servers, eq(users.id_user, servers.id_user))
        .where(equalWhere)
        .limit(1);
      console.log(serverExist);
      if (serverExist.length) throw new BadRequestException('Server already exists');

      const created = await this.db
        .insert(servers)
        .values({
          url: serverDto.url,
          title: serverDto.title,
          description: serverDto.description,
          ip: serverDto.ip,
          worker_type: serverDto.ip ? 'server' : 'url',
          id_user: idUser,
        })
        .returning();

      if (created.length > 0 && created[0]) {
        await this.taskService.AddServerPing({
          idServer: created[0].id_server,
          idUser: idUser,
        });

        return created[0];
      } else {
        throw new BadRequestException('Server not created');
      }
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
        idServer: servers.id_server,
        createdAt: max(pings.created_at).as('created_at_custom'),
        avg: sql<number>`round(avg(${pings.avg})::numeric, 4)::numeric`.as('avg'), //, avg(pings.avg).as('avg'),
        min: min(pings.min).as('min'),
        max: max(pings.max).as('max'),
      })
      .from(servers)
      .innerJoin(pings, eq(pings.id_server, servers.id_server))
      .where(eq(servers.id_user, userId))
      .groupBy(servers.id_server)
      // .orderBy(desc(pings.createdAt))
      .as('lastping');

    const query = await this.db
      .select({
        idServer: servers.id_server,
        ip: servers.ip,
        url: servers.url,
        title: servers.title,
        status: servers.status,
        idTask: tasks.id_task,
        ping_max: lastPing.max,
        ping_min: lastPing.min,
        ping_avg: lastPing.avg,
      })
      .from(servers)
      .leftJoin(tasks, eq(servers.id_server, tasks.id_server))
      .leftJoin(lastPing, eq(lastPing.idServer, servers.id_server))
      .where(eq(servers.id_user, userId));

    return query;
  }

  async getServer(userId: string, serverId: string) {
    //get the last ping of the server
    const lastPing = this.db
      .select({
        count: count().as('count'),
        idServer: servers.id_server,
        createdAt: max(pings.created_at).as('created_at_custom'),
        avg: sql<number>`ROUND(AVG(${pings.avg})::numeric, 4)`.as('avg'), //, avg(pings.avg).as('avg'),
        min: min(pings.avg).as('min'),
        max: max(pings.max).as('max'),
      })
      .from(servers)
      .innerJoin(pings, eq(pings.id_server, servers.id_server))
      .where(and(eq(servers.id_user, userId), eq(servers.id_server, serverId)))
      .groupBy(servers.id_server)
      // .orderBy(desc(pings.createdAt))
      .as('lastping');

    const query = await this.db
      .select({
        idServer: servers.id_server,
        ip: servers.ip,
        url: servers.url,
        title: servers.title,
        status: servers.status,
        idTask: tasks.id_task,
        ping_max: lastPing.max,
        ping_min: lastPing.min,
        ping_avg: lastPing.avg,
      })
      .from(servers)
      .leftJoin(tasks, eq(servers.id_server, tasks.id_server))
      .leftJoin(lastPing, eq(lastPing.idServer, servers.id_server))
      .where(eq(servers.id_user, userId));

    return query;
  }

  async updateUserServer(serverDto: UpdateServerDto, idUser: string) {
    const equalWhere = and(eq(servers.id_server, serverDto.idServer), eq(servers.id_user, idUser));

    const server = await this.db.select().from(servers).where(equalWhere).limit(1);

    if (server.length < 1) {
      throw new BadRequestException('Server not found');
    }

    const updated = await this.db
      .update(servers)
      .set({
        id_server: serverDto.idServer,
        url: serverDto.url,
        title: serverDto.title,
        description: serverDto.description,
        ip: serverDto.ip,
        worker_type: serverDto.ip ? 'server' : 'url',
      })
      .where(equalWhere);

    if (updated.length < 1) {
      throw new BadRequestException('Server not found');
    }

    return this.db.select().from(servers).where(equalWhere);
  }

  async deleteServer(idServer: string, idUser: string) {
    const equalWhere = and(eq(servers.id_server, idServer), eq(servers.id_user, idUser));

    //TODO: stop pings
    //chnage status of the task

    await this.db.delete(servers).where(equalWhere);
  }

  async pingServer(idServer: string) {
    return this.db.select().from(pings).where(eq(pings.id_server, idServer));
  }
}
