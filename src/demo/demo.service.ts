import { Inject, Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { DB } from '@/db';
import { logs } from '@/db/schemas';

@Injectable()
export class DemoService {
  /**
   *
   */
  constructor(@Inject('DB') private readonly db: DB) {}
  create(createDemoDto: CreateDemoDto) {
    return 'This action adds a new demo';
  }

  findAll() {
    console.log("im here");

    return this.db.select().from(logs);
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
