import { PrismaService } from '@/services/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async summarizePings() {
    // TODO: summarize the pings for every day, should calculate  de deads pings and the seuccesfull ones
    this.prismaService.servers.findMany({
      include: {
        Ping: true,
      },
    });
    const startOfDay = DateTime.now()
      .endOf('day')
      .minus({
        day: 1,
      })
      .endOf('day');
    console.log(startOfDay.toJSDate());
    const data = await this.prismaService.$transaction([
      this.prismaService.pings.findMany({
        where: {
          createdAt: {
            lt: startOfDay.toJSDate(),
          },
        },
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    console.log(startOfDay.toJSDate(), data);
  }
}
