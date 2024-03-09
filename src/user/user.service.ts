import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

const PrismaUserSelect = {
  name: true,
  email: true,
  idUser: true,
};

@Injectable()
export class UserService {
  /**
   *
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * @description method should  only be available for admins
   */
  findAll() {
    return `This action returns all user`;
  }

  findOne(userId: string) {
    return this.prismaService.users.findFirst({
      where: {
        idUser: userId,
      },
      select: PrismaUserSelect,
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.users.findFirst({ where: { idUser: userId } });

    if (!user) throw new BadRequestException('user not found');

    return this.prismaService.users.update({
      data: {
        ...updateUserDto,
      },
      where: { idUser: userId },
      select: PrismaUserSelect,
    });
  }

  async remove(userId: string) {
    const user = await this.prismaService.users.findFirst({ where: { idUser: userId } });

    if (!user) throw new BadRequestException('user not found');

    return this.prismaService.users.delete({
      where: { idUser: userId },
      select: PrismaUserSelect,
    });
  }
}
