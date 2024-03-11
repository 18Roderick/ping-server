import { Injectable } from '@nestjs/common';
import { UpdatePingDto } from './dto/update-ping.dto';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class PingsService {
  /**
   *
   */
  constructor(private readonly prismaService: PrismaService) {}

  findAll(idServer: string, idUser: string) {
    return this.prismaService.pings.findMany({
      where: {
        Servers: {
          idUser: idUser,
        },
        serversIdServer: idServer,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
  }

  findOne(idServer: number) {
    return [idServer];
  }

  update(id: number, updatePingDto: UpdatePingDto) {
    return `This action updates a #${id} ping`;
  }

  remove(id: number) {
    return `This action removes a #${id} ping`;
  }
}
