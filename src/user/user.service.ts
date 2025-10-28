import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from './dto/user.dto';
import { DB } from '@/db';
import { users } from '@/db/schemas';

@Injectable()
export class UserService {
  /**
   *
   */
  constructor(@Inject('DB') private readonly db: DB) {}

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
        lastName: users.last_name,
        updatedAt: users.updated_at,
      })
      .from(users)
      .where(eq(users.id_user, userId));
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
      .where(eq(users.id_user, userId));

    return userQuery.execute();
  }

  async remove(userId: string) {
    const user = await this.getUserQuery(userId).execute();

    if (!user) throw new BadRequestException('user not found');

    const deleted = await this.db.delete(users).where(eq(users.id_user, userId));
    return {
      affected: deleted[0],
    };
  }

  private getUserQuery(userId: string) {
    return this.db
      .select({
        email: users.email,
        name: users.name,
        lastName: users.last_name,
        updatedAt: users.updated_at,
      })
      .from(users)
      .where(eq(users.id_user, userId))
      .prepare("queryuser");
  }
}
