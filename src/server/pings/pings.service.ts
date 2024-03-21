import { Inject, Injectable } from '@nestjs/common';
import { UpdatePingDto } from './dto/update-ping.dto';
import { DrizzleDb } from '@/db';
import { and, eq } from 'drizzle-orm';
import { pings } from '@/db/schemas';

@Injectable()
export class PingsService {
  /**
   *
   */
  constructor(@Inject('DB') private readonly db: DrizzleDb) {}

  findAll(idServer: string, idUser: string) {
    return this.db.query.pings.findMany({
      where: and(eq(pings.idServer, idServer)),
      with: {
        idUser: idUser,
      },
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
