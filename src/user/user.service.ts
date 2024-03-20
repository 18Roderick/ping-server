import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from './dto/user.dto';
import { DrizzleDb } from '@/db';
import { users } from '@/db/schemas';


@Injectable()
export class UserService {
  /**
   *
   */
  constructor(
    @Inject('DB') private readonly db: DrizzleDb,
  ) {}

  /**
   * @description method should  only be available for admins
   */
  findAll() {
    return `This action returns all user`;
  }

  findOne(userId: string) {
    return this.db
      .select({
        email: users.email,
        name: users.name,
        lastName: users.lastName,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.idUser, userId));
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const userQuery = this.getUserQuery(userId);

    const user = await userQuery.execute();
    if (!user.length) throw new BadRequestException('user not found');

    const updated = await this.db
      .update(users)
      .set({
        ...updateUserDto,
      })
      .where(eq(users.idUser, userId));

    return userQuery.execute();
  }

  async remove(userId: string) {
    const user = await this.getUserQuery(userId).execute();

    if (!user) throw new BadRequestException('user not found');

    const deleted = await this.db.delete(users).where(eq(users.idUser, userId));
    return {
      affected: deleted[0].affectedRows,
    };
  }

  private getUserQuery(userId: string) {
    return this.db
      .select({
        email: users.email,
        name: users.name,
        lastName: users.lastName,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.idUser, userId))
      .prepare();
  }
}
